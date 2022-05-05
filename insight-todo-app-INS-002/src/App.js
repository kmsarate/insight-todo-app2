import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

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

  // Effect
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
    sessionStorage.setItem("sessionId", JSON.stringify(sessionId));
  }, [isLoggedIn, sessionId]);

  return (
    <Router>
      <div className="App">
        <Navbar/>
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
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
