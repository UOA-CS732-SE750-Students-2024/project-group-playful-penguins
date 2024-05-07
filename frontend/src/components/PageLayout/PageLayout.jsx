import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export function PageLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
}
