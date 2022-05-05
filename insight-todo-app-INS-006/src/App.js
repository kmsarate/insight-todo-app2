import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/login";

// db
import db from "./utils/db";

//Style
import "./App.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    return loggedIn ? JSON.parse(loggedIn) : [];
  });
  const [sessionId, setSessionId] = useState(() => {
    const id = sessionStorage.getItem("sessionId");
    return id ? JSON.parse(id) : [];
  });

  const isLoggedInHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const taskList = useLiveQuery(() => db.tasks.toArray());
  const [filter, setFilter] = useState("today");

  const filterHandler = () => {
    let tasks = [];

    return tasks;
  };

  // Effect
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
    sessionStorage.setItem("sessionId", JSON.stringify(sessionId));
  }, [isLoggedIn, sessionId]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                isLoggedInHandler={isLoggedInHandler}
                isLoggedIn={isLoggedIn}
                setSessionId={setSessionId}
                sessionId={sessionId}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <Home
                modalHandler={modalHandler}
                showModal={showModal}
                sessionId={sessionId}
                setSessionId={setSessionId}
                isLoggedIn={isLoggedIn}
                isLoggedInHandler={isLoggedInHandler}
                taskList={taskList}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
