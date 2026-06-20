import React from "react";

function PlacesToVisit({ trip }) {
  return (
    <div >
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg">day {item.day}</h2>
            {item.plan.map((place,pindex)=>(
              <div key={pindex}>
                <h2 className="font-median text-sm text-orange-600">{place.bestTimeToVisit}</h2>
                 <div></div>

                <h2>{place.placeName}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
