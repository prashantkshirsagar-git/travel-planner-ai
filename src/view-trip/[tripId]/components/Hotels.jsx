import React from "react";
import HotelsCardItem from "./HotelsCardItem";
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <HotelsCardItem hotel={hotel}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
