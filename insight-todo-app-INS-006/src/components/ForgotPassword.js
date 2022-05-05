import React, { useState } from "react";
import Input from "./input";
import Button from "./button";
import { useLiveQuery } from "dexie-react-hooks";
import * as md5 from "md5";
import db from "../utils/db";
import "../styles/popup.css";

const ForgotPassword = (props) => {
  const [username, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(
    "In what city were you born?"
  );
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);

  const ShowErrMsg = () => {
    return <p className="yellow-text"> {errMsg} </p>;
  };

  const usersList = useLiveQuery(() => db.users.toArray());
  const user = db.users.where("username").equalsIgnoreCase(username).toArray();

  const submitForgotPassword = (e) => {
    e.preventDefault();
    // list of usernames
    const _val = [];
    usersList.map((item) => {
      _val.push(item.username.toLowerCase());
    });

    // validate if all fields are empty
    if (
      username !== "" &&
      securityAnswer !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      // verify if username exists
      if (_val.includes(username.toLowerCase())) {
        // validate if security question and answer is correct
        if (
          securityQuestion === user._value[0].securityQuestion &&
          securityAnswer === user._value[0].securityAnswer
        ) {
          // update password
          db.users.update(user._value[0].id, { password: md5(password) });
        } else {
          setErrMsg("Incorrect Security question and answer. who r u?!");
          setShow(true);
        }
      } else {
        setErrMsg("Username doesnt exists");
        setShow(true);
      }
    } else {
      setErrMsg("EMPTY FIELDSS!!!");
      setShow(true);
    }
  };

  return (
    <>
      <div className={props.forgotPopup ? "overlay" : "overlay d-none" }>
        <div className="forgot-container">
          <h2> Forgot Password </h2>
          {show ? <ShowErrMsg /> : null}
          <form onSubmit={submitForgotPassword}>
            <Input
              type="text"
              label="Username"
              placeholder="enter username"
              handleChange={setUsername}
            />
            <div className="input-container">
              <label> Security Question </label>
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
              handleChange={setSecurityAnswer}
            />
            <Input
              type="password"
              label="Password"
              placeholder="enter password"
              errorMessage="Password should be 12-20 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character"
              handleChange={setPassword}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$"
            />
            <Input
              type="password"
              label="Confirm Password"
              placeholder="enter password"
              errorMessage="Password doesnt match"
              handleChange={setConfirmPassword}
              pattern={password}
            />
            <Button type="submit" label="Reset password" className="button" />
            <Button type="button" label="cancel" className="cancel-btn" handleClick={props.popupHandler} />
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
