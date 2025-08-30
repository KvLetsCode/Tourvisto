import { Link } from "react-router-dom";

import TravelDestData from "../lib/TravelDestData";
import GridTwo from "../lib/GridTwo";
import { useEffect, useState } from "react";
import { parseTripData } from "../lib/utils";
import CircularProgress from "@mui/material/CircularProgress";


function TraveDest() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/getAll?limit=6`
        );
        const { data } = await res.json();

        const parsed = data.map(({ _id, info, images }) => ({
          id: _id,
          ...parseTripData(info),
          images: images ?? [],
        }));

        setPosts(parsed);
      } catch (err) {
        console.error("Error:", err);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

 

  return (
    <>
      {loading ? (
        <main>
          <div className=" w-full min-h-screen flex flex-col  max-w-7xl mx-auto px-4 lg:px-8 mt-18 lg:pr-0 pr-10">
            <h1 className="text-lg md:text-2xl font-semibold text-dark-100 mb-4 ">
              Featured Travel Destinations
            </h1>
            <p className="text-gray-400">
              Check out some of the best places you can visit around the world.
            </p>
            <div className="flex justify-center items-center flex-1">
          <CircularProgress size={42} />
        </div>
          </div>

          
        </main>
      ) : (
        <main className="">
          <div className=" w-full min-h-screen flex flex-col  max-w-7xl mx-auto px-4 lg:px-8 mt-18 lg:pr-0 pr-10">
            <h1 className="text-lg md:text-2xl font-semibold text-dark-100 mb-4 ">
              Featured Travel Destinations
            </h1>
            <p className="text-gray-400">
              Check out some of the best places you can visit around the world.
            </p>

            <div className="grid gap-2 md:grid-cols-3 rounded-xl mt-8 ml-10 place-items-stretch">
              <div className="md:col-span-2 grid grid-cols-2 gap-4 ">
                <Link
                  to={`/getOne/${posts?.[0]?.id}`}
                  className={`col-span-2 block overflow-hidden rounded-xl relative`}
                >
                  <img
                    src={posts?.[0]?.images?.[1]}
                    alt="Barcelona Tour"
                    className={`w-full h-[260px] object-cover`}
                  />
                  <TravelDestData name={posts?.[0]?.country + " " + "Tour"} />
                </Link>
                <Link
                  to={`/getOne/${posts?.[1]?.id}`}
                  className={`col-span-1 block overflow-hidden rounded-xl relative`}
                >
                  <img
                    src={posts?.[1]?.images?.[0]}
                    alt="Barcelona Tour"
                    className={`w-full h-[260px] object-cover`}
                  />
                  <TravelDestData name={posts?.[1]?.country + " " + "Tour"} />
                </Link>

                <Link
                  to={`/getOne/${posts?.[2]?.id}`}
                  className={`col-span-1 block overflow-hidden rounded-xl relative`}
                >
                  <img
                    src={posts?.[2]?.images?.[1]}
                    alt="Barcelona Tour"
                    className={`w-full h-[260px] object-cover`}
                  />
                  <TravelDestData name={posts?.[2]?.country + " " + "Tour"} />
                </Link>
              </div>

              {/* RIGHT: three small stacked */}
              <div className="grid grid-rows-3 gap-2 overflow-hidden rounded-xl">
                <GridTwo
                  id={`/getOne/${posts?.[3]?.id}`}
                  img={posts?.[3]?.images?.[0]}
                  name={posts?.[3]?.country + " " + "Tour"}
                />
                <GridTwo
                  id={`/getOne/${posts?.[4]?.id}`}
                  img={posts?.[4]?.images?.[0]}
                  name={posts?.[4]?.country + " " + "Tour"}
                />
                <GridTwo
                  id={`/getOne/${posts?.[5]?.id}`}
                  img={posts?.[5]?.images?.[2]}
                  name={posts?.[5]?.country + " " + "Tour"}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default TraveDest;
