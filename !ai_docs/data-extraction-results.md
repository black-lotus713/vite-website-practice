# Airbnb Data Extraction Results

**Property URL**: https://www.airbnb.com/h/pelicansplace

**Extraction Date**: November 26, 2025

---

## Section 1: Property Title and Location ✅

```json
{
  "title": "Beach|Relax|Kayak|Nature|FishLight|Waterfront",
  "subtitle": "",
  "location": ""
}
```

---

## Section 2: Property Overview/Description ✅

```
Beautiful waterfront home ideally located at the edge of the Laguna Madre Bay. Quiet getaway near nature and wildlife. Close to beach and local attractions but nestled in a peaceful location.

6 minutes to Whitecap Beach! 13 minutes to National Seashore! Less than 30 minutes to Port Aransas or airport.

Boat slip and nearby launch gets you on the bay in minutes. Fish from dock/multiple nearby spots. 2 Kayaks available. 

2 dedicated workspaces and strong WIFI for remote workers or students.

The space
Large master bedroom with new king-size bedding and top-notch mattress. Comfortable living room with large couch and ample room for dining in. Large guest room downstairs with comfortable queen-size mattress. Mattresses are high quality and brand new.

Upstairs guest room includes a twin-over-full bunk bed with trundle underneath. Three full bathrooms so everyone has their own space.

Guest rooms have desks with office chairs and large 24" monitors for remote work and study. 

Propane grill available for use on the back deck. Underwater light to enjoy relaxing or fishing at night. 2 kayaks and life jackets available.

Guest access
Guests have access to the entire home with a keypad entry.

Other things to note
Pet owners- Riley P dog park is nearby as well as one other park. There is also an empty lot a few houses down with grass. 

For emergency pet relief, there is a designated area with artificial turf on the lower dock.

Please clean up after your pets! :)
Show more
```

---

## Section 3: Property Highlights ✅

```json
{
  "highlights": [
    {
      "title": "Self check-in",
      "description": "Check yourself in with the smartlock."
    },
    {
      "title": "Extra spacious",
      "description": "Guests love this home's spaciousness for a comfortable stay."
    },
    {
      "title": "Beautiful area",
      "description": "Guests love this home's scenic location."
    }
  ]
}
```

---

## Section 4: Guest Capacity Details ✅

```json
{
  "capacity": {
    "guests": 8,
    "bedrooms": 3,
    "beds": 5,
    "bathrooms": 3
  }
}
```

---

## Section 5: Amenities List ✅

```json
{
  "amenities": {
    "bathroom": [
      "Bathtub",
      "Hair dryer",
      "Cleaning products",
      "Shampoo",
      "Conditioner",
      "Body soap",
      "Hot water",
      "Shower gel"
    ],
    "bedroomAndLaundry": [
      "Washer",
      "Free dryer – In unit",
      "Essentials (Towels, bed sheets, soap, and toilet paper)",
      "Hangers",
      "Bed linens",
      "Iron",
      "Clothing storage: walk-in closet, closet, and dresser"
    ],
    "entertainment": [
      "TV",
      "Books and reading material"
    ],
    "heatingAndCooling": [
      "Air conditioning",
      "Indoor fireplace",
      "Ceiling fan",
      "Portable fans",
      "Central heating"
    ],
    "homeSafety": [
      "Smoke alarm",
      "Carbon monoxide alarm",
      "Fire extinguisher",
      "First aid kit"
    ],
    "internetAndOffice": [
      "Wifi",
      "Dedicated workspace"
    ],
    "kitchenAndDining": [
      "Kitchen",
      "Refrigerator",
      "Microwave",
      "Cooking basics (Pots and pans, oil, salt and pepper)",
      "Dishes and silverware",
      "Freezer",
      "Dishwasher",
      "Electric stove",
      "Stainless steel single oven",
      "Coffee maker (drip coffee maker, Keurig)",
      "Wine glasses",
      "Toaster",
      "Baking sheet",
      "Blender",
      "Dining table",
      "Coffee"
    ],
    "locationFeatures": [
      "Waterfront (Right next to a body of water)"
    ],
    "outdoor": [
      "Private patio or balcony",
      "Outdoor furniture",
      "Outdoor dining area",
      "BBQ grill",
      "Kayak",
      "Boat slip"
    ],
    "parkingAndFacilities": [
      "Free parking on premises"
    ],
    "services": [
      "Pets allowed",
      "Long term stays allowed",
      "Self check-in (Smart lock)"
    ]
  }
}
```

---

## Section 6: Host Information ✅

```json
{
  "name": "Gordon",
  "status": "Superhost",
  "yearsHosting": 4,
  "overallRating": 4.88,
  "totalReviews": 41,
  "guestFavorite": true
}
```

---

## Section 7: Location Details ✅

```json
{
  "city": "Corpus Christi",
  "state": "Texas",
  "country": "United States",
  "area": "Laguna Madre Bay waterfront",
  "nearbyAttractions": [
    "6 minutes to Whitecap Beach",
    "13 minutes to National Seashore",
    "Less than 30 minutes to Port Aransas or airport"
  ]
}
```
---

## Section 8: House Rules ✅

```json
{
  "checkIn": "After 4:00 PM",
  "checkOut": "Before 10:00 AM",
  "checkInMethod": "Self check-in with smart lock",
  "duringYourStay": {
    "maxGuests": 8,
    "petsAllowed": true,
    "maxPets": 2,
    "quietHours": "10:00 PM - 7:00 AM",
    "restrictions": [
      "No parties or events",
      "No commercial photography",
      "No smoking"
    ]
  },
  "additionalRules": [
    "Gather dishes and start dishwasher when you leave",
    "Start a load of towels in washing machine",
    "Put trash in the can outside front door",
    "Clean up after your pets",
    "Do not use fireplace",
    "Leave AC on 75 when you leave",
    "Don't put AC below 68 during stay as it may cause the unit to freeze"
  ],
  "beforeYouLeave": [
    "Gather used towels",
    "Throw trash away",
    "Lock up"
  ],
  "cleaningNote": "Severe cleaning jobs that create an unfair amount of work for cleaning crew will cost double the cleaning fee."
}
```
---

## Section 9: Reviews Summary ✅

```json
{
  "overallRating": 4.88,
  "totalReviews": 41,
  "categoryRatings": {
    "cleanliness": 4.9,
    "accuracy": 4.9,
    "checkIn": 5.0,
    "communication": 5.0,
    "location": 5.0,
    "value": 4.8
  }
}
```

**Implementation Note**: When these reviews are imported, tag them with `source: "airbnb"` (and optionally an `importedAt` timestamp) so the application can disclose their origin and gradually prioritize first-party reviews gathered through the portal.

---

## Section 10: Individual Reviews (First 6) ✅

```json
{
  "reviews": [
    {
      "author": "Keith",
      "location": "Spring, Texas",
      "rating": 5,
      "date": "October 2025",
      "stayDetails": "Stayed with a pet",
      "text": "We loved staying here. Gordon was very accommodating. Beautiful sunrise in the morning to sit out on the back deck with a cup of coffee. Unfortunately didn't catch any crab but that's ok. Caught fish on the back deck in the evening time. If you are looking for a beautiful place to stay with a responsive host this is the place for you.",
      "source": "airbnb"
    },
    {
      "author": "Albert",
      "location": "League City, Texas",
      "rating": 5,
      "date": "September 2025",
      "stayDetails": "Stayed a few nights",
      "text": "Great location and great over all stay, my wife loved the patio over looking the laguna and back side of padre island. The sunrise comes up right thru the master bedroom window which was an unexpected surprise. I was able to tie my boat to the dock which has easy access to the laguna madre fishing grounds, which did not disappoint. I would definitely stay here again",
      "source": "airbnb"
    },
    {
      "author": "Kellie",
      "location": "Bryan, Texas",
      "rating": 4,
      "date": "September 2025",
      "stayDetails": "Stayed a few nights",
      "text": "Great location, beautiful canal views. We had fun with the kayaks. The unit was nice, needed some repairs that the owner states he was getting done. Parking is tight if you have more than one car.",
      "source": "airbnb"
    },
    {
      "author": "Levelt",
      "location": "Oklahoma City, Oklahoma",
      "rating": 5,
      "date": "July 2025",
      "stayDetails": "Stayed with kids",
      "text": "Great place to stay, will definitely be coming back here. Beautiful sunrise/sunset. Fishing right out the back door was awesome! Gordon was very responsive and super friendly and helpful. This is a place for anyone whether you are a stay at home person or super active. The beach is literally less than 5 minutes from this property. Picture perfect, the whole family enjoyed our stay!!!!! 5 star experience!!! Definitely recommended!!",
      "source": "airbnb"
    },
    {
      "author": "Richard",
      "location": "Fulshear, Texas",
      "rating": 5,
      "date": "November 2025 (1 week ago)",
      "stayDetails": "Stayed with kids",
      "text": "Fishing was great. My kids caught a lot. Close to the beach. Gordon responded quickly. Good time.",
      "source": "airbnb"
    },
    {
      "author": "Troy",
      "location": "6 years on Airbnb",
      "rating": 5,
      "date": "June 2025",
      "stayDetails": "Stayed with kids",
      "text": "This location is very well taken care of and is perfect for a family vacation. It is in a very good location with a good amount of food options close by, just a short drive to the beach, and the neighborhood is very nice. The deck in the back is a very nice amenity and we were lucky enough to catch a few fish while hanging out in the afternoons. If you bring more than one truck or bigger suv parking in the driveway can be a little bit of a challenge if there's someone staying next door with two vehicles as well but if you're in cars or smaller suvs, it shouldn't be too bad. Overall, I would definitely stay here again.",
      "source": "airbnb"
    }
  ]
}
```

---

## Section 11: Pricing Information ✅

```json
{
  "note": "Pricing varies by date and season",
  "nightlyRate": "Variable - requires date selection",
  "cleaningFee": "Applies per stay",
  "additionalNote": "Severe cleaning jobs that create an unfair amount of work for cleaning crew will cost double the cleaning fee"
}
```

---

## Section 12: Things to Know ✅

```json
{
  "note": "Key information covered in House Rules (Section 8)",
  "summary": {
    "checkInOut": "Check-in after 4:00 PM, Checkout before 10:00 AM",
    "cancellationPolicy": "Standard Airbnb cancellation policy applies",
    "safetyDevices": ["Smoke alarm", "Carbon monoxide alarm", "Fire extinguisher", "First aid kit"],
    "houseRules": "See Section 8 for complete house rules"
  }
}
```

---

## Extraction Status

- ✅ Completed: 12/12
- ⏳ In Progress: 0/12
- ❌ Not Started: 0/12

---

## 🎉 ALL SECTIONS COMPLETE 🎉

All data has been successfully extracted from the Airbnb listing!
