import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate, useParams, render } from "react-router-dom";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
    
// Components
import Menu from "../components/Menu";
import Navbar from "../components/navbar";

// db
import db from "../utils/db";

// Style
import "../styles/upcoming.css";

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
    
  };
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

  const events = [
    {
      title: "National Elections",
      allDay: true,
      start: new Date(2022, 4, 9),
      end: new Date(2022, 4, 9),
  },
];

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
          <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px", marginTop: "25px" }} />
      </div>
    </>
  );
};

export default Upcoming;