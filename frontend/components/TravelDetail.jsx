import { useEffect, useState } from "react";
import { parseTripData } from "../lib/utils";
import { useParams,Link } from "react-router-dom";
import InfoPill from "../lib/InfoPill";
import City from "../lib/CityMap";
import TripCard from "../lib/TravelCard";
import { getFirstWord } from "../lib/utils";
import CircularProgress from '@mui/material/CircularProgress';

function TravelDetail() {
  const [trip, setTrip] = useState(null);
  const [posts ,setPosts] = useState([])
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getOne/${id}`);
        const { data } = await res.json();

        const parsedTrip = {
          id: data._id,
          ...parseTripData(data.info),
          imagesUrls: data.images,
        };
        setTrip(parsedTrip);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchPost();
  }, [id]); // rerun when id changes

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getAll?limit=4`);
        const { data } = await res.json();

        const parsed = data.map(({ _id, info, images }) => ({
        id: _id,
        ...parseTripData(info),
        images: images ?? [],
        }))

        setPosts(parsed);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    fetchPosts();
  }, []);

  const {
    name,
    duration,
    itinerary,
    travelStyle,
    interests,
    budget,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
    groupType,
    imagesUrls,
    location
  } = trip || {};

  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50  !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50  !text-primary-500" },
    { text: budget, bg: "!bg-success-50  !text-success-700" },
    { text: interests, bg: "!bg-navy-50  !text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    { title: "Best Time to Visit", items: bestTimeToVisit },
    { title: "Weather", items: weatherInfo },
  ];

  if (!trip) return <p className="flex justify-center mt-50"><CircularProgress size={40}  /></p>;

  return (
    <main className="flex flex-col gap-9 mt-8  w-full max-w-5xl px-4 lg:px-8 mx-auto ">
      <header className="flex flex-col gap-6 overflow-hidden">
        <h1 className="text-dark-100 text-3xl md:text-[40px] md:leading-[44px] font-semibold">
         {name}
        </h1>
        <div className="flex items-center gap-5">
          <InfoPill
            text={`${duration} day plan`}
            image="/assets/icons/calendar.svg"
          />
          <InfoPill
            text={
              itinerary
                ?.slice(0, 2)
                .map((item) => item.location)
                .join(", ") || ""
            }
            image="/assets/icons/location-mark.svg"
          />
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7 mt-1">
        {imagesUrls?.map((url, i) => (
          <img
            src={url}
            key={i}
            className={`w-full rounded-xl object-cover ${
              i == 0
                ? "md:col-span-2 md:row-span-2 h-[330px]"
                : "md:row-span-1 h-[150px]"
            }`}
          />
        ))}
      </section>

      <section className="flex flex-wrap justify-between  gap-3 md:gap-8 items-center">
        <div className="mt-5 pl-[18px] pr-3.5 pb-5">
          <div className="flex gap-2">
            {pillItems.map((pill, index) => (
              <span
                className={`${pill.bg} !text-sm !font-medium !px-4 py-1 rounded-xl  `}
                key={index}
              >
                {getFirstWord(pill.text)}
              </span>
            ))}
            </div>
        </div>
        <ul className="flex gap-1 items-center">
            {Array(5)
              .fill("null")
              .map((_, index) => (
                <li key={index}>
                  <img
                    src="/assets/icons/star.svg"
                    alt="star"
                    className="size-[18px]"
                  />
                </li>
              ))}
            <li className="ml-2">
              <div className="mt-5  pb-5">
                <div>
                  <p className='px-4 py-0.5 text-sm bg-[#FFF4ED] text-[#B93815] rounded-xl font-semibold shadow-sm'>4.9/5</p>
                </div>
              </div>
            </li>
          </ul>       
          </section>
          
        <section className="flex justify-between gap-5">
          <article className="flex flex-col gap-4">
            <h3 className=" text-xl md:text-3xl text-dark-100 font-semibold">
              {" "}
              {duration}-Day {country} {travelStyle} Trip
            </h3>
            <p className="text-base md:text-2xl text-gray-100 font-normal">
              {budget} , {groupType} and {getFirstWord(interests)}
            </p>
          </article>
          <h2 className="text-sm md:text-xl  text-dark-100 font-semibold">{estimatedPrice}</h2>
          </section>
          <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
          </p>
          
        <ul className="flex flex-col gap-9">
          {itinerary?.map((dayPlan, index) => (
            <li key={index} className="flex flex-col gap-4 border-b pb-8 border-b-gray-200">
              <h3 className="text-base md:text-xl font-semibold text-dark-400">
                Day {dayPlan.day} : {dayPlan.location}
              </h3>

              <ul className="flex flex-col sm:gap-3 gap-7">
                {dayPlan?.activities?.map((activity, index) => (
                  <li key={index} className="flex max-sm:flex-col flex-row justify-between sm:gap-7 gap-3 text-sm md:text-lg font-normal text-dark-400 !list-disc">
                    <span className="flex-shrink-0 w-[90px]  text-[14px] md:text-[18px] leading-[14px] md:leading-[16px] font-semibold">
                      {activity.time}
                    </span>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          </ul>
          {visitTimeAndWeatherInfo.map((section) => (
          <section key={section.title} className="flex flex-col gap-5 border-b pb-8 border-b-gray-200">
            <div className=" flex flex-col gap-4">
              <h3 className="text-base md:text-xl text-dark-400 font-semibold">{section.title}</h3>

              <ul className="flex flex-col gap-3">
                {section.items?.map((item) => (
                  <li key={item} className="flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc">
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
              </div>
            </section>
            
          ))}
      <section className="flex flex-col items-center justify-center">
        <City location={location}/>
        <Link to={`/pay/${id}`} className="mt-4 text-center bg-blue-500 text-white hover:scale-101 hover:shadow-100 cursor-pointer px-6 py-3 rounded-xl  w-[90%]">
          <p className="font font-semibold  ">Pay and join trip <span className="rounded-full bg-white text-black px-1.5 text-xm font-semibold ">{estimatedPrice}</span></p>
      </Link>
      </section>
      <section className="mt-2">
        <h1 className="text-3xl font-bold mb-2">Popular Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mb-4 mt-6">
          {posts?.map(post => (
            <TripCard
              key={post.id}
              id={post.id}
              name={post.name}
              location={post?.itinerary[0]?.location +', '+ post.country || ""}
              imageUrl={post.images[0]}
              tags={[post?.interests, post?.travelStyle]}
              price={post.estimatedPrice}
            />
          ))}
        </div>
      </section>
      
    </main>
  );
}

export default TravelDetail;
