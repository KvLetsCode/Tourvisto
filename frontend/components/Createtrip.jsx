import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  comboBoxItems,
  selectItems,
  travelStyles,
} from "../src/constants/index.js";
import { formatKey } from "../lib/utils.js";
import LeafletMap from "../lib/WorldMap.jsx";
import { useNavigate } from "react-router-dom";

const Createtrip = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

     if (
            !formData.country ||
            !formData.travelStyle ||
            !formData.interest ||
            !formData.budget ||
            !formData.groupType 
        ) {
            setError('Please Provide values for all fields')
            setLoading(false)
            return
    }
    
    if (formData.duration < 1 || formData.duration > 10) {
            setError('Duration must be between 1 and 10 days')
            setLoading(false)
            return
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/add`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          country: formData.country,
            duration: formData.duration,
            travelStyles: formData.travelStyle,
            interest: formData.interest,
            budget: formData.budget,
            groupType: formData.groupType
        })
      })

      const result =await res.json()
      
      if (result?.id) navigate(`/getOne/${result.id}`)
      else console.log("Error generating trip".result);
      
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    async function fetchCountry() {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=flag,name,latlng,maps"
      );

      const data = await response.json();

      const countries = data.map((country) => ({
        name: country.flag + country.name.common,
        coordinates: country.latlng,
        value: country.name.common,
        openStreetMap: country.maps?.openStreetMaps,
      }));
      setCountries(countries);
    }
    fetchCountry();
  }, []);

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const mapsData = [
    {
      country: formData?.country,
      color: "#EA382E",
      coordinates:
        countries?.find((c) => c.value === formData.country)?.coordinates || [],
    },
  ];

  

  return (
    <main className="flex flex-col gap-10 pb-20 w-full max-w-7xl mx-auto px-4 lg:px-8 mt-8">
      <header className="flex flex-col gap-5 md:flex-row justify-between w-full">
        <article className="flex flex-col gap-3.5 w-full">
          <h1
            className={`
                      "text-dark-100",
                      ${
                        location.pathname === "/"
                          ? "text-2xl md:text-4xl"
                          : "text-xl md:text-2xl font-semibold"
                      }
                  `}
          >
            Add a New Trip
          </h1>
          <p
            className={`
                      "text-dark-100 font-normal",
                      ${
                        location.pathname === "/"
                          ? "text-base md:text-lg"
                          : "text-sm md:text-lg "
                      }
                  `}
          >
            View and Edit AI-generated Travel Plans
          </p>
        </article>
      </header>
      <section className="mt-2.5 w-full max-w-3xl px-4 lg:px-8 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100"
        >
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label
              htmlFor="country"
              className="text-sm font-normal text-gray-100"
            >
              Country
            </label>
            <Autocomplete
              id="country"
              options={countryData}
              getOptionLabel={(option) => option.text}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              } // important for matching
              onChange={(event, newValue) => {
                if (newValue) {
                  // send only the value (like "India") to your formData
                  handleChange("country", newValue.value);
                }
              }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Select a country"
                  variant="outlined"
                />
              )}
              fullWidth
            />
          </div>
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label
              htmlFor="duration"
              className="text-sm font-normal text-gray-100"
            >
              Duration
            </label>
            <input
              type="number"
              required
              min={1}
              max={10}
              name="duration"
              placeholder="Enter number of days (1-10)"
              className="p-3.5 border border-black/40 rounded-md text-base text-dark-300 font-normal placeholder:text-gray-500/80 placeholder:font-medium"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>
          {selectItems.map((key) => (
            <div
              key={key}
              className="w-full flex flex-col gap-2.5 px-6 relative"
            >
              <label
                htmlFor={key}
                className="text-sm font-normal text-gray-100 capitalize"
              >
                {formatKey(key)}
              </label>

              <Autocomplete
                id={key}
                options={comboBoxItems[key] || []} // array of strings
                getOptionLabel={(option) => option} // if array of strings
                onChange={(event, value) => {
                  if (value) {
                    handleChange(key, value);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Select a ${formatKey(key)}`}
                    variant="outlined"
                    required
                  />
                )}
                filterOptions={(options, { inputValue }) =>
                  options.filter((item) =>
                    item.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }
                fullWidth // optional styling
              />
            </div>
          ))}

          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label
              htmlFor="location"
              className="text-sm font-normal text-gray-100 capitalize"
            >
              Location on World Map
            </label>
            <LeafletMap mapsData={mapsData} />
          </div>
          <footer className="px-6 w-full">
            <button
              type="submit"
              className="!h-12 !w-full !bg-primary-100 !px-4 !rounded-lg !flex !items-center !justify-center !gap-1.5 !shadow-none cursor-pointer"
            >
              <img
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
                className={`size-5 ${loading && "animate-spin"}`}
              />
              <span className="text-sm md:text-base font-semibold text-white">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default Createtrip;
