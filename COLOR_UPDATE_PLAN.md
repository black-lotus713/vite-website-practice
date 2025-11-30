# Pelican's Place Color Refresh Plan

## Project Intent
- Apply the new coastal-inspired palette consistently across every screen so the experience feels cohesive from hero to footer.
- Centralize color tokens (CSS variables) to simplify maintenance, improve accessibility, and prevent ad-hoc hex usage.
- Refresh gradients, shadows, and tinted accents so highlight cards, buttons, and navigation all echo the same visual language.

## Color Palette & Usage Notes
| Token | Hex | Primary Applications |
| --- | --- | --- |
| Gulf Navy | #0D3B66 | Navbar background (with opacity), hero & section headings, logo text, tag text, secondary button text/border, hero card text, rates band text, map placeholder text, highlight/about card borders (tinted), footer background |
| Sky Blue | #3FA7D6 | Tag background tint, hero/map gradient start, gallery grid shadow tint, hero card shadow rgba tone |
| Sunset Orange | #F25C05 | Hero/section kicker text, highlighted hero span, primary CTA background + hover darken, logo-circle gradient end, rates band gradient start |
| Golden Yellow | #F7B538 | Logo-circle gradient start, hero badge background, callout strong text, rates band gradient end, footer link color |
| Beach Green | #9BC53D | Highlight tag background, amenities bullet dots, tag accent lines |
| Shell White | #FEF9EF | Body background, navbar text color |
| White | #FFFFFF | Card surfaces, secondary button background, hero/tag pills, general UI panels |
| Text Dark | #17202A | Base body copy, hero note text (tint allowed), highlight card copy |

> Tinted uses: derive via rgba/opacity helpers (e.g., `rgba(13, 59, 102, 0.15)` for Gulf Navy borders) so components keep soft edges without diverging from palette.

## Necessary Styling Changes
1. **Design Tokens**
   - Define CSS variables in `src/index.css` (and re-export via `:root`) for each hex plus commonly reused rgba variants.
   - Update `App.css` and `App.tsx` imports to rely on tokens rather than literal values.

2. **Global Layout & Typography**
   - Body background to Shell White; set base text color to Text Dark.
   - Headings (`h1`-`h3`) adopt Gulf Navy; kicker/eyebrow utility classes use Sunset Orange.
   - Link defaults remain Text Dark, but footer links override to Golden Yellow.

3. **Navigation & Layout Chrome**
   - `components/layout/Header.css`: apply Gulf Navy background with 90% opacity overlay, Shell White nav text, Gulf Navy translucent border bottom.
   - Secondary nav buttons: White background, Gulf Navy text/border tinted.
   - `Layout.css` & `Footer.css`: Footer background Gulf Navy, body wrappers Shell White; footer links Golden Yellow with lighter hover, general footer text Shell White.

4. **Hero & Call-to-Action Sections**
   - `Hero.css`: hero card gradient blending Sky Blue → White, hero kicker & CTA using Sunset Orange primary button, badge backgrounds Golden Yellow, hero tag pills White with Gulf Navy text.
   - Highlight span in `<h1>` uses Sunset Orange; hero note text uses Text Dark at 80% opacity.

5. **Cards, Tags, and Highlights**
   - `PropertyHighlights.css`, `PropertyDescription.css`, `HouseRulesCard.css`, `ReviewCard.css`: switch card surfaces to White, text to Text Dark, borders to Gulf Navy at ~15% opacity.
   - Highlight tags adopt Beach Green backgrounds with Gulf Navy text; tag labels tinted with Beach Green accent bars.
   - About/host cards use same border tint for consistency.

6. **Buttons & Interactive Elements**
   - Primary buttons (global `.btn-primary`, booking CTAs) use Sunset Orange background with darker hover (`#d54f04`), text White.
   - Secondary buttons keep White background, Gulf Navy text/border; hover fills Shell White with stronger border.

7. **Rates Band, Badges, and Gradients**
   - Rates/pricing band gradient: Sunset Orange start → Golden Yellow end, overlaying Shell White text.
   - Hero badge backgrounds Golden Yellow with Text Dark copy.
   - Map placeholder gradient Sky Blue start → White end; placeholder text Gulf Navy.

8. **Gallery & Shadows**
   - `GalleryPage.tsx` styles: apply Sky Blue tinted box-shadow (`rgba(63, 167, 214, 0.25)`), hover states deepen to Gulf Navy tint.
   - Maintain White borders and Shell White background for modals/lightboxes if present.

9. **Amenities & Lists**
   - Amenities bullet dots (pseudo-elements) use Beach Green; text remains Text Dark.
   - Callout boxes leverage Golden Yellow for emphasized text spans and Gulf Navy borders.

## Implementation Plan
1. **Prep & Audit**
   - Search for existing hex codes to catalog replacements; note any legacy palette tokens.
2. **Introduce Theme Variables**
   - Add variables (and rgba helpers) in `src/index.css`; include fallbacks for gradients/shadows.
3. **Update Global Styles**
   - Apply body, typography, link, and layout colors in `App.css`, `Layout.css`, and `components/layout` styles.
4. **Refactor Components by Group**
   - Hero & CTA components → highlights/cards → gallery/location → forms/amenities to keep diffs manageable.
5. **Gradients & Shadows**
   - Standardize gradient utilities (rates band, hero card, map placeholder) to documented colors.
6. **Quality Pass**
   - Run `npm run build` + visual QA in dev server; verify contrast ratios (WCAG AA) especially for Shell White background combinations.
7. **Documentation & Follow-up**
   - Note new tokens in `README.md` or design docs; capture before/after screenshots for review.
