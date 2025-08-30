import TravelDestDataTwo from "./TravelDestDataTwo";
import { Link } from "react-router-dom";


function GridTwo({id,img,name}) {
  return (
      <>
          <Link to={id} className=" lg:w-[18rem] h-[170px] overflow-hidden rounded-xl relative">
              <img
                src={img}
                alt="Australia Tour"
                className="w-full h-full object-cover"
              />
              <TravelDestDataTwo name={name} />
            </Link>
      </>
  )
}

export default GridTwo