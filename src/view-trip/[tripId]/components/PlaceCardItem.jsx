import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlacePhoto } from "@/service/GlobalApi";
function PlaceCardItem({ place }) {
const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (place.placeName) {
      GetPlaceImage();
    }
  }, [place]);

  const GetPlaceImage = () => {
    GetPlacePhoto(place.placeName)
      .then((resp) => {
        const photos = resp.data?.photos;
        if (photos && photos.length > 0) {
          const randomIndex = Math.floor(Math.random() * photos.length);
          setPhotoUrl(photos[randomIndex].src.large2x);
        }
      })
      .catch((err) => {
        console.log("Pexels error:", err.response?.data || err.message);
      });
    }
  return (

    <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" + place?.placeName
        }
        target="_blank"
      >
    <div className="border rounded-xl p-3 m-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt={place.placeName}
        className="w-35.5 h-35.5 object-cover rounded-xl"
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
