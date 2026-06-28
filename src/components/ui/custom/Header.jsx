import React, { useEffect, useRef, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "sonner";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [openDialog, setOpenDialog] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Login Failed:", error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        },
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
        toast.success("Authenticated successfully!");
      })
      .catch((err) => {
        console.error("Error fetching user profile", err);
        toast.error("Authentication failed");
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    setOpenMenu(false);
    toast.success("Logged out successfully");
  };

  return (
    <div className="  bg-[#F4F1EA] border-b border-gray-400">
      <div className="flex items-center justify-between px-6 py-4  max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <span className="font-bold text-black text-base">PlanTrip</span>
        </a>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <a
                href="/create-trip"
                className="hidden sm:inline text-sm text-black hover:text-black/60 transition-colors"
              >
                Create Trip
              </a>

              <a
                href="/my-trips"
                className="hidden sm:inline text-sm text-black hover:text-black/60 transition-colors"
              >
                My Trips
              </a>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="block"
                >
                  <img
                    src={user.picture}
                    className="h-9 w-9 rounded-md border border-black/60"
                    alt={user.name || "Profile"}
                  />
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-2 w-36 bg-[#F4F1EA] border border-black/80 rounded-md shadow-sm py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-black hover:bg-black/5 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => setOpenDialog(true)}
              className="bg-black text-white text-sm px-5 py-2 rounded-md hover:bg-black/85 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {openDialog && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50  "
          onClick={() => setOpenDialog(false)}
        >
          <div
            className="bg-[#F4F1EA] border border-black/80 rounded-lg p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-bold text-lg text-black">
                Sign in with Google
              </h2>

              <button
                onClick={() => setOpenDialog(false)}
                className="text-black/50 hover:text-black text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-black/60 mb-5">
              Sign in with Google Authentication
            </p>

            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 border border-black/80 rounded-md py-2.5 text-sm text-black hover:bg-black/5 transition-colors"
            >
              <FcGoogle className="h-5 w-5" />
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
