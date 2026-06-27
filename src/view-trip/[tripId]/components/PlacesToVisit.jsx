import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className="font-mono mt-5">
      <h2 className="font-bold text-xl text-black mb-4">Places to Visit</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((item, dayIndex) => (
          <div key={dayIndex}>
            <h3 className="font-bold text-lg text-black mt-4">
              Day {item.day}
            </h3>
            <div className="gap-5 grid md:grid-cols-2 mt-2">
              {item.plan?.map((place, placeIndex) => (
                <div key={placeIndex}>
                  <h4 className="font-medium text-sm text-black/60">
                    {place.bestTimeToVisit}
                  </h4>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;