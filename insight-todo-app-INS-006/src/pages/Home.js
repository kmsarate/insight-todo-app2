import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate, useParams } from "react-router-dom";

// Components
import TaskModal from "../components/TaskModal";
import TaskList from "../components/TaskList";
import Menu from "../components/Menu";
import Navbar from "../components/navbar";

// db
import db from "../utils/db";

// Style
import "../styles/Home.css";

const Home = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // checked if isLoggedIn is false then redirect to / page
    if (props.isLoggedIn === false && props.sessionId === "") {
      navigate("/");
    }
  }, [navigate, props.isLoggedIn, props.sessionId]);

  const { modalHandler, showModal } = props;
  const current = new Date();
  const dateNow = `${current.getDate()}, ${current.getFullYear()}`;
  const [month, setMonth] = useState(current.getMonth());
  const convertMonth = (month) => {
    if (month === 0) setMonth("January");
    else if (month === 1) setMonth("February");
    else if (month === 2) setMonth("March");
    else if (month === 3) setMonth("April");
    else if (month === 4) setMonth("May");
    else if (month === 5) setMonth("June");
    else if (month === 6) setMonth("July");
    else if (month === 7) setMonth("August");
    else if (month === 8) setMonth("September");
    else if (month === 9) setMonth("October");
    else if (month === 10) setMonth("November");
    else if (month === 11) setMonth("December");

    return (
      <h5>
        {day}, {month} {dateNow}{" "}
      </h5>
    );
  };
  const [day, setDay] = useState(current.getDay());
  const convertDay = (day) => {
    if (day === 1) setDay("Monday");
    else if (day === 2) setDay("Tuesday");
    else if (day === 3) setDay("Wednesday");
    else if (day === 4) setDay("Thursday");
    else if (day === 5) setDay("Friday");
    else if (day === 6) setDay("Saturday");
    else if (day === 7) setDay("Sunday");
  };

  const id = parseInt(params.id);

  const updateHandler = (_id) => {
    props.taskList.forEach((task) => {
      if (task.taskid === _id) {
        db.tasks.update(task.taskid, { completed: !task.completed });
      }
    });
  };

  const deleteHandler = (_id) => {
    props.taskList.forEach((task) => {
      if (task.taskid === _id) {
        db.tasks.delete(task.taskid)
      }
    });
  };

  return (
    <>
      <Navbar />
      <Menu
        modalHandler={modalHandler}
        isLoggedInHandler={props.isLoggedInHandler}
        setSessionId={props.setSessionId}
      />
      <div className="home-container">
        <div className="task-bar-header">
          All tasks
          <div className="today-taskbar">
            Today
            <h5>
              {convertDay(day)} {convertMonth(month)}
            </h5>
          </div>
          {showModal ? <TaskModal modalHandler={modalHandler} id={id} /> : null}
          <div>
            <TaskList taskList={props.taskList} updateHandler={updateHandler} deleteHandler={deleteHandler} />
          </div>
          <div className="upcoming-taskbar">
            Upcoming
            <div className="upcoming-details">
              <h3>12 Mar - Saturday</h3>
              <h4>Upcoming Task 1</h4>
              <h3>14 Mar - Saturday</h3>
              <h4>Upcoming Task 1</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
