# One-Time Airbnb Review Scrape Plan

This document outlines the repeatable steps an assistant agent can walk you through to export all reviews from a single Airbnb listing exactly once. Follow the sections in order; each step includes instructions on what to do with the output.

## 1. Scope & Context Capture
- Record the listing URL, today's date/time, and whether you are logged in.
- Confirm you are using Brave desktop (latest) with DevTools docked and no DOM-altering extensions active.
- Note the browser version (`brave://version`). This metadata goes into `!ai_docs/data-extraction-results.md` before importing data into `src/data/reviews.ts`.

## 2. Manual Pagination
1. Open the Airbnb listing's **Reviews** tab.
2. Scroll to the first reviews block, then repeatedly click **"Show more reviews"** until the button disappears.
3. After each click, wait at least 2 seconds to let the reviews hydrate. When finished, scroll slowly to the top and back down once to keep the cache warm.
4. Once no more reviews load, stop scrolling and continue with the console steps.

## 3. DOM Review Export (Working Path)
Open DevTools (F12) > **Console**, make sure the reviews modal is in view, and run the snippet below. This is the only supported export path now that the Apollo cache endpoint is unstable.

```javascript
(() => {
  const clean = (value) => {
    if (!value) return null;
    const normalized = value
      .replace(/\s+/g, ' ')
      .replace(/^[,·\s]+/, '')
      .replace(/[,·\s]+$/, '')
      .trim();
    return normalized || null;
  };
  const normalizeBullets = (text) => text.replace(/[\u00b7•]+/g, '\n');
  const punctuationOnly = /^[-•.,·]+$/;
  const monthRegex = /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}/i;
  const cards = document.querySelectorAll('[data-review-id]');

  if (!cards.length) {
    console.error('No review cards found. Confirm the modal is open and reviews are hydrated.');
    return;
  }

  const reviews = Array.from(cards).map((card, index) => {
    const id = card.getAttribute('data-review-id') ?? `fallback-${Date.now()}-${index}`;
    const titleBlock = card.querySelector('[id^="review_"][id$="_title"]');
    const author = clean(titleBlock?.querySelector('h2')?.textContent);
    const location = clean(
      titleBlock
        ? Array.from(titleBlock.querySelectorAll('div'))
            .map((node) => clean(node.textContent))
            .filter(Boolean)[0]
        : null
    );

    const ratingSpan = Array.from(card.querySelectorAll('span')).find((span) => /rating/i.test(span.textContent ?? ''));
    const metaContainer = ratingSpan ? ratingSpan.closest('div')?.parentElement : null;
    const rawMeta = metaContainer ? normalizeBullets(metaContainer.textContent ?? '') : '';
    const metaLines = rawMeta
      ? rawMeta
          .split(/\n+/)
          .map((line) => clean(line))
          .filter((line) => line && !punctuationOnly.test(line))
      : [];
    const ratingLine = metaLines.find((line) => /rating/i.test(line ?? ''));
    const ratingMatch = ratingLine?.match(/(\d+(?:\.\d+)?)/);
    const stayDateMatch = rawMeta.match(monthRegex);
    const stayDate = stayDateMatch ? stayDateMatch[0] : null;
    const stayContext = (() => {
      const contextualLines = metaLines.filter(
        (line) =>
          line !== ratingLine &&
          line !== stayDate &&
          /Stayed|Group|trip|kids|pet|night/i.test(line)
      );
      return contextualLines.length ? contextualLines.join(' | ') : null;
    })();

    const responseWrapper = card.querySelector('[data-testid="pdp-reviews-response"]');
    const reviewContentRoot = (() => {
      if (responseWrapper?.previousElementSibling) {
        return responseWrapper.previousElementSibling;
      }
      const nonResponseChildren = Array.from(card.children).filter(
        (child) => !child.querySelector('[data-testid="pdp-reviews-response"]')
      );
      return nonResponseChildren[nonResponseChildren.length - 1] ?? null;
    })();

    const body = (() => {
      if (!reviewContentRoot) return null;
      const nodeText = Array.from(reviewContentRoot.querySelectorAll('span, p, div'))
        .map((node) => clean(node.textContent))
        .filter((text) => text && text.length > 20 && !/rating/i.test(text));
      return nodeText[0] ?? clean(reviewContentRoot.textContent);
    })();

    const hostResponse = responseWrapper
      ? (() => {
          const responderRaw = clean(responseWrapper.querySelector('h2')?.textContent) || '';
          const responder = responderRaw.replace(/^Response from\s*/i, '') || null;
          const responseDate = clean(responseWrapper.querySelector('h2 + div')?.textContent) || null;
          const responseBody = (() => {
            const parts = Array.from(responseWrapper.querySelectorAll('span, p'))
              .map((node) => clean(node.textContent))
              .filter((text) => text && !/^Response from/i.test(text) && !monthRegex.test(text));
            return parts[0] ?? null;
          })();
          return {
            responder,
            date: responseDate,
            body: responseBody,
          };
        })()
      : null;

    return {
      id,
      author,
      location,
      rating: ratingMatch ? Number(ratingMatch[1]) : null,
      date: stayDate,
      stayContext,
      body,
      hostResponse,
    };
  });

  console.log('DOM_REVIEW_EXPORT_V2_START');
  console.log(JSON.stringify(reviews, null, 2));
  console.log('DOM_REVIEW_EXPORT_V2_END');
})();
```

**Agent instruction:** Copy the JSON between `DOM_REVIEW_EXPORT_V2_START/END` and paste it into `!ai_docs/data-extraction-results.md` under a new heading. State that the DOM script was used.

## 4. Metadata Logging
In `!ai_docs/data-extraction-results.md`, add:
- Listing URL and title
- Date/time and timezone
- Brave version + login state
- Total reviews shown (Airbnb displays the number near the header; note it)
- Confirmation that the DOM script was used and every “Show more reviews” page was loaded before capturing the export

## 5. Data Sync via buildReviewsData.mjs
1. Save the exported JSON (exactly as logged) to `tmp/review_scrape.json`.
2. Run `node tmp/buildReviewsData.mjs` from the repo root. The script normalizes text to ASCII, deduplicates by Airbnb review ID, and writes the formatted array plus stats to `src/data/reviews.ts`.
3. Inspect `src/data/reviews.ts` to confirm the new content and verify that `reviewStats` reflects the updated counts shown in Airbnb.
4. Run `npm run lint` (and optionally `npm run build`) before committing the update.
