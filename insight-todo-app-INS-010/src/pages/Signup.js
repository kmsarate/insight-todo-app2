import React, { useState } from "react";
import Input from "../components/input";
import Button from "../components/button";
import db from "../utils/db";
import { useLiveQuery } from "dexie-react-hooks";
import * as md5 from "md5";
import { useNavigate, NavLink } from "react-router-dom";

import "../styles/signup.css";

const Signup = ({}) => {
  const navigate = useNavigate();
  // States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(
    "In what city were you born?"
  );
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const usersList = useLiveQuery(() => db.users.toArray());

  const handleSubmit = (e) => {
    e.preventDefault();

    const _val = [];
    usersList.map((item) => {
      _val.push(item.username.toLowerCase());
    });
    if (_val.includes(username.toLowerCase())) {
      setShowResult(true);
    } else if (
      name !== "" &&
      username !== "" &&
      password !== "" &&
      securityAnswer !== ""
    ) {
      let user = {
        name: name,
        username: username,
        password: md5(password),
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
      };
      db.users.add(user);
      navigate("/");
    }
  };

  const ErrUsername = () => {
    return <p className="signup-yellow-text">Username Already Taken</p>;
  };

  return (
    <>
      <div className="container">
        <div className="col2 signup-container">
          <div className="signup-text">
            <span>To Do app</span>
            <h1>Manage and Prioritize your tasks easier.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <h2>Sign up</h2>
            {showResult ? <ErrUsername /> : null}
            <Input
              type="text"
              label="Name"
              placeholder="Enter Name"
              errorMessage="Name should have a minimum of 5 characters"
              handleChange={setName}
              pattern="^[a-zA-Z\s]{5,150}$"
            />
            <Input
              type="text"
              label="Username"
              placeholder="Enter username"
              errorMessage="Username should be 6-32 characters and shouldn't include any special character!"
              handleChange={setUsername}
              pattern="^[A-Za-z0-9]{6,32}$"
            />
            <Input
              type="password"
              label="Password"
              placeholder="enter password"
              errorMessage="Password should be 12-20 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character"
              handleChange={setPassword}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$"
            />
            <div className="input-container">
              <label> Question </label>
              <select
                onChange={(e) => {
                  const selectedQuestion = e.target.value;
                  setSecurityQuestion(selectedQuestion);
                }}
              >
                <option value="In what city were you born?">
                  In what city were you born?
                </option>
                <option value="What is the name of your favorite pet?">
                  What is the name of your favorite pet?
                </option>
                <option value="What is your mother's maiden name?">
                  What is your mother's maiden name?
                </option>
                <option value="What was your favorite food as a child?">
                  What was your favorite food as a child?
                </option>
                <option value="IWhat is the name of your first school?">
                  What is the name of your first school?
                </option>
              </select>
            </div>
            <Input
              type="text"
              label="Answer"
              placeholder="enter answer"
              errorMessage="Answer should have atleast 2 characters"
              handleChange={setSecurityAnswer}
              pattern="^[a-zA-Z\s]{2,150}$"
            />
            <Button type="submit" label="Sign up" className="button" />

            <p className="signup-small-text">
              Already signed up? Go to{" "}
              <NavLink to="/" className="flat-link">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
