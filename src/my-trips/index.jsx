import { db } from "@/service/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { toast } from "sonner";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmingBulkDelete, setConfirmingBulkDelete] = useState(false);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);
    setUserTrips([]);

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email),
    );
    const querySnapshot = await getDocs(q);
    const trips = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data());
    });

    setUserTrips(trips);
    setLoading(false);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      setUserTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      toast("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast("Failed to delete trip");
    }
  };

  const toggleSelectMode = () => {
    setSelectMode((prev) => !prev);
    setSelectedIds([]);
    setConfirmingBulkDelete(false);
  };

  const toggleSelectTrip = (tripId) => {
    setSelectedIds((prev) =>
      prev.includes(tripId)
        ? prev.filter((id) => id !== tripId)
        : [...prev, tripId],
    );
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedIds.map((tripId) => deleteDoc(doc(db, "AITrips", tripId))),
      );
      setUserTrips((prev) =>
        prev.filter((trip) => !selectedIds.includes(trip.id)),
      );
      toast(
        selectedIds.length === 1
          ? "Trip deleted successfully"
          : `${selectedIds.length} trips deleted successfully`,
      );
      setSelectedIds([]);
      setSelectMode(false);
      setConfirmingBulkDelete(false);
    } catch (error) {
      console.error("Error deleting trips:", error);
      toast("Failed to delete selected trips");
    }
  };

  return (
    <div className="font-mono bg-[#F4F1EA] min-h-screen">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 pt-10 pb-20">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl text-black">My Trips</h2>

          {!loading && userTrips?.length > 0 && (
            <div className="flex items-center gap-2">
              {selectMode && selectedIds.length > 0 && (
                <button
                  onClick={() => setConfirmingBulkDelete(true)}
                  className="text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-black/85 transition-colors"
                >
                  Delete ({selectedIds.length})
                </button>
              )}
              <button
                onClick={toggleSelectMode}
                className="text-xs border border-black/30 px-4 py-2 rounded-md text-black hover:bg-black/5 transition-colors"
              >
                {selectMode ? "Done" : "Edit"}
              </button>
            </div>
          )}
        </div>

        {selectMode && (
          <p className="text-xs text-black/50 mt-2">
            Select trips to delete
          </p>
        )}

        <div className="grid sm:grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {!loading && userTrips?.length > 0
            ? userTrips.map((trip) => (
                <UserTripCardItem
                  trip={trip}
                  key={trip.id}
                  onDelete={handleDeleteTrip}
                  selectMode={selectMode}
                  selected={selectedIds.includes(trip.id)}
                  onToggleSelect={toggleSelectTrip}
                />
              ))
            : loading
            ? [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-56 w-full border border-black/20 bg-black/5 animate-pulse rounded-xl"
                ></div>
              ))
            : null}
        </div>

        {!loading && userTrips?.length === 0 && (
          <p className="text-black/50 text-sm mt-10">
            You haven&apos;t created any trips yet.
          </p>
        )}
      </div>

      {confirmingBulkDelete && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-mono"
          onClick={() => setConfirmingBulkDelete(false)}
        >
          <div
            className="bg-[#F4F1EA] border border-black/80 rounded-lg p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg text-black mb-2">
              Delete {selectedIds.length}{" "}
              {selectedIds.length === 1 ? "trip" : "trips"}?
            </h2>
            <p className="text-sm text-black/60 mb-5">
              This can&apos;t be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmingBulkDelete(false)}
                className="text-sm border border-black/30 px-4 py-2 rounded-md text-black hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-black/85 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;