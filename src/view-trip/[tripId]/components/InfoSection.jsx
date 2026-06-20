import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdShare } from "react-icons/io";
function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h[340px] w-full object rounded-xl"
      />
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
        <Button className="cursor-pointer">
          <IoMdShare />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
