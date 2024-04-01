import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export function PageLayout() {
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
