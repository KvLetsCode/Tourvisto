import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/hero-img.png')" }}
    >
      {/* Overlay */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-r 
          from-white/90 via-white/60 to-transparent
          sm:from-white/80 sm:via-white/50 sm:to-transparent  
          md:from-white/60 md:via-white/20 md:to-transparent 
          lg:from-white/80 lg:via-white/30 lg:to-transparent
        "
      ></div>

      <Navbar />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-40">
        <h1 className="lg:text-4xl text-5xl font-bold leading-tight">
          Plan Your <br /> Trip with Ease
        </h1>
        <p className="mt-6 font-semibold leading-relaxed lg:text-md text-md max-w-xl">
          Customize your travel itinerary in minutes using AI—pick your <br />
          destination, set your preferences, and explore with confidence.
        </p>

        <Link
  to="/createtrip"
  className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition w-fit"
>
  Get Started
</Link>
      </div>
    </div>
  );
}

export default Header;
