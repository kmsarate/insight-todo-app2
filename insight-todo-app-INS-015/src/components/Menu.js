import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import "../styles/Menu.css";
import UserNone from "../def/User.svg";

// db
import db from "../utils/db";

const Menu = (props) => {
  const { modalHandler } = props;

  const SignOutHandler = () => {
    props.isLoggedInHandler();
    props.setSessionId("");
  };

  const user = useLiveQuery(() =>
    db.users.where("userid").equals(props.sessionId).toArray()
  );

  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) setImage(user[0].img);
  }, [user]);

  return (
    <div className="menu-container">
      <div className="menu-bar">
        <div className="menu-items">
          <div className="col-2">
            <div
              className="user-img-small"
              style={
                image === "none"
                  ? { backgroundImage: `url(${UserNone})` }
                  : { backgroundImage: "url(" + image + ")" }
              }
            ></div>
            <h1> {user ? user[0].username : "username"} </h1>
          </div>
          <div className="add-task-button" onClick={modalHandler}>
            <h1>+ Add a task</h1>
          </div>

          <div className="list">
            <h1>Lists</h1>
            <div className="list-items">
              <NavLink
                to={`/${props.sessionId}`}
                className={props.filter === "all" ? "active-link" : "app-link"}
                onClick={() => props.filterChangeHandler("all")}
              >
                <h2>All Tasks</h2>
              </NavLink>
              <div className="list-items">
                <NavLink
                  to={`/${props.sessionId}`}
                  className={props.filter === "today" ? "active-link" : "app-link"}
                  onClick={() => props.filterChangeHandler("today")}
                >
                  <h2>Today</h2>
                </NavLink>
              </div>
              <div className="list-items">
              <NavLink
                to={`/${props.sessionId}`}
                className={props.filter === "filter" ? "active-link" : "app-link"}
                onClick={() => props.filterChangeHandler("filter")}
              >
                <h2>Filters</h2>
              </NavLink>
              </div>
            </div>
          </div>
          <div className="calendar">
            <h1>Calendar</h1>
            <div className="calendar-items">
              <div
                className={({ isActive }) =>
                  isActive ? "active-link" : "app-link"
                }
              >
                <h1>Upcomings</h1>
              </div>
            </div>
          </div>

          <div className="signout-button" onClick={SignOutHandler}>
            <h1>Sign Out</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
