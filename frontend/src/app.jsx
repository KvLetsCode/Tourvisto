import { Routes,Route } from "react-router-dom"
import Layout from "../components/layout"
import Home from "../components/Home"
import TravelDetail from "../components/TravelDetail"
import Createtrip from "../components/Createtrip"
import Payment from "../components/Payment"
import Congrats from "../components/Congrats"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/getOne/:id" element={<TravelDetail />} />
        <Route path="/pay/congrats" element={<Congrats />}  />
      </Route>
      <Route path="/createtrip" element={<Createtrip />} />
      <Route path="/pay/:id" element={<Payment />} />
      
    </Routes>
  )
}

export default App