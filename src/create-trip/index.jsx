import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  
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
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`
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
    setSuggestions([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
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
      <div>
        <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input placeholder={'Ex.3'} type="number"/>
      </div>
    </div>
  );
}

export default CreateTrip;