import React from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  return (

    <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" + place?.placeName
        }
        target="_blank"
      >
    <div className="border rounded-xl p-3 m-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        src="/placeholder.jpg"
        alt="placename"
        className="w-32.5 h-32.5 object-cover rounded-xl"
      />
      
        <div className="mt-5">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="text-sm text-green-500">{place.ticketPricing}</h2>
        </div>
      
    </div>
    </Link>
  );
}

export default PlaceCardItem;
