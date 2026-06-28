import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <div className="bg-[#F4F1EA] min-h-screen flex items-start">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center rounded-sm border border-black/80 px-4 py-1 text-xs tracking-wide text-black/80">
            AI TRIP PLANNER
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-black">
            Plan smarter trips
            <br />
            with AI
          </h1>

          <p className="text-base text-black/60 leading-relaxed max-w-md">
            Your personal trip planner and travel curator. Get custom
            itineraries tailored to your interests and budget in minutes.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Link to="/create-trip">
              <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm hover:bg-black/85 transition-colors">
                Plan Your Trip
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center border-1 border-gray-300 shadow-lg rounded-md">
          <img
            src="/landing.png"
            alt="Trip planning preview"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;