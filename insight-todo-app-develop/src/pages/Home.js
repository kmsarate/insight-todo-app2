import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate, useParams } from "react-router-dom";

// Components
import TaskModal from "../components/TaskModal";
import TaskList from "../components/TaskList";
import ConfirmationModal from "../components/ConfirmationModal";
import Menu from "../components/Menu";
import Navbar from "../components/navbar";

// db
import db from "../utils/db";

// Style
import "../styles/Home.css";

const Home = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  // Effects;
  useEffect(() => {
    if (props.isLoggedIn === false && props.sessionId === "") {
      navigate("/");
      props.setLoad(false)
    } else {
      props.setLoad(true)
    }
  }, [props.isLoggedIn, props.sessionId]);

  // Display Date
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
      <>
        {day}, {month} {dateNow}{" "}
      </>
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

  const taskList = useLiveQuery(() =>
    db.tasks.where("userid").equals(userid).toArray()
  );

  const editHandler = (_id) => {
    if (edit === false) modalHandler();
    setEdit(true);
    setEditId(_id);
  };

  const updateHandler = (_id) => {
    taskList.forEach((task) => {
      if (task.taskid === _id) {
        db.tasks.update(task.taskid, { completed: !task.completed });
      }
    });
  };

  const deleteHandler = (_id) => {
    if (taskList !== undefined) {
      taskList.forEach((task) => {
        if (task.taskid === _id) {
          db.tasks.delete(task.taskid);
          changeModalState("deleteModal", false);
          props.notify("Task Deleted", "success");
        }
      });
    }
  };

  const handleConfirmDelete = (_id) => {
    changeModalState("deleteModal", true);
    setTaskId(_id);
  };

  const changeModalState = (action, value) => {
    setModalState({
      ...modalState,
      [action]: value,
    });
  };

  return props.load?(
    <>
      <Navbar sessionId={props.sessionId} />
      <Menu
        modalHandler={modalHandler}
        isLoggedInHandler={props.isLoggedInHandler}
        setSessionId={props.setSessionId}
        sessionId={props.sessionId}
      />
      <div className="home-container">
        <div className="task-bar-header">
          <h1>All Tasks</h1>
          <div className="today-taskbar">
            <h1>Today</h1>
            <h5>
              {convertDay(day)} {convertMonth(month)}
            </h5>
          </div>
          {showModal ? (
            <TaskModal
              modalHandler={modalHandler}
              userid={userid}
              notify={props.notify}
              edit={edit}
              setEdit={setEdit}
              editId={editId}
              taskList={taskList}
            />
          ) : null}
          <div>
            <TaskList
              list={taskList}
              updateHandler={updateHandler}
              handleConfirmDelete={handleConfirmDelete}
              editHandler={editHandler}
            />
          </div>
          <ConfirmationModal
            header="Warning"
            body="Are you sure you want to delete this task?"
            onConfirm={() => deleteHandler(taskId)}
            onHide={() => changeModalState("deleteModal", false)}
            isVisible={modalState.deleteModal}
          />
        </div>
      </div>
    </>
  ) : null
};

export default Home;
