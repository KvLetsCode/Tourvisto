import React from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";


function Header() {
  
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/hero-img.png')" }}
    >
      <div
  className="
    absolute inset-0 
    bg-gradient-to-r 
    from-white/90 via-white/60 to-transparent
    sm:from-white/80 sm:via-white/50 sm:to-transparent  
    md:from-white/60 md:via-white/20 md:to-transparent 
    lg:from-white/80 lg:via-white/30 lg:to-transparent"
></div>

      <Navbar />
      <div className="absolute inset-0 z-10 md:mt-[18rem] ml-[3rem] lg:ml-[10rem] mt-[25rem] ">
        <h1 className="lg:text-6xl text-5xl font-bold lg:leading-16">
          Plan Your <br /> Trip with Ease{" "}
        </h1>
        <p className="mt-6 font-semibold ml-1 leading-relaxed lg:text-lg text-md ">
          Customize your travel itinerary in minutes using AI—pick your <br />
          destination, set your preferences, and explore with confidence.
        </p>

        <Link
          to="/createtrip"
          className=" inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition text-sm sm:text-base md:text-lg lg:text-xl sm:px-6 md:px-8 lg:px-10 mt-4 "
        >
          Get Started
        </Link>
          </div>
          
    </div>
  );
}

export default Header;
