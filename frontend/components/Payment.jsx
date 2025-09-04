import { useEffect, useState } from "react";
import Input from "../lib/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { parseTripData } from "../lib/utils";

const Payment = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null)
  const navigate = useNavigate()

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
  }, [id]);

  console.log(trip);

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/pay/congrats')
  }
  
  return (
    <main className="grid lg:grid-cols-2 h-dvh">
      <section className="flex flex-col lg:items-center  !mt-8 !ml-8 h-auto !mb-16 lg:justify-center">
        <Link to={`/getOne/${id}`} className="w-full flex flex-col items-start lg:!ml-[10rem]">
          <span className="flex items-center gap-2">
            <img src="/assets/icons/arrow-left.svg" alt="" />
            <img src="/assets/icons/logo.svg" alt="" />
            <h1 className="text-2xl font-bold">Tourvisto</h1>
            
          </span>
        </Link>
        <div className="flex flex-col items-start !mt-8">
          <h1 className="text-xl font-semibold text-gray-500">{trip?.name}</h1>
          <p className="font-bold text-2xl mt-1">{trip?.estimatedPrice}</p>
          <img src={trip?.imagesUrls?.[0]} alt="" className="h-50 w-50 rounded-lg !mt-4" />
          <p className="font-semibold text-xl mt-5">{trip?.duration} Day {trip?.country} Adventure</p>
          <p className="font-semibold mt-2 text-lg text-gray-500">{trip?.travelStyle} , {trip?.budget}, {trip?.interests }</p>
        </div>
      </section>
      <form onSubmit={handleSubmit} className="shadow-200 flex flex-col !pt-8 lg:!pt-0 items-center justify-center ">
        <div className="lg:max-w-md max-w-screen">
          <button type="button"  className="flex justify-center  rounded-lg !p-2 bg-black text-white w-full 1mt-6 cursor-pointer ">
            Pay Using UPI
          </button>
          <div className="!mt-10 flex flex-row items-center gap-6 ">
            <div className="w-[139px] border border-gray-300" />
            <span className="text-gray-500">Or pay with card </span>
            <div className="w-[139px] border border-gray-300" />
          </div>
          <div className="flex flex-col">
            <div className="mt-3 w-full flex flex-col ">
              <label htmlFor="email" className="text-gray-500 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
                className="p-2 shadow-lg rounded-lg h-full mt-3 border border-gray-300 outline-none font-semibold"
              />
            </div>
            <div className="!mt-8 w-full flex flex-col">
              <label htmlFor="email" className="text-gray-500 font-semibold">
                Country or region
              </label>
              <div className="shadow-lg w-full h-full border border-gray-300 mt-4 rounded-lg">
                <span className="flex items-center">
                  <input
                    type="number"
                    inputMode="numeric"
                    name="number"
                    required
                    min={1000000000000000}
          
                    className="w-[62%] p-2  h-full  outline-none  border-gray-300 rounded-tl-lg rounded-tr-lg font-semibold "
                    placeholder="1234 1234 1234 1234"
                  />
                  <ul className="flex gap-3 items-center">
                    <li>
                      <img src="/assets/images/Visa.png" className="size-8"/>
                    </li>
                    <li>
                      <img src="/assets/images/american-express.png" className="size-8"  />
                    </li>
                    <li>
                      <img src="/assets/images/discover.png" className="size-8" />
                    </li>
                    <li>
                      <img src="/assets/images/money.png" className="size-8" />
                    </li>
                  </ul>
                </span>

                <span className="flex ">
                  <input
                    type="number"
                    inputMode="numeric"
                    name="number"
                    placeholder="MM/YY"
                    min={1}
                    required
                    className="w-auto p-2  h-full outline-none border border-gray-300 rounded-bl-lg font-semibold"
                  />
                  <span className="flex gap-1 items-center rounded-br-lg border border-gray-300   ">
                    <input
                      type="number"
                      inputMode="numeric"
                      name="number"
                      min={100}
                      
                      placeholder="CVV"
                      required
                      className="p-2 w-[75%] h-full outline-none  rounded-br-lg font-semibold"
                    />
                    <Input image="/assets/images/cvv.png" />
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <label htmlFor="name" className="text-gray-500 font-semibold">
                Name on card
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="border-gray-300 outline-none  border rounded-lg shadow-lg h-full p-2 mt-4 placeholder:font-semibold"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-2 mt-8">
              <label htmlFor="ZIP" className="font-semibold text-gray-500">
                Country or region
              </label>
              <div className="flex flex-col border border-gray-200 w-full rounded-lg shadow-lg">
                <input
                  type="text"
                  name="ZIP"
                  id="ZIP"
                  required
                  className="border-gray-300 border outline-none rounded-t-lg p-1 placeholder:font-semibold"
                  placeholder="Add your countrty or region here"
                />
                <input
                  type="number"
                  name="ZIP"
                  id="ZIP"
                  required
                  placeholder="ZIP"
                  className="border-gray-300 border outline-none rounded-b-lg p-1 placeholder:font-semibold"
                />
              </div>
            </div>

            <button type="submit" className="w-full text-center rounded-lg p-2 bg-black text-white mt-6 cursor-pointer">
              {" "}
              Pay {trip?.estimatedPrice}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Payment;
