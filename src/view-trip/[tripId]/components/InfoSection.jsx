import { Button } from "@/components/ui/button";
import { GetPlacePhoto } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    trip && GetPlaceImage();
  }, [trip]);

  const GetPlaceImage = () => {
    GetPlacePhoto(trip?.userSelection?.location)
      .then((resp) => {
        const photo = resp.data?.photos?.[0];
        if (photo) {
          setPhotoUrl(photo.src.large2x);
        }
      })
      .catch((err) => {
        console.log("Pexels error:", err.response?.data || err.message);
      });
  };

  return (
    <div>
      {photoUrl && (
        <img
          src={photoUrl}
          alt={trip?.userSelection?.location}
          className="block h-85 w-full max-w-full object-cover rounded-xl"
        />
      )}

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>

          <div className="flex gap-5 items-center">
            <h2 className="py-1 px-3 bg-gray-200 text-gray-600 rounded-full text-xs md:text-sm font-medium w-fit">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="py-1 px-3 bg-gray-200 text-gray-600 rounded-full text-xs md:text-sm font-medium w-fit">
              💵 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="py-1 px-3 bg-gray-200 text-gray-600 rounded-full text-xs md:text-sm font-medium w-fit">
              🥂 No. of traveler: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoMdShare />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;