import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlacePhoto } from "@/service/GlobalApi";

function HotelsCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (hotel?.hotelName) {
      GetPlaceImage();
    }
  }, [hotel]);

  const GetPlaceImage = () => {
    GetPlacePhoto(hotel?.hotelName)
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
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.address
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="  border border-black/20 rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-sm transition-all cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt={hotel?.hotelName}
          className="w-full h-32 object-cover"
        />
        <div className="p-3 flex flex-col gap-1">
          <h2 className="font-medium text-sm text-black truncate">
            {hotel?.hotelName}
          </h2>
          <h2 className="text-xs text-black/50 truncate">
            📍 {hotel?.address}
          </h2>
          <h2 className="text-xs text-black/70">💵 {hotel?.price}</h2>
          <h2 className="text-xs text-black/70">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelsCardItem;
