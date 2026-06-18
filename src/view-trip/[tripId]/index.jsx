import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Viewtrip() {
  const { tripId } = useParams();
  const { trip, setTrip } = useState([]);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("no trip found");
    }
  };

  return <div>
    
{/*information section */}
 {/* recommended hotels */}
 {/* DailyPlan  */}
 {/* footer */}
    </div>;
}

export default Viewtrip;
