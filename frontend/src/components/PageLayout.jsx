import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

export default function PageLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
}
