import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = (props) => {
  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div className="right-col">
          <div className="right-icon">
            <li className="menu-icon">Menu</li>
          </div>
          <div className="search-box-container">
            <div className="search-box">
              <h1 className="icon">S</h1>
              <input
                className="search-bar"
                type="text"
                placeholder="Search"
              ></input>
            </div>
          </div>
        </div>
        <ul className="left-icon-wrapper">
          <li className="li-wrapper">Setting</li>
          <li className="li-wrapper">Bell</li>
          <li className="li-wrapper">
            <NavLink to={`/profile/${props.sessionId}`}>Profile</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
