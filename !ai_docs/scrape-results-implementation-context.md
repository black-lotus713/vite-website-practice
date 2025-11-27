# Implementation Context for Airbnb Data Integration

## Project Overview
This is a Vite + React + TypeScript website practice project for a vacation rental property called "Pelican's Place" in Corpus Christi, Texas. The data has been extracted from the live Airbnb listing at https://www.airbnb.com/h/pelicansplace.

## Current Project Structure
```
src/
  ├── data/
  │   └── propertyImages.ts (already exists)
  ├── types/
  │   └── index.ts (already exists)
  ├── components/
  │   ├── pages/
  │   │   ├── HomePage.tsx
  │   │   ├── AmenitiesPage.tsx
  │   │   ├── ReviewsPage.tsx
  │   │   ├── LocationPage.tsx
  │   │   ├── BookPage.tsx
  │   │   └── ... (other pages)
  │   └── ... (other component folders)
```

## Task: Integrate Extracted Airbnb Data

### Objective
Transform the extracted data from `data-extraction-results.md` into TypeScript files that can be imported and used by React components throughout the application.

### Required Actions

#### 1. Update Type Definitions (`src/types/index.ts`)
Review the existing types file and add/update interfaces for:
- `PropertyInfo` - Basic property details (title, location, capacity)
- `HostInfo` - Host details (name, status, rating, reviews)
- `Highlight` - Property highlights
- `Amenities` - Categorized amenities structure
- `Review` - Individual review structure
- `ReviewSummary` - Overall ratings and category ratings
- `HouseRules` - Check-in/out and rules
- `LocationDetails` - Location and nearby attractions

#### 2. Create Property Data File (`src/data/propertyData.ts`)
Create a comprehensive property data file containing:
- Property title: "Beach|Relax|Kayak|Nature|FishLight|Waterfront"
- Location: Corpus Christi, Texas, United States
- Capacity: 8 guests, 3 bedrooms, 5 beds, 3 bathrooms
- Full property description (from Section 2)
- Property highlights (3 items from Section 3)
- Host information: Gordon (Superhost, 4 years, 4.88 rating, 41 reviews)
- Location details with nearby attractions
- House rules with check-in/out times and all restrictions

#### 3. Create Amenities Data File (`src/data/amenities.ts`)
Create a structured amenities file with categories:
- Bathroom (8 items)
- Bedroom and Laundry (7 items)
- Entertainment (2 items)
- Heating and Cooling (5 items)
- Home Safety (4 items)
- Internet and Office (2 items)
- Kitchen and Dining (16 items)
- Location Features (1 item)
- Outdoor (6 items)
- Parking and Facilities (1 item)
- Services (3 items)

Full details are in Section 5 of `data-extraction-results.md`.

#### 4. Create Reviews Data File (`src/data/reviews.ts`)
Create a reviews file containing:
- Review summary:
  - Overall rating: 4.88 from 41 reviews
  - Category ratings: Cleanliness 4.9, Accuracy 4.9, Check-in 5.0, Communication 5.0, Location 5.0, Value 4.8
- Individual reviews array with 6 guest reviews (from Section 10)
- Add a `source` flag (e.g., `"airbnb"`) on each imported review plus an optional `importedAt` timestamp so the UI can disclose provenance and you can phase them out later.

#### 5. Integration Notes
- Ensure all data files export constants that can be imported by components
- Use proper TypeScript typing throughout
- Match the coding style of existing files in the project
- Consider creating helper functions if needed for data manipulation
- Ensure data is production-ready (clean formatting, no placeholder text)

### Data Source
All data is available in `!ai_docs/data-extraction-results.md` with 12 completed sections.

### Key Data Points Summary

**Property Basics:**
- 8 guests, 3 bedrooms, 5 beds, 3 bathrooms
- Waterfront property on Laguna Madre Bay
- Pet-friendly (2 pets max)
- Self check-in with smart lock

**Check-in/out:**
- Check-in: After 4:00 PM
- Checkout: Before 10:00 AM
- Quiet hours: 10:00 PM - 7:00 AM

**Standout Features:**
- Boat slip and kayaks available
- 6 minutes to Whitecap Beach
- 13 minutes to National Seashore
- Dedicated workspaces with monitors
- Underwater fishing light
- Propane grill on deck

**Host:**
- Name: Gordon
- Status: Superhost (4 years)
- Rating: 4.88 from 41 reviews
- Guest Favorite property

### Expected Deliverables
1. Updated `src/types/index.ts` with new interfaces
2. New `src/data/propertyData.ts` file
3. New `src/data/amenities.ts` file
4. New `src/data/reviews.ts` file
5. All files should compile without TypeScript errors
6. Data should be ready for immediate use in React components

### Testing
After implementation, verify:
- All files compile successfully (`npm run build`)
- Data can be imported in components
- TypeScript types are properly enforced
- No linting errors

### Additional Context
- The project is set up with Vite, so hot module reloading will work
- The project already has some placeholder data that may need to be replaced
- Focus on data accuracy from the extraction results
- Maintain consistency with existing code style in the project

## Coordination Notes
- See `!ai_docs/plans/main.md` → **Data Integration Overview** for how these deliverables plug into the roadmap and component architecture.
- Implementation Roadmap Sprints 2–5 now list the concrete “types first → data modules → page wiring” workflow described here; keep both docs in sync if fields change.
- Page-specific design guidelines in the plan mirror the structured data sections below (highlights, amenities categories, review summaries, location details, house rules). Any additions here should prompt a matching plan update.
