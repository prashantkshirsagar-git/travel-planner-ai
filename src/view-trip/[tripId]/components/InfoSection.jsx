import { GetPlacePhoto } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { toast } from "sonner";

function InfoSection({ trip }) {
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

  const handleShare = async () => {
    const tripUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${trip?.userSelection?.location} trip`,
          text: `Check out my trip to ${trip?.userSelection?.location}!`,
          url: tripUrl,
        });
      } catch {
        // user cancelled the native share sheet, nothing to report
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(tripUrl);
      toast("Trip link copied to clipboard");
    } catch (err) {
      console.error("Clipboard error:", err);
      toast("Could not copy link");
    }
  };

  return (
    <div className=" ">
      {photoUrl && (
        <img
          src={photoUrl}
          alt={trip?.userSelection?.location}
          className="block h-72 md:h-96 w-full max-w-full object-cover object-center rounded-xl border border-black/20"
        />
      )}

      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-black">
            {trip?.userSelection?.location}
          </h2>

          <div className="flex gap-3 items-center flex-wrap">
            <h2 className="py-1 px-3 border border-black/30 text-black/70 rounded-full text-xs md:text-sm font-medium w-fit">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="py-1 px-3 border border-black/30 text-black/70 rounded-full text-xs md:text-sm font-medium w-fit">
              💵 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="py-1 px-3 border border-black/30 text-black/70 rounded-full text-xs md:text-sm font-medium w-fit">
              🥂 No. of traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="h-10 w-10 rounded-full border border-black/30 flex items-center justify-center text-black hover:bg-black/5 transition-colors"
          aria-label="Share trip"
        >
          <IoMdShare className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default InfoSection;
