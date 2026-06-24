import React, { useState, useEffect } from "react";
import { GetPlacePhoto } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip?.userSelection?.location) {
      GetPlaceImage();
    }
  }, [trip]);

  const GetPlaceImage = () => {
    GetPlacePhoto(trip?.userSelection?.location)
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className="hover:scale-105 transition-all ">
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt={trip?.userSelection?.location}
        className="object-cover rounded-xl h-55"
      />
      <div>
        <h2 className="font-bold text-xl">{trip?.userSelection?.location}</h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;