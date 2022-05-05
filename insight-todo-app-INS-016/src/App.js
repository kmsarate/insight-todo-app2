import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Profile from "./pages/Profile";
import Upcoming from "./pages/Upcoming";

//Style
import "./App.css";

// db
import db from "./utils/db";

toast.configure();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    return loggedIn ? JSON.parse(loggedIn) : [];
  });
  const [sessionId, setSessionId] = useState(() => {
    const id = sessionStorage.getItem("sessionId");
    return id ? JSON.parse(id) : [];
  });
  const [load, setLoad] = useState(false);

  const notify = (_message, _state) => {
    if (_state === "error") toast.error(_message);
    else if (_state === "success") toast.success(_message);
  };

  const isLoggedInHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const taskList = useLiveQuery(() =>
    db.tasks.where("userid").equals(sessionId).toArray()
  );

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("taskname");

  const filterHandling = () => {
    let current = new Date();
    let yearNow = `${current.getFullYear()}`;
    let monthNow = `0${current.getMonth() + 1}`;
    let dayNow = `${current.getDate()}`;
    if (monthNow === "10" || monthNow === "11" || monthNow === "10")
      monthNow = `${current.getMonth() + 1}`;
    const dateNow = yearNow + "-" + monthNow + "-" + dayNow;
    let tasks = [];
    if (taskList) {
      taskList.forEach((todo) => {
        if (filter === "today") {
          tasks = taskList.filter(
            (todo) => dateNow >= todo.startDate && dateNow <= todo.endDate
          );
        } else {
          tasks = [...taskList];
        }
      });
    }
    tasks.sort(sortHandler(sortBy));
    return tasks;
  };

  const sortHandler = (sortBy) => (a,b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;

  // Effect
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
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
                notify={notify}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <Home
                sessionId={sessionId}
                setSessionId={setSessionId}
                isLoggedIn={isLoggedIn}
                isLoggedInHandler={isLoggedInHandler}
                notify={notify}
                load={load}
                setLoad={setLoad}
                taskList={filterHandling()}
                filterChangeHandler={setFilter}
                filter={filter}
                sortHandler={setSortBy}
                sortBy={sortBy}
              />
            }
          />
          <Route path="/signup" element={<Signup notify={notify} />} />
          <Route
            path="/upcoming/:id"
            element={
              <Upcoming
                sessionId={sessionId}
                setSessionId={setSessionId}
                isLoggedIn={isLoggedIn}
                isLoggedInHandler={isLoggedInHandler}
                notify={notify}
                load={load}
                setLoad={setLoad}
              />
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Profile
                sessionId={sessionId}
                setSessionId={setSessionId}
                isLoggedIn={isLoggedIn}
                isLoggedInHandler={isLoggedInHandler}
                notify={notify}
                load={load}
                setLoad={setLoad}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;