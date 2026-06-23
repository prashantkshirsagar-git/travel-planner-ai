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
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
  src={photoUrl ? photoUrl : "/placeholder.jpg"}
  className="object-cover rounded-xl"
/>
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs  text-gray-500">📍 {hotel?.address}</h2>
          <h2 className="text-sm">💵 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelsCardItem;
