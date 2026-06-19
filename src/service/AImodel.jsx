import { GoogleGenAI } from "@google/genai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  allowNoApiKeyInBrowser: true, 
});

// export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.`;

export const chatSession = {
  sendMessage: async (promptText) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: { 
          responseMimeType: "application/json",
          systemInstruction: "You are a professional travel planner. You must only reply with valid, clean JSON data matching the user's requested schema. Do not include markdown code blocks like ```json."
        },
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }]
          }
        ],
      });

      // Crucial: In @google/genai SDK, 'text' is a property directly on the response object
      return response.text; 
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
};