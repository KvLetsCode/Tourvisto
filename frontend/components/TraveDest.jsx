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
          `${import.meta.env.VITE_API_URL}/api/v1/getAll?limit=7`
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
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 mt-16">
            <h1 className="text-lg md:text-2xl font-semibold text-dark-100 mb-2">
              Featured Travel Destinations
            </h1>
            <p className="text-gray-500">
              Check out some of the best places you can visit around the world.
            </p>

            <div className="grid gap-3 md:grid-cols-3 rounded-xl mt-6 ">
              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <Link
                  to={`/getOne/${posts?.[0]?.id}`}
                  className="col-span-2 block overflow-hidden rounded-xl relative"
                >
                  <img
                    src={posts?.[0]?.images?.[1]}
                    alt="Destination"
                    className="w-full h-[220px] md:h-[260px] object-cover"
                  />
                  <TravelDestData name={posts?.[0]?.country + " Tour"} />
                </Link>

                {/* two small cards */}
                {posts?.slice(1, 3).map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/getOne/${post.id}`}
                    className="block overflow-hidden rounded-xl relative"
                  >
                    <img
                      src={post.images?.[0]}
                      alt="Destination"
                      className="w-full h-[200px] md:h-[260px] object-cover"
                    />
                    <TravelDestData name={post.country + " Tour"} />
                  </Link>
                ))}
              </div>

              {/* RIGHT stacked */}
              <div className="grid grid-rows-3 gap-3">
                {posts?.slice(3, 6).map((post) => (
                  <GridTwo
                    key={post.id}
                    id={`/getOne/${post.id}`}
                    img={post.images?.[0]}
                    name={post.country + " Tour"}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default TraveDest;
