import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate, useParams, render } from "react-router-dom";
    
// Components
import Menu from "../components/Menu";
import Navbar from "../components/navbar";
import Button from "../components/button";
import TaskModal from "../components/TaskModal";
import TaskList from "../components/TaskList";
import ConfirmationModal from "../components/ConfirmationModal";

// db
import db from "../utils/db";

// Style
import "../styles/upcoming.css";
import Dropdown from "../components/Dropdown";

const Upcoming = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLoggedIn === false && props.sessionId === "") {
      navigate("/");
      props.setLoad(false)
    } else {
      props.setLoad(true)
    }
  }, [props.isLoggedIn, props.sessionId]);

  const current = new Date();
  const dateNow = `${current.getDate()}, ${current.getFullYear()}`;
  const [month, setMonth] = useState(current.getMonth());
  const [date, setDate] = useState(new Date());
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
    
    
    const onChange = date => {
      setDate(date);
    };
    return (
      <h5>
        {month} {year}{" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16 10l-4 4-4-4"></path></g></svg>
      </h5>
    );
  };

   // Functions
   const [edit, setEdit] = useState(false);
   const [editId, setEditId] = useState(0);
   const userid = parseInt(params.id);
 
   // Modal
   const [showModal, setShowModal] = useState(false);
   const [modalState, setModalState] = useState({
     deleteModal: false,
   });
   const [taskId, setTaskId] = useState();
   const modalHandler = () => {
     setEdit(false);
     setShowModal(!showModal);
   };
   
  const [year] = useState(current.getFullYear());

  const id = parseInt(params.id);

  return (
    <>
    <Navbar sessionId={props.sessionId}/>
      <Menu
        modalHandler={modalHandler} 
        isLoggedInHandler={props.isLoggedInHandler}
        setSessionId={props.setSessionId}
        sessionId={props.sessionId}
      />
      <div className="upcoming-container">
        <div className="upcoming-header">
          <h1>Calendar: Upcoming</h1>
        </div>
          <div className="upcoming-subheader">
            <button type="button" className="drop-calendar">
              {convertMonth(month)}
            </button> 
            <div className="upcoming-nav">
              <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0z"></path><path fill="currentColor" fill-rule="nonzero" d="M10.707 12l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L10.707 12z"></path></g>
                </svg>
              </button>
                <div className="separator"></div>
                  <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 24V0h24v24z"></path><path fill="currentColor" fill-rule="nonzero" d="M13.293 12L9.646 8.354a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 12z"></path></g></svg>
                  </button>
                  <Button type="button" label="Today" className="upcoming-button" />
            </div>
          </div>
          <div className="upcoming-calendar">
          <button className="upcoming-calendar-days">
            <span className="upcoming-weekday">Sun </span>
            <span className="upcoming-date-number">24</span>
          </button>
          <button className="upcoming-calendar-days">
            <span className="upcoming-weekday">Mon </span>
            <span className="upcoming-date-number">25</span>
          </button>
          <button className="upcoming-calendar-days">
            <span className="upcoming-weekday">Tue </span>
            <span className="upcoming-date-number">26</span>
          </button>
          <button className="upcoming-calendar-days">
            <span className="upcoming-weekday">Wed </span>
            <span className="upcoming-date-number">27</span>
          </button>
          <button className="upcoming-calendar-days">
            <span className="upcoming-weekday">Thu </span>
            <span className="upcoming-date-number">28</span>
          </button>
          <button className="upcoming-calendar-days-current">
            <span className="upcoming-weekday">Fri </span>
            <span className="upcoming-date-number">29</span>
          </button>
          <button className="upcoming-calendar-days">
            <span className="upcoming-weekday">Sat </span>
            <span className="upcoming-date-number">30</span>
          </button>
          </div>
          <div className="add-task-btn" onClick={modalHandler}>
            <h1>+ Add a task</h1>
          </div>
          <div className="add-form">
          {showModal ? (
            <TaskModal
              modalHandler={modalHandler}
              userid={userid}
              notify={props.notify}
              edit={edit}
              setEdit={setEdit}
              editId={editId}
              taskList={props.taskList}
            />
          ) : null}
          </div>
      </div>
    </>
  );
};

export default Upcoming;