import type { Review, ReviewStats } from '../types';

/**
 * Guest Reviews Data
 * Source: Airbnb listing - data-extraction-results.md Section 10
 * Last Updated: November 2025
 */
export const reviews: Review[] = [
  {
    id: "1525542020544252050",
    author: "Keith",
    location: "Spring, Texas",
    rating: 5,
    date: "October 2025",
    stayDetails: "Stayed with a pet",
    text: "We loved staying here. Gordon was very accommodating. Beautiful sunrise in the morning to sit out on the back deck with a cup of coffee. Unfortunately didn't catch any crab but that's ok. Caught fish on the back deck in the evening time. If you are looking for a beautiful place to stay with a responsive host this is the place for you.",
    source: "airbnb"
  },
  {
    id: "1505189392779507986",
    author: "Albert",
    location: "League City, Texas",
    rating: 5,
    date: "September 2025",
    stayDetails: "Stayed a few nights",
    text: "Great location and great over all stay, my wife loved the patio over looking the laguna and back side of padre island. The sunrise comes up right thru the master bedroom window which was an unexpected surprise.I was able to tie my boat to the dock which has easy access to the laguna madre fishing grounds, which did not disappoint.I would definitely stay here again",
    source: "airbnb"
  },
  {
    id: "1509614705729419382",
    author: "Kellie",
    location: "Bryan, Texas",
    rating: 4,
    date: "September 2025",
    stayDetails: "Stayed a few nights",
    text: "Great location, beautiful canal views. We had fun with the kayaks..The unit was nice, needed some repairs that the owner states he was getting done. Parking is tight if you have more than one car.",
    source: "airbnb"
  },
  {
    id: "1474024332803082690",
    author: "Levelt",
    location: "Oklahoma City, Oklahoma",
    rating: 5,
    date: "July 2025",
    stayDetails: "Stayed with kids",
    text: "Great place to stay, will definitely be coming back here. Beautiful sunrise/sunset. Fishing right out the back door was awesome! Gordon was very responsive and super friendly and helpful. This is a place for anyone whether you are a stay at home person or super active. The beach is literally less than 5 minutes from this property. Picture perfect, the whole family enjoyed our stay!!!!! 5 star experience!!! Definitely recommended!!",
    source: "airbnb"
  },
  {
    id: "1556720332471972014",
    author: "Richard",
    location: "Fulshear, Texas",
    rating: 5,
    date: "November 2025",
    stayDetails: "Stayed with kids",
    text: "Fishing was great. My kids caught a lot. Close to the beach. Gordon responded quickly. Good time.",
    source: "airbnb"
  },
  {
    id: "1450879401033772292",
    author: "Troy",
    location: "6 years on Airbnb",
    rating: 5,
    date: "June 2025",
    stayDetails: "Stayed with kids",
    text: "This location is very well taken care of and is perfect for a family vacation. It is in a very good location with a good amount of food options close by, just a short drive to the beach, and the neighborhood is very nice. The deck in the back is a very nice amenity and we were lucky enough to catch a few fish while hanging out in the afternoons. If you bring more than one truck or bigger suv parking in the driveway can be a little bit of a challenge if there's someone staying next door with two vehicles as well but if you're in cars or smaller suvs, it shouldn't be too bad. Overall, I would definitely stay here again.",
    source: "airbnb"
  },
  {
    id: "1448752450106232302",
    author: "Erik",
    location: "Mountainburg, Arkansas",
    rating: 5,
    date: "June 2025",
    stayDetails: "Stayed about a week",
    text: "We had a great stay at the home. Gordon was a great host and probably the best communication of any host I have ever sayed at.We will stay at this location next time we are on the island.",
    source: "airbnb"
  },
  {
    id: "1326229557659522458",
    author: "Tim",
    location: "Holland, Michigan",
    rating: 4,
    date: "January 2025",
    stayDetails: "Stayed with a pet",
    text: "Gordon's place was very comfortable for our family. There were a few minor maintenance issues that should be addressed - ice maker not working, cabinet doors that don't stay closed in master bathroom. For our family of 7, the pans in the kitchen were too small and there was not enough hot water for everyone to take showers in the morning. Small families will likely be fine with these items. Overall, it was a very pleasant stay.",
    source: "airbnb"
  },
  {
    id: "1320407320238024936",
    author: "Kenneth",
    location: "Dallas, Texas",
    rating: 5,
    date: "December 2024",
    stayDetails: "Stayed with a pet",
    text: "Easy to get to and access the unit. Read the parking information on the refrigerator for spaces to use.Dock is great and we used it for the young kids to fish. Plenty of perch.Some minor finish items but nothing that concerned me.We enjoyed our stay and would book it again.Dishwasher is great.",
    source: "airbnb"
  },
  {
    id: "1424798947051798273",
    author: "Michelle",
    location: "Richmond, Texas",
    rating: 5,
    date: "May 2025",
    stayDetails: "Group trip",
    text: "We had such a great time here! The place was very comfortable with plenty of sleeping arrangements. I enjoyed coffee on the deck every morning and the family had a great time fishing. Gordon was very responsive to any of my questions. We would definitely stay here again!",
    source: "airbnb"
  },
  {
    id: "1479815149650376137",
    author: "Kc",
    location: "3 years on Airbnb",
    rating: 5,
    date: "August 2025",
    stayDetails: "Group trip",
    text: "Gordon is a professional host, excellent location. Great stay.",
    source: "airbnb"
  },
  {
    id: "1398645721224417582",
    author: "Anthony",
    location: "4 years on Airbnb",
    rating: 5,
    date: "April 2025",
    stayDetails: "Stayed with kids",
    text: "This is a great spot, convenient to both Port A and Corpus Christi. Relax and fish a little. This area is nice and quiet with plenty of restaurants near by.",
    source: "airbnb"
  },
  {
    id: "1383462536094063290",
    author: "Alan",
    location: "Eunice, New Mexico",
    rating: 5,
    date: "March 2025",
    stayDetails: "Stayed with kids",
    text: "The house was amazing and very comfortable, enjoyed the view and fishing late at night!! Well definitely be back",
    source: "airbnb"
  },
  {
    id: "1316065208905893875",
    author: "Travis",
    location: "1 year on Airbnb",
    rating: 5,
    date: "December 2024",
    stayDetails: "Stayed a few nights",
    text: "We had a great time. Thank you for having us. Your place is in a great location and beautiful.",
    source: "airbnb"
  },
  {
    id: "1303049102275939427",
    author: "Terry",
    location: "Georgetown, Texas",
    rating: 5,
    date: "December 2024",
    stayDetails: "Group trip",
    text: "We had a fun family get together with everything we needed in this beautiful location. The host was very responsive to our communication. We would love to come back",
    source: "airbnb"
  },
  {
    id: "1379870692836062290",
    author: "Paul",
    location: "3 years on Airbnb",
    rating: 5,
    date: "March 2025",
    stayDetails: "Stayed with a pet",
    text: "Beautiful view, very relaxing place to stay and close to the beach",
    source: "airbnb"
  },
  {
    id: "1414588671293668843",
    author: "Andrew",
    location: "2 years on Airbnb",
    rating: 5,
    date: "May 2025",
    stayDetails: "Stayed with kids",
    text: "Enjoyed our weekend, place was nice and enjoyed the water. Would recommend to others.",
    source: "airbnb"
  },
  {
    id: "1262464391843340821",
    author: "Zachary",
    location: "1 year on Airbnb",
    rating: 4,
    date: "October 2024",
    stayDetails: "Group trip",
    text: "Great location, great host. The house was in need of several small repairs that would bring it from a 4-star to a 5-star listing - missing screw on back doorhandle made it loose and hard to open, no weatherstripping under front door (very visible, large gap), dirty AC vents. All very small things that make a big impact.",
    source: "airbnb"
  },
  {
    id: "1192186000682332899",
    author: "Denise",
    location: "Troup, Texas",
    rating: 4,
    date: "July 2024",
    stayDetails: "Stayed with a pet",
    text: "Location was good, with beaches and restaurants very close by. Great coffee place near by that we went to almost every morning. The beds were very comfortable. We loved sitting on the back deck enjoying the view. If you bring your dogs, there isn't any grass for them. Took a little bit for ours to get used to the pebbles.",
    source: "airbnb"
  },
  {
    id: "1231308061986704427",
    author: "Greg",
    location: "Austin, Texas",
    rating: 5,
    date: "August 2024",
    stayDetails: "Group trip",
    text: "Great experience at this rental. The place is clean, good dog park within walking distance. Gordon was very responsive, accommodating and helpful with local recommendations.",
    source: "airbnb"
  },
  {
    id: "1213932209100740743",
    author: "Jenna",
    location: "Boerne, Texas",
    rating: 5,
    date: "August 2024",
    stayDetails: "Stayed with kids",
    text: "Gordon was friendly and responsive. The home was clean and kid friendly. The kids loved fishing off the dock. It was perfect for our family getaway. To be on the water at the coast, you can't beat this price!",
    source: "airbnb"
  },
  {
    id: "1201606749565765112",
    author: "Drew",
    location: "Hobbs, New Mexico",
    rating: 5,
    date: "July 2024",
    stayDetails: "Stayed with kids",
    text: "My family and I came and stayed for a full week. The house was stocked well and had everything we needed to feel right at home. The fishing off the deck at night with the aid of the green light was great. Easy to find and great location. The host was very responsive and communicated well in advance prior to check in as a potential hurricane threatened to interfere. Luckily the storm moved North and our vacation went on as planned. This property helped to make our family vacation comfortable for all and we will return again in the future!",
    source: "airbnb"
  },
  {
    id: "1185627100827838893",
    author: "Angela",
    location: "Las Cruces, New Mexico",
    rating: 5,
    date: "June 2024",
    stayDetails: "Stayed with a pet",
    text: "Gordon is a wonderful host and very responsive! We were riding out a tropical storm and inside much of the time, but there was plenty of space for our family of 6 and lots of pots and pans for cooking. Needs a little upkeep and the life vests for the kayaks were missing, but we really enjoyed our stay. The dock for fishing out back was fun for the boys and the light in the water for night fishing was awesome! They caught fish, shrimp, and crab. A couple of us even saw a sea turtle make an appearance! Would definitely stay again. Thanks Gordon!",
    source: "airbnb"
  },
  {
    id: "1182013298731346656",
    author: "Angela",
    location: "Prosper, Texas",
    rating: 5,
    date: "June 2024",
    stayDetails: "Group trip",
    text: "Absolutely had the best time this weekend! Gordon was the best and responds almost immediately. House was was so clean and the view was spectacular. Minutes away from everything. I'm originally from Florida (Texan now) and I truly felt like I was home. Will definitely stay there when we come back:)",
    source: "airbnb"
  },
  {
    id: "1173966614302717647",
    author: "Hailey",
    location: "Colorado Springs, Colorado",
    rating: 4,
    date: "June 2024",
    stayDetails: "Group trip",
    text: "Beautiful home with a great location; close to the beach, stores, and restaurants. Could use a little bit of maintenance but overall was a wonderful stay and would come back.",
    source: "airbnb"
  },
  {
    id: "1161004335231627477",
    author: "Ellen",
    location: "Lynnwood, Washington",
    rating: 5,
    date: "May 2024",
    stayDetails: "Stayed with a pet",
    text: "We enjoyed our 12 nite stay so much we'll book it when we return to Corpus Christi for our next family reunion. There was plenty of space for the 7 adults, beds were all very comfortable, and the linens cozy. The large deck was a great gathering spot and so convenient to tie up our own boat right below it. Enjoyed multiple kayak paddles, so wonderful they were there. A bonus was having the garage as we all traveled from afar and had coolers and stuff; the second fridge was super helpful for our beverages. Thanks Gordon for a cozy place to call home.",
    source: "airbnb"
  },
  {
    id: "1129034130954647465",
    author: "James",
    location: "9 years on Airbnb",
    rating: 5,
    date: "April 2024",
    stayDetails: "Stayed a few nights",
    text: "Stunning location and excellent all-round vacation home. Kayaking out to see sunrises and sunsets was our favourite experience! Highly recommended to anyone visiting Corpus Christi ... peaceful and easy to access the amazing beaches and area.",
    source: "airbnb"
  },
  {
    id: "1103024418691720560",
    author: "Linda",
    location: "Rochester, Minnesota",
    rating: 5,
    date: "March 2024",
    stayDetails: "Stayed over a week",
    text: "Beautiful home on the water. Nice deck out back with a view. Very clean and Gordon was extremely responsive to any questions we had. Great seafood restaurants in the area and beautiful beaches especially the Padre Island National Seashore.",
    source: "airbnb"
  },
  {
    id: "1043574269940647785",
    author: "Thomas",
    location: "5 years on Airbnb",
    rating: 5,
    date: "December 2023",
    stayDetails: "Stayed with kids",
    text: "Me and my family loved the house they really enjoyed getting up in the morning and fishing off the back deck couldn't have asked for a nicer place or host would definitely book again",
    source: "airbnb"
  },
  {
    id: "1237062107074840972",
    author: "Erik",
    location: "Austin, Texas",
    rating: 5,
    date: "September 2024",
    stayDetails: "Stayed with a pet",
    text: "Very very accommodating, perfect patio for enjoying the bay and for fishing . Caught various types of fish from trout to toad fish and others. Kayaking was easy and fun. Highly recommended",
    source: "airbnb"
  },
  {
    id: "1057356219210111600",
    author: "Cindy",
    location: "7 years on Airbnb",
    rating: 5,
    date: "December 2023",
    stayDetails: "Stayed with kids",
    text: "It was a wonderful stay! Our family had a great time fishing, going to the beach and just relax around the house. House is near the end of the street and the beginning of the laguna madre, so It was super quiet and tranquil. The sunrise view is spectacular from the deck. House is spacious and squeaky clean. Beds are very comfortable. 3 full baths are a huge bonus for everyone. It's also well stocked with plenty towels, cooking essentials and every room has a smart TV. It's minutes to the beach, restaurants and shopping. We also had great luck fishing right off the deck. Host is very responsive and courteous. Will definitely be back!",
    source: "airbnb"
  },
  {
    id: "1245723593196151690",
    author: "Nicolas",
    location: "Waynesville, Missouri",
    rating: 5,
    date: "September 2024",
    stayDetails: "Stayed a few nights",
    text: "Very nice townhome on the inlets. Great deck, right on the water with a beautiful serene water view. A clean house and very responsive host led to an awesome stay.",
    source: "airbnb"
  },
  {
    id: "1152263667572802444",
    author: "Roxanna",
    location: "Montana, United States",
    rating: 5,
    date: "May 2024",
    stayDetails: "Stayed with a pet",
    text: "Great location, fun deck for fishing especially the fish light. Very spacious with plenty of bathrooms for everyone.",
    source: "airbnb"
  },
  {
    id: "1242192749390596334",
    author: "Manuel",
    location: "Dallas, Texas",
    rating: 5,
    date: "September 2024",
    stayDetails: "Stayed a few nights",
    text: "Visited Corpus for a business trip and absolutely loved the place. Perfect for relaxation after a long day of work.",
    source: "airbnb"
  },
  {
    id: "1268930877775365099",
    author: "Tim",
    location: "Austin, Texas",
    rating: 5,
    date: "October 2024",
    stayDetails: "Stayed a few nights",
    text: "Great location and space for our fishing trip, would book again",
    source: "airbnb"
  },
  {
    id: "1279848455278425253",
    author: "Kindra",
    location: "3 years on Airbnb",
    rating: 5,
    date: "October 2024",
    stayDetails: "Stayed about a week",
    text: "we really enjoyed our stay! Thank you!",
    source: "airbnb"
  },
  {
    id: "1115345123608551078",
    author: "Jonathon",
    location: "Poteet, Texas",
    rating: 5,
    date: "March 2024",
    stayDetails: "Stayed with kids",
    text: "We had an awesome time here! Would definitely book again",
    source: "airbnb"
  },
  {
    id: "1113828011808386323",
    author: "Lynn",
    location: "Gilbert, Arizona",
    rating: 5,
    date: "March 2024",
    stayDetails: "Stayed with kids",
    text: "We like the house and the area!",
    source: "airbnb"
  },
  {
    id: "1079874181246614088",
    author: "David",
    location: "Austin, Texas",
    rating: 5,
    date: "January 2024",
    stayDetails: "Stayed a few nights",
    text: "I had a blast! Would absolutely love to stay again! Thanks!",
    source: "airbnb"
  },
  {
    id: "1063927324479595686",
    author: "Matthew",
    location: "Houston, Texas",
    rating: 5,
    date: "January 2024",
    stayDetails: "Stayed a few nights",
    text: "I truly appreciated the Air BNB stay. Thank you!",
    source: "airbnb"
  },
  {
    id: "1084118189661090136",
    author: "Bruce",
    location: "Mead, Colorado",
    rating: 5,
    date: "February 2024",
    stayDetails: "Stayed a few nights",
    text: "Great Host!",
    source: "airbnb"
  }
];

export const reviewStats: ReviewStats = {
  overallRating: 4.88,
  totalReviews: 41,
  ratingBreakdown: {
    5: 36,
    4: 5,
    3: 0,
    2: 0,
    1: 0
  }
};

export const getReviewsByDate = (): Review[] => {
  return [...reviews].sort((a, b) => {
    const timeA = Date.parse(a.date);
    const timeB = Date.parse(b.date);
    if (Number.isNaN(timeA) && Number.isNaN(timeB)) {
      return 0;
    }
    if (Number.isNaN(timeA)) {
      return 1;
    }
    if (Number.isNaN(timeB)) {
      return -1;
    }
    return timeB - timeA;
  });
};

export const getReviewsByRating = (rating: number): Review[] => {
  return reviews.filter(review => review.rating === rating);
};

export const searchReviews = (keyword: string): Review[] => {
  const lowerKeyword = keyword.toLowerCase();
  return reviews.filter(review =>
    review.text.toLowerCase().includes(lowerKeyword) ||
    review.author.toLowerCase().includes(lowerKeyword)
  );
};

