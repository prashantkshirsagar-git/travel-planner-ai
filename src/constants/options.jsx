export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving advanture",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "4 to 6 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Experience the finest options without limits",
    icon: "💎",
  },
];

// export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'

export const AI_PROMPT = `Generate a detailed Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.

You MUST respond strictly in valid JSON format matching the exact structure and keys of the reference template below. Do not add any markdown formatting blocks (like \`\`\`json) outside of the raw text.

CRITICAL DIRECTIONS:
1. The JSON output must contain the "travelPlan" root wrapper key. 
2. Determine the target country from "{location}". Set the "currency" property to the standard 3-letter international currency code for that country (e.g., "EUR" for France, "JPY" for Japan, "INR" for India, "GBP" for the UK, "USD" for the USA).
3. Ensure all prices in the "hotels" and "itinerary" blocks are formatted using that specific currency symbol.
4. Ensure geoCoordinates uses an object containing latitude and longitude numbers.

Strict JSON Output Example Template to Follow:
{
  "travelPlan": {
    "location": "{location}",
    "totalDays": {totalDays},
    "traveler": "{traveler}",
    "budget": "{budget}",
    "currency": "USD",
    "hotels": [
      {
        "hotelName": "Example Hotel Name",
        "address": "123 Main St, Destination City",
        "price": "$150 - $200 per night",
        "hotelImageUrl": "https://images.unsplash.com/photo-example",
        "geoCoordinates": {
          "latitude": 40.7128,
          "longitude": -74.0060
        },
        "rating": 4.5,
        "description": "Short description of hotel features and amenities."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Theme Description",
        "plan": [
          {
            "placeName": "Attraction Name",
            "placeDetails": "Brief description of what to see or do there.",
            "placeImageUrl": "https://images.unsplash.com/photo-example",
            "geoCoordinates": {
              "latitude": 40.7128,
              "longitude": -74.0060
            },
            "ticketPricing": "$15.00",
            "rating": 4.7,
            "estimatedTimeSpent": "2-3 hours",
            "bestTimeToVisit": "09:00 AM"
          }
        ]
      }
    ]
  }
}`;
