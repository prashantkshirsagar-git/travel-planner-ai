import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <div className="bg-[#F4F1EA] font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 pt-14 pb-18 lg:pt-14 lg:pb-23">
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

        <div className="relative">
          <div className="rounded-t-xl border border-black/80 bg-[#F4F1EA] p-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-black/20 pb-2 mb-3">
              <div className="flex gap-1">
                <span className="block w-3 h-3 rotate-45 bg-black/80" />
              </div>
              <div className="flex items-center gap-3 text-[11px] text-black/70">
                <span>My Trips</span>
                <span className="w-5 h-5 rounded-full border border-black/60 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full border border-black/60" />
                </span>
              </div>
            </div>

            <div className="w-full h-40 sm:h-48 rounded-md border border-black/30 bg-black/5 mb-4" />

            <p className="font-bold text-sm text-black mb-2">Paris, France</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {["4 Days", "Budget Friendly", "2 Travelers"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] border border-black/30 rounded-md px-2 py-1 text-black/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[11px] font-semibold text-black/80 mb-2">
              Recommended Stays
            </p>

            <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { name: "Generator Paris", loc: "10th Arr., Paris", price: "€45", rating: "4.1" },
                { name: "St Christopher's", loc: "Canal, Paris", price: "€39", rating: "4.3" },
                { name: "Le Regent Hostel", loc: "Montmartre, Paris", price: "€42", rating: "4.0" },
              ].map((stay) => (
                <div
                  key={stay.name}
                  className="border border-black/20 rounded-md p-1.5"
                >
                  <div className="w-full h-12 sm:h-14 rounded-sm border border-black/20 bg-black/5 mb-1.5" />
                  <p className="text-[9px] sm:text-[10px] font-semibold text-black leading-tight truncate">
                    {stay.name}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-black/50 leading-tight truncate">
                    {stay.loc}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-black/50 leading-tight">
                    From {stay.price}/night
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-black/70 leading-tight">
                    ★ {stay.rating}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-3 rounded-b-xl border border-t-0 border-black/80 bg-[#F4F1EA] relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-1.5 rounded-b-md border border-t-0 border-black/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;