import { useEffect, useState } from "react";
import TripCard from "../lib/TravelCard";
import { parseTripData } from "../lib/utils";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";


const TravelPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 8;

  useEffect(() => {
    async function fetchPosts(page) {
      setLoading(true)
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getAll?page=${page}&limit=${limit}`);
        const { data,pages } = await res.json();

        // const parsedData = parseTripData(data.info)
        // console.log(parsedData.name);
        setTotalPages(pages)
        const parsed = data.map(({ _id, info, images }) => ({
          id: _id,
          ...parseTripData(info),
          images: images ?? [],
        }));

        setPosts(parsed);
      } catch (err) {
        console.error("Error:", err);
      }
      setLoading(false)
    }
    fetchPosts(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (
  <>
    {loading ? (
      <main className="w-full min-h-screen flex flex-col gap-10 max-w-7xl mx-auto px-4 lg:px-8 mt-18">
        <section>
          <h1 className="text-lg md:text-2xl font-semibold text-dark-100 mb-4">
            Handpicked Trips
          </h1>
          <p className="text-gray-400 ">
            Browse well-planned trips designed for different travel styles and
            interests
          </p>
        </section>
        <div className="flex justify-center items-center flex-1">
          <CircularProgress />
        </div>
      </main>
    ) : (
      <main className="w-full min-h-screen flex flex-col gap-10 max-w-7xl mx-auto px-4 lg:px-8 mt-18">
        <section>
          <h1 className="text-lg md:text-2xl font-semibold text-dark-100 mb-4">
            Handpicked Trips
          </h1>
          <p className="text-gray-400 ">
            Browse well-planned trips designed for different travel styles and
            interests
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-4 mt-6">
            {posts.map((post) => (
              <TripCard
                key={post.id}
                id={post.id}
                name={post.name}
                location={post.itinerary[0].location + ", " + post.country || ""}
                imageUrl={post.images[0]}
                tags={[post.interests, post.travelStyle]}
                price={post.estimatedPrice}
              />
            ))}
          </div>
        </section>
        <Stack spacing={2} alignItems="center" mt={3} mb={4} className="border-t border-t-gray-300 pt-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </main>
    )}
  </>
  );

};

export default TravelPage;
