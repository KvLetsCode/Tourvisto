import React from "react";

function TravelDestData({ name }) {
  return (
    <>
      <div className="absolute left-8 top-6 text-black bg-white rounded-lg">
        <p className="px-3 text-[#FF543D] font-semibold">3.6</p>
      </div>
      <div className="absolute bottom-6 left-8 bg-black/18 ">
        <p className="text-white text-2xl font-semibold">{name}</p>
        <div className="flex items-center gap-2 mt-2 ">
          <img
            src="/assets/images/david.webp"
            alt=""
            className="rounded-full size-6 border-white border "
          />
          <span className="text-white">196 Views</span>
        </div>
      </div>
    </>
  );
}

export default TravelDestData;
