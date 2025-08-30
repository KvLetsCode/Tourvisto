import React from "react";

function TravelDestDataTwo({ name }) {
  return (
    <>
      <div className="absolute left-6 top-4 text-black bg-white rounded-lg">
        <p className="px-3 text-[#FF543D] font-semibold">3.6</p>
      </div>
      <div className="absolute bottom-2 left-8 bg-black/1 ">
        <p className="text-white text-lg font-semibold">{name}</p>
        <div className="flex items-center gap-1 mt-1 ">
          <img
            src="/assets/images/david.webp"
            alt=""
            className="rounded-full size-4 border-white border"
          />
          <span className="text-white text-sm">196 Views</span>
        </div>
      </div>
    </>
  );
}

export default TravelDestDataTwo;