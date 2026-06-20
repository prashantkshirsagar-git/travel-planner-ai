import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";

function PlaceCardItem({ place }) {
  return (
    <div className="border round-xl p-3 m-2 flex gap-5">
      <img src= "/placeholder.jpg"
      alt="placename"
      className="w-32.5 h-32.5 object-cover rounded-xl" />
      <div>
        <h2 className="font-bold text-lg">{place.placeName}</h2>
        <p className="text-sm text-gray-400">{place.placeDetails}</p>
        <Button><FaMapLocationDot /></Button>
      </div>
    </div>
  );
}

export default PlaceCardItem;
