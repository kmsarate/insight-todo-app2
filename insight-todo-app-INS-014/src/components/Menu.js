import { NavLink } from "react-router-dom";
import React from "react";
import "../styles/Menu.css";

const Menu = (props) => {
  const { modalHandler } = props;

  const SignOutHandler = () => {
    props.isLoggedInHandler();
    props.setSessionId("");
  };

  return (
    <div className="menu-container">
      <div className="menu-bar">
        <div className="menu-items">
          <h1>USER</h1>
          <div className="add-task-button" onClick={modalHandler}>
            <h1>+ Add a task</h1>
          </div>

          <div className="list">
            <h1>Lists</h1>
            <div className="list-items">
              <NavLink
                to={`/${props.sessionId}`}
                className={({ isActive }) =>
                  isActive ? "active-link" : "app-link"
                }
              >
                <h2>All Tasks</h2>
              </NavLink>
              <div className="list-items">
                <div
                  className={({ isActive }) =>
                    isActive ? "active-link" : "app-link"
                  }
                >
                  <h2>Today</h2>
                </div>
              </div>
              <div className="list-items">
                <div
                  className={({ isActive }) =>
                    isActive ? "active-link" : "app-link"
                  }
                >
                  <h2>Filters</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="calendar">
            <h1>Calendar</h1>
            <div className="calendar-items">
              <NavLink
                to="/Upcomings"
                className={({ isActive }) =>
                  isActive ? "active-link" : "app-link"
                }
              >
                <h1>Upcomings</h1>
              </NavLink>
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
