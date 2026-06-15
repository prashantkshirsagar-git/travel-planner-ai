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
  DialogTrigger,
} from "@/components/ui/dialog"

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveler: "",
  });
 const [openDialog,setOpenDialog] = useState(false);
  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    console.log("1. User typed something:", e.target.value);
  };

  useEffect(() => {
    if (query.length <= 2) {
      setSuggestions([]);
      return;
    }

    const delayFetch = setTimeout(async () => {
      console.log("2. Timer finished, starting fetch for:", query);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`,
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("3. Data received from internet:", data);
        setSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    }, 600);

    return () => clearTimeout(delayFetch);
  }, [query]);

  const handleSelect = (placeName) => {
    setQuery(placeName);
    handleFormChange("location", placeName);
    setSuggestions([]);
  };

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true)
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

    if (formData?.noOfDays > 5) {
      console.log("Trip duration cannot exceed 5 days");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.text);
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
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg">
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
        <Button onClick={handleGenerateTrip}>Generate Trip</Button>
      </div>

      <Dialog>
  
  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              Please authenticate with Google to securely generate and save your custom travel itinerary.
            </DialogDescription>
          </DialogHeader>
          
          
          
        </DialogContent>
      </Dialog>
</Dialog>
    </div>
  );
}

export default CreateTrip;
