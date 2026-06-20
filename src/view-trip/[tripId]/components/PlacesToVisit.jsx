import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Places to Visit</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((item, index) => (
          <>
            <h3 className="font-bold text-lg mt-4">day {item.day}</h3>
            <div className="gap-5 grid md:grid-cols-2">
              {item.plan?.map((place, index) => (
                <div className="">
                  
                  <h4 className="font-medium text-sm text-orange-600">
                    {place.bestTimeToVisit}
                  </h4>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
