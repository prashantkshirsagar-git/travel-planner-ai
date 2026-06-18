import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AI_PROMPT, chatSession } from "@/service/AImodel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

        // Only update state if this is still the most recent request
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
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🏝️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="my-20 flex flex-col gap-10">
        <div className="relative">
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="e.g., Tokyo, Japan"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item.place_id}
                  onClick={() => handleSelect(item.display_name)}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* DAYS SELECTION */}
      <div>
        <h2 className="text-xl my-3 font-medium">
          How many days are you planning your trip?
        </h2>
        <Input
          placeholder={"Ex.3"}
          type="number"
          value={formData.noOfDays}
          onChange={(e) => handleFormChange("noOfDays", e.target.value)}
        />
      </div>

      {/* BUDGET SELECTION */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFormChange("budget", item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow transition-all ${
                formData.budget === item.title
                  ? "border-blue-500 bg-blue-50/50"
                  : "border-gray-200"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* TRAVELERS SELECTION */}
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFormChange("traveler", item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow transition-all ${
                formData.traveler === item.people
                  ? "border-blue-500 bg-blue-50/50"
                  : "border-gray-200"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={handleGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-l mt-7">
              Sign in with Google
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <img src="logo.svg" alt="logo" />
          <p>Sign In with Google Authentication</p>

          <Button onClick={login} className="w-full mt-5 gap-4 items-center">
            <FcGoogle className="h-7 w-7" />
            Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
