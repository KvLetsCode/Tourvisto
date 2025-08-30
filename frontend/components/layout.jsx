// Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  // Don't render navbar here if we're on home page
  const hideNavbarOnHome = location.pathname === "/";

  return (
    <div>
      {!hideNavbarOnHome && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
