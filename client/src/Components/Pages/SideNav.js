import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/LandingPage"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/erchistory"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              ERC History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/uploadversions"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              ERC Uploads
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideNav;
