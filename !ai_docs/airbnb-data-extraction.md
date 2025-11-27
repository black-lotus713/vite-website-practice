# Airbnb Data Extraction Guide

**Property URL**: https://www.airbnb.com/h/pelicansplace

**Instructions**: Execute each section one at a time in the Brave browser console while on the Airbnb listing page. Copy the output and paste it back to me. Wait for confirmation before moving to the next section.

---

## Section 1: Property Title and Location

**What we're getting**: Property name, location, and basic identifiers

**Console Script**:
```javascript
const title = document.querySelector('h1')?.innerText || '';
const subtitle = document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] h2')?.innerText || '';
const location = document.querySelector('[data-plugin-in-point-id="BREADCRUMBS_DEFAULT"] a')?.innerText || '';

copy(JSON.stringify({
  title: title,
  subtitle: subtitle,
  location: location
}, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 2: Property Overview/Description

**What we're getting**: Main description text about the property

**Console Script**:
```javascript
const description = document.querySelector('[data-section-id="DESCRIPTION_DEFAULT"]')?.innerText || '';
copy(description);
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 3: Property Highlights

**What we're getting**: Key features and highlights

**Console Script**:
```javascript
const highlights = Array.from(document.querySelectorAll('[data-section-id="HIGHLIGHTS_DEFAULT"] [role="img"]'))
  .map(el => {
    const parent = el.closest('div[class*="f"]');
    return {
      icon: el.getAttribute('aria-label'),
      text: parent?.innerText || ''
    };
  });

copy(JSON.stringify(highlights, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 4: Guest Capacity Details

**What we're getting**: Number of guests, bedrooms, beds, bathrooms

**Console Script**:
```javascript
const capacity = Array.from(document.querySelectorAll('[data-section-id="OVERVIEW_DEFAULT"] ol li'))
  .map(el => el.innerText);

copy(JSON.stringify(capacity, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 5: Amenities List

**What we're getting**: All amenities offered at the property

**Console Script**:
```javascript
// First, click the "Show all amenities" button if it exists
const showAllButton = Array.from(document.querySelectorAll('button')).find(btn => btn.innerText.includes('Show all') && btn.innerText.includes('amenities'));
if (showAllButton) {
  showAllButton.click();
  console.log('Clicked "Show all amenities" - wait 2 seconds then run the next command');
}

// After waiting 2 seconds or if no button, run this:
setTimeout(() => {
  const amenities = Array.from(document.querySelectorAll('[data-section-id="AMENITIES_DEFAULT"] [role="group"]'))
    .map(group => {
      const category = group.querySelector('h3')?.innerText || 'General';
      const items = Array.from(group.querySelectorAll('li')).map(li => li.innerText);
      return { category, items };
    });
  
  copy(JSON.stringify(amenities, null, 2));
}, 2000);
```

**Instructions**: Run the script above. If it says to wait 2 seconds, wait and the data will auto-copy. Then paste the output here.

---

## Section 6: Host Information

**What we're getting**: Host name, profile info, and details

**Console Script**:
```javascript
const hostSection = document.querySelector('[data-section-id="HOST_PROFILE_DEFAULT"]');
const hostInfo = {
  name: hostSection?.querySelector('h2')?.innerText || '',
  details: Array.from(hostSection?.querySelectorAll('li') || []).map(li => li.innerText),
  bio: hostSection?.querySelector('[data-section-id="HOST_PROFILE_DEFAULT"] span')?.innerText || ''
};

copy(JSON.stringify(hostInfo, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 7: Location Details

**What we're getting**: Neighborhood description and location information

**Console Script**:
```javascript
const locationSection = document.querySelector('[data-section-id="LOCATION_DEFAULT"]');
const locationInfo = {
  description: locationSection?.querySelector('span')?.innerText || '',
  neighborhood: locationSection?.innerText || ''
};

copy(JSON.stringify(locationInfo, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 8: House Rules

**What we're getting**: Check-in/check-out times, rules, and policies

**Console Script**:
```javascript
// Try to click "Show more" for house rules if it exists
const showMoreButton = Array.from(document.querySelectorAll('button')).find(btn => 
  btn.innerText.includes('Show more') && 
  btn.closest('[data-section-id="POLICIES_DEFAULT"]')
);
if (showMoreButton) {
  showMoreButton.click();
}

setTimeout(() => {
  const rulesSection = document.querySelector('[data-section-id="POLICIES_DEFAULT"]');
  const rules = {
    checkIn: Array.from(rulesSection?.querySelectorAll('[data-section-id="CHECK_IN_TIME"]') || [])
      .map(el => el.innerText).join('\n'),
    checkOut: Array.from(rulesSection?.querySelectorAll('[data-section-id="CHECKOUT_TIME"]') || [])
      .map(el => el.innerText).join('\n'),
    allRules: rulesSection?.innerText || ''
  };
  
  copy(JSON.stringify(rules, null, 2));
}, 1000);
```

**Instructions**: Run the script above, wait 1 second, then paste the output here.

---

## Section 9: Reviews Summary

**What we're getting**: Overall rating, review count, and category ratings

**Console Script**:
```javascript
const reviewsSection = document.querySelector('[data-section-id="REVIEWS_DEFAULT"]');
const overallRating = reviewsSection?.querySelector('h2')?.innerText || '';
const categoryRatings = Array.from(reviewsSection?.querySelectorAll('[role="img"]') || [])
  .map(img => ({
    category: img.getAttribute('aria-label'),
    rating: img.closest('div')?.innerText
  }));

copy(JSON.stringify({
  overallRating,
  categoryRatings
}, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 10: Individual Reviews (First 10)

**What we're getting**: Sample of guest reviews

**Console Script**:
```javascript
const reviews = Array.from(document.querySelectorAll('[data-review-id]'))
  .slice(0, 10)
  .map(review => ({
    author: review.querySelector('h3')?.innerText || '',
    date: review.querySelector('time')?.innerText || '',
    text: Array.from(review.querySelectorAll('span')).map(s => s.innerText).join(' ')
  }));

copy(JSON.stringify(reviews, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 11: Pricing Information

**What we're getting**: Nightly rate and pricing details

**Console Script**:
```javascript
const priceElement = document.querySelector('[data-section-id="BOOK_IT_SIDEBAR"] span');
const priceText = priceElement?.innerText || '';
const pricingDetails = document.querySelector('[data-section-id="BOOK_IT_SIDEBAR"]')?.innerText || '';

copy(JSON.stringify({
  nightlyRate: priceText,
  fullPricingText: pricingDetails
}, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Section 12: Things to Know

**What we're getting**: Important information guests should know

**Console Script**:
```javascript
const thingsToKnow = Array.from(document.querySelectorAll('[data-section-id="POLICIES_DEFAULT"] > div'))
  .map(section => ({
    heading: section.querySelector('h3')?.innerText || '',
    items: Array.from(section.querySelectorAll('li')).map(li => li.innerText)
  }));

copy(JSON.stringify(thingsToKnow, null, 2));
```

**Instructions**: Run the script above, then paste the output here.

---

## Completion

Once all sections are complete, respond with "ALL SECTIONS COMPLETE" and I will process all the data into the website.
