import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlacePhoto } from "@/service/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (place?.placeName) {
      GetPlaceImage();
    }
  }, [place]);

  const GetPlaceImage = () => {
    GetPlacePhoto(place?.placeName)
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
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="  border border-black/20 rounded-xl p-3 m-2 flex gap-4 hover:scale-[1.02] hover:shadow-sm transition-all cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt={place?.placeName}
          className="w-32 h-32 shrink-0 object-cover rounded-xl"
        />

        <div className="py-1">
          <h2 className="font-bold text-base text-black">{place?.placeName}</h2>
          <p className="text-sm text-black/50 mt-1">{place?.placeDetails}</p>
          <h2 className="text-sm text-black/70 mt-1">{place?.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
