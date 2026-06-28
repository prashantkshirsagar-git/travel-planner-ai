import React, { useState, useEffect, useRef } from "react";
import { GetPlacePhoto } from "@/service/GlobalApi";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";

function UserTripCardItem({
  trip,
  onDelete,
  selectMode = false,
  selected = false,
  onToggleSelect,
}) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (trip?.userSelection?.location) {
      GetPlaceImage();
    }
  }, [trip]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const tripUrl = `${window.location.origin}/view-trip/${trip?.id}`;

  const handleCardClick = () => {
    if (selectMode) {
      onToggleSelect?.(trip?.id);
      return;
    }
    if (menuOpen || confirmingDelete) return;
    navigate("/view-trip/" + trip?.id);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    setMenuOpen(false);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${trip?.userSelection?.location} trip`,
          text: `Check out my trip to ${trip?.userSelection?.location}!`,
          url: tripUrl,
        });
      } catch {}
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

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    setConfirmingDelete(true);
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    onDelete?.(trip?.id);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setConfirmingDelete(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`  border rounded-xl overflow-hidden transition-all relative cursor-pointer ${
        selectMode
          ? selected
            ? "border-black ring-2 ring-black"
            : "border-black/20"
          : "border-black/20 hover:scale-[1.02] hover:shadow-sm"
      }`}
    >
      {selectMode ? (
        <div className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full border border-black/40 bg-[#F4F1EA] flex items-center justify-center">
          {selected && <div className="h-3 w-3 rounded-full bg-black" />}
        </div>
      ) : (
        <div className="absolute top-2 right-2 z-10" ref={menuRef}>
          <button
            onClick={handleMenuToggle}
            aria-label="Trip options"
            className="h-8 w-8 rounded-full bg-[#F4F1EA] border border-black/30 flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            <BsThreeDotsVertical className="h-4 w-4 text-black" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-[#F4F1EA] border border-black/80 rounded-md shadow-sm py-1 z-20">
              <button
                onClick={handleShare}
                className="w-full text-left px-3 py-2 text-xs text-black hover:bg-black/5 transition-colors"
              >
                Share Trip
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-full text-left px-3 py-2 text-xs text-black hover:bg-black/5 transition-colors"
              >
                Delete Trip
              </button>
            </div>
          )}
        </div>
      )}

      {confirmingDelete && (
        <div
          className="absolute inset-0 z-20 bg-[#F4F1EA]/95 flex flex-col items-center justify-center gap-3 p-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-black font-semibold">Delete this trip?</p>
          <p className="text-xs text-black/50">This can&apos;t be undone.</p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleConfirmDelete}
              className="text-xs bg-black text-white px-4 py-1.5 rounded-md hover:bg-black/85 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={handleCancelDelete}
              className="text-xs border border-black/30 px-4 py-1.5 rounded-md text-black hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt={trip?.userSelection?.location}
        className="object-cover w-full h-56"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg text-black truncate">
          {trip?.userSelection?.location}
        </h2>
        <h2 className="text-sm text-black/50 mt-1">
          {trip?.userSelection?.noOfDays} Days trip with{" "}
          {trip?.userSelection?.budget} budget
        </h2>
      </div>
    </div>
  );
}

export default UserTripCardItem;
