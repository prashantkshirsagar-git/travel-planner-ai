import React from "react";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h[340px] w-full object rounded-xl"
      />
      <div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1,px-3 bg-gray-300 rounded-full text-gray-500 ">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1,px-3 bg-gray-300 rounded-full text-gray-500 ">
              💵 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1,px-3 bg-gray-300 rounded-full text-gray-500 ">
              🥂 No. of traveler: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default InfoSection;
