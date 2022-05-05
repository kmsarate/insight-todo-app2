import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link, useNavigate } from "react-router-dom";
import md5 from "md5";

// Components
import Input from "../components/input";
import Button from "../components/button";
import ForgotPassword from "../components/ForgotPassword";

// db
import db from "../utils/db";

// Style
import "../styles/login.css";

const Login = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // checked if isLoggedIn is false then redirect to / page
    if (props.isLoggedIn === true && props.sessionId !== "") {
      navigate(`/${props.sessionId}`)
    }
  }, [navigate, props.isLoggedIn, props.sessionId]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usersList = useLiveQuery(() => db.users.toArray());
  const user = db.users.where("username").equalsIgnoreCase(username).toArray();

  const [forgotPopup, setForgotPopup] = useState(false);
  const popupHandler = () => {
    setForgotPopup(!forgotPopup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const _val = [];
    usersList.map((item) => {
      _val.push(item.username.toLowerCase());
    });

    if (_val.includes(username.toLowerCase())) {
      if (user._value[0].password === md5(password)) {
        navigate(`/${user._value[0].userid}`);
        props.isLoggedInHandler();
        props.setSessionId(user._value[0].userid)
      } else {
        alert("eeeeng!!");
      }
    } else {
      alert("username doesnt exist");
    }
  };

  return (
    <>
      <ForgotPassword popupHandler={popupHandler} forgotPopup={forgotPopup} />
      <div className="login-wrapper">
        <div className="left-col">
          <h1>
            Organize your Tasks<br></br>with To.Do
          </h1>
          <img
            className="illustration"
            src="assets/images/illustration.png"
            alt="Illustration"
          />
        </div>
        <img className="line" src="assets/images/Line.png" alt="Illustration" />
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input
            type="text"
            label="Username"
            placeholder="Enter username"
            handleChange={setUsername}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            handleChange={setPassword}
          />
          <Button type="submit" label="Login" className="button" />

          <p className="login-small-text">
            <Button
              label="Forgot Password"
              type="button"
              handleClick={popupHandler}
            />
            <nav>
              <Link to="/signup"> Signup </Link>
            </nav>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
