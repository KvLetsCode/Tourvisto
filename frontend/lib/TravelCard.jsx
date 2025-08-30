import { Link, useLocation } from "react-router-dom";
import { getFirstWord } from "./utils";


const TripCard = ({ id, name, location, price, tags, imageUrl }) => {
  
  return (
    <Link
      to={`/getOne/${id}`}
      className="shadow-500 bg-white rounded-[20px] flex-col w-full relative"
    >
      <img
        src={imageUrl}
        alt={name}
        className=" w-full h-[160px] rounded-t-xl object-cover aspect-video"
      />

      <article
        className="flex flex-col gap-3 mt-4 pl-[18px] pr-3.5;
      h2 "
      >
        <h2 className="text-sm md:text-lg font-semibold text-dark-100 line-clamp-2">
          {name}
        </h2>
        <figure className="flex items-center gap-2">
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption className="text-xs md:text-sm font-normal text-gray-100;">
            {location}
          </figcaption>
        </figure>
      </article>

      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span className={`${index===1 ?'!bg-pink-50 !text-pink-500':'!bg-success-50 !text-success-700'} rounded-xl shadow-sm text-xs p-2 font-semibold`} key={index}>{getFirstWord(tag)}</span>
          ))}
        </div>
      </div>

      <article className="bg-white py-1 px-2.5 w-fit rounded-[20px] absolute top-2.5 right-4 text-dark-100 text-sm font-semibold">
        {price}
      </article>
    </Link>
  );
};

export default TripCard;
