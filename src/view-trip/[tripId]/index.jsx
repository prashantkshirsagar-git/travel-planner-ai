import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    setLoading(true);
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("no trip found");
    }
    setLoading(false);
  };

  return (
    <div className="font-mono bg-[#F4F1EA] min-h-screen">
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {loading ? (
          <div className="flex flex-col gap-6">
            <div className="h-48 w-full border border-black/20 bg-black/5 animate-pulse rounded-xl" />
            <div className="h-6 w-1/3 border border-black/20 bg-black/5 animate-pulse rounded-md" />
            <div className="h-32 w-full border border-black/20 bg-black/5 animate-pulse rounded-xl" />
            <div className="h-32 w-full border border-black/20 bg-black/5 animate-pulse rounded-xl" />
          </div>
        ) : trip ? (
          <>
            <InfoSection trip={trip} />
            <Hotels trip={trip} />
            <PlacesToVisit trip={trip} />
            <Footer trip={trip} />
          </>
        ) : (
          <p className="text-black/50 text-sm">
            We couldn&apos;t find this trip.
          </p>
        )}
      </div>
    </div>
  );
}

export default Viewtrip;