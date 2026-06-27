import React from "react";
import HotelsCardItem from "./HotelsCardItem";

function Hotels({ trip }) {
  return (
    <div className="font-mono mt-5">
      <h2 className="font-bold text-xl text-black">Hotel recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <HotelsCardItem hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;