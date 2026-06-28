import React, { useState, useEffect } from "react";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodel";
import { AI_PROMPT } from "@/constants/options";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveler: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.length <= 2) {
      setSuggestions([]);
      return;
    }

    let active = true;

    const delayFetch = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`,
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (active) {
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    }, 600);

    return () => {
      active = false;
      clearTimeout(delayFetch);
    };
  }, [query]);

  const handleSelect = (placeName) => {
    setQuery(placeName);
    handleFormChange("location", placeName);
    setSuggestions([]);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !query ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the details");
      return;
    }

    if (Number(formData?.noOfDays) > 5) {
      toast("Trip duration cannot exceed 5 days");
      return;
    }

    try {
      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget);

      const rawJsonText = await chatSession.sendMessage(FINAL_PROMPT);

      if (!rawJsonText) {
        throw new Error("Received empty text string from Gemini API.");
      }

      console.log("Generated Trip Data:", rawJsonText);

      const parsedTripData = JSON.parse(rawJsonText);

      await saveAiTrip(parsedTripData);
    } catch (error) {
      console.error("Generation error:", error);
      toast("Something went wrong generating your trip.");
    } finally {
      setLoading(false);
    }
  };

  const saveAiTrip = async (tripDataObj) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: tripDataObj || {},
        userEmail: user?.email || "unknown_user",
        id: docId,
      });
      navigate("/view-trip/" + docId);

      toast("Trip generated and saved successfully!");
    } catch (dbError) {
      console.error("Firestore saving error:", dbError);
      toast("Trip generated, but failed to save to account.");
    } finally {
      setLoading(false);
    }
  };

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
        setOpenDialog(false);

        toast("Authenticated successfully! Click 'Generate Trip' again.");
      })
      .catch((err) => {
        console.error("Error fetching user profile", err);
        toast("Authentication failed");
      });
  };

  return (
    <div className="  bg-[#F4F1EA] min-h-screen">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 pt-10 pb-20">
        <h2 className="font-bold text-3xl text-black">
          Tell us your travel preferences
        </h2>
        <p className="mt-3 text-black/60 text-lg leading-relaxed">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="my-16 flex flex-col gap-12">
          <div className="relative">
            <h2 className="text-lg my-3 font-semibold text-black">
              What is your destination of choice?
            </h2>

            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="e.g., Tokyo, Japan"
              className="w-full border border-black/30 rounded-md p-3 text-sm bg-[#F4F1EA] text-black placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black/80 focus:border-black/80"
            />

            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-[#F4F1EA] border border-black/30 rounded-md mt-1 shadow-sm max-h-60 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelect(item.display_name)}
                    className="p-3 hover:bg-black/5 cursor-pointer text-sm text-black border-b border-black/10 last:border-b-0"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-lg my-3 font-semibold text-black">
              How many days are you planning your trip?
            </h2>
            <input
              placeholder="Ex.3"
              type="number"
              value={formData.noOfDays}
              onChange={(e) => handleFormChange("noOfDays", e.target.value)}
              className="w-full border border-black/30 rounded-md p-3 text-sm bg-[#F4F1EA] text-black placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black/80 focus:border-black/80"
            />
          </div>

          <div>
            <h2 className="text-lg my-3 font-semibold text-black">
              What is your budget?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleFormChange("budget", item.title)}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-sm transition-all ${
                    formData.budget === item.title
                      ? "border-black bg-black/5"
                      : "border-black/20"
                  }`}
                >
                  <h2 className="text-3xl">
                    {" "}
                    <item.icon className="h-6 w-6 text-black" />
                  </h2>
                  <h2 className="font-bold text-base text-black mt-1">
                    {item.title}
                  </h2>
                  <h2 className="text-xs text-black/50 mt-1">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg my-3 font-semibold text-black">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleFormChange("traveler", item.people)}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-sm transition-all ${
                    formData.traveler === item.people
                      ? "border-black bg-black/5"
                      : "border-black/20"
                  }`}
                >
                  <h2 className="text-3xl">
                    {" "}
                    <item.icon className="h-6 w-6 text-black" />
                  </h2>
                  <h2 className="font-bold text-base text-black mt-1">
                    {item.title}
                  </h2>
                  <h2 className="text-xs text-black/50 mt-1">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="justify-end flex">
          <button
            disabled={loading}
            onClick={handleGenerateTrip}
            className="bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-black/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </button>
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

export default CreateTrip;
