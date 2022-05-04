import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import "../styles/navbar.css";
import UserNone from "../def/User.svg";
import { FiMenu, FiSearch} from "react-icons/fi";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";

// db
import db from "../utils/db";

const Navbar = (props) => {
  const user = useLiveQuery(() =>
    db.users.where("userid").equals(props.sessionId).toArray()
  );
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) setImage(user[0].img);
  }, [user]);

  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div className="right-col">
          <div className="right-icon">
            <li className="menu-icon">
            <FiMenu />
            </li> 
          </div>
          <div className="search-box-container">
            
            <div className="search-box">
        <div className="search-icon"><FiSearch /></div>
              <input
                className="search-bar"
                type="text"
                placeholder="Search"
                
              ></input>
            </div>


          </div>
        </div>
        <ul className="left-icon-wrapper">
          <li className="li-wrapper"> 
          <div className="setting">
            <IoMdSettings />
          </div>
          </li>
          <li className="li-wrapper">
          <div className="notification">
            <IoMdNotifications />
          </div>
          </li>
          <li className="li-wrapper">
            <NavLink to={`/profile/${props.sessionId}`}>
              <div
                className="user-img-small"
                style={
                  image === "none"
                    ? { backgroundImage: `url(${UserNone})` }
                    : { backgroundImage: "url(" + image + ")" }
                }
              ></div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;