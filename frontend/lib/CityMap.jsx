import CityMap from "./CitySetup";

export default function City({ location }) {
  const cityData = { city: location?.['city'], lat: location?.['coordinates'][0], lon: location?.['coordinates'][1] };

  return (
    <div className="max-w-4xl  w-[90%]">
      <CityMap lat={cityData?.lat} lon={cityData?.lon} city={cityData?.city} />
    </div>
  );
}
