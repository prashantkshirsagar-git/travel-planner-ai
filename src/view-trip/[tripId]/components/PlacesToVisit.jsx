import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
          <div>
            <h2 className="font-bold text-lg">day {item.day}</h2>
            {item.plan.map((place, index) => (
              <div className="my-3">
                <h2 className="font-median text-sm text-orange-600">
                  {place.bestTimeToVisit}
                  <PlaceCardItem place={place} />
                </h2>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
