import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import * as md5 from "md5";

// Components
import ConfirmationModal from "../components/ConfirmationModal";
import Input from "../components/input";
import Button from "../components/button";
import Menu from "../components/Menu";
import Navbar from "../components/navbar";
import { FiEdit3, FiCamera } from "react-icons/fi";
import CoverNone from "../def/cover.svg";
import UserNone from "../def/User.svg";

// db
import db from "../utils/db";

// Style
import "../styles/Home.css";
import "../styles/profile.css";

const Profile = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);
  const modalHandler = () => {
    setShowModal(!showModal);
  };
  const user = useLiveQuery(() =>
    db.users.where("userid").equals(props.sessionId).toArray()
  );

  const getFile = (e, set) => {
    let reader = new FileReader();
    reader.readAsDataURL(e[0]);
    reader.onload = (e) => {
      set(reader.result);
    };
  };

  const updateProfile = (e) => {
    e.preventDefault();
    console.log(image);
    db.users.update(user[0].userid, {
      cover: cover,
      img: image,
      name: name,
      username: username,
    });
    props.notify("Changes saved", "success");
  };

  const [pModal, setpModal] = useState(false);
  const PasswordModal = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateNewPassword = (e) => {
      e.preventDefault();
      if (
        currentPassword !== "" &&
        newPassword !== "" &&
        confirmPassword !== ""
      ) {
        console.log("hello");
        if (user[0].password === md5(currentPassword)) {
          db.users.update(user[0].userid, { password: md5(newPassword) });
          props.notify("Save new password", "success");
        } else {
          props.notify("Incorrect current password", "error");
        }
      } else {
        props.notify("empty fields", "error");
      }
    };

    return (
      <>
        <div className="overlay">
          <form className="password-container" onSubmit={updateNewPassword}>
            <h2> Change Password </h2>
            <Input
              type="password"
              label="Current Password"
              placeholder="enter current password"
              errorMessage="Password should be 12-20 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character"
              handleChange={setCurrentPassword}
            />
            <Input
              type="password"
              label="New Password"
              placeholder="enter new password"
              errorMessage="Password should be 12-20 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character"
              handleChange={setNewPassword}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$"
            />
            <Input
              type="password"
              label="Confirm New Password"
              placeholder="confirm password"
              errorMessage="Password doesnt match"
              handleChange={setConfirmPassword}
              pattern={newPassword}
            />
            <div className="float-r">
              <Button
                type="button"
                label="cancel"
                className="cancel-btn"
                handleClick={() => setpModal(!pModal)}
              />
              <Button
                type="submit"
                label="Save Password"
                className="confirm-btn"
              />
            </div>
          </form>
        </div>
      </>
    );
  };

  const [modalState, setModalState] = useState(false);
  const deleteAccount = (_id) => {
    db.users.delete(_id);
    props.isLoggedInHandler();
    props.setSessionId("");
    navigate("/");
  };

  useEffect(() => {
    if (props.isLoggedIn === false && props.sessionId === "") {
      navigate("/");
    }
    if (user) {
      setCover(user[0].cover);
      setImage(user[0].img);
      setName(user[0].name);
      setUsername(user[0].username);
      setPassword(md5(user[0].password));
    }
  }, [user, navigate, props.isLoggedIn, props.sessionId]);
  return (
    <>
      <Navbar sessionId={props.sessionId} />
      <Menu
        modalHandler={modalHandler}
        isLoggedInHandler={props.isLoggedInHandler}
        setSessionId={props.setSessionId}
        sessionId={props.sessionId}
      />
      <div className="home-container">
        <div className="profile">
          <div
            className="cover-photo"
            style={
              cover === "none"
                ? { backgroundImage: `url(${CoverNone})` }
                : { backgroundImage: "url(" + cover + ")" }
            }
          >
            <div className="input-container">
              <div className="upload-icon">
                {" "}
                <FiEdit3 className="icon" />{" "}
              </div>
              <input
                type="file"
                onChange={(e) => getFile(e.target.files, setCover)}
              />
            </div>
          </div>
          <div className="user-details">
            <div className="image-name">
              <div className="img-container">
                <div
                  className="user-img"
                  style={
                    cover === "none"
                      ? { backgroundImage: `url(${UserNone})` }
                      : { backgroundImage: "url(" + image + ")" }
                  }
                >
                  <div className="input-container">
                    <div className="upload-icon">
                      {" "}
                      <FiCamera className="icon" />{" "}
                    </div>
                    <input
                      type="file"
                      onChange={(e) => getFile(e.target.files, setImage)}
                    />
                  </div>
                </div>
              </div>
              <h1> {name} </h1>
            </div>
            <form onSubmit={updateProfile}>
              <Input
                type="text"
                label="Name"
                placeholder="Enter Name"
                errorMessage="Name should have a minimum of 5 characters"
                handleChange={setName}
                value={name}
                pattern="^[a-zA-Z\s]{5,150}$"
              />
              <Input
                type="text"
                label="Username"
                placeholder="Enter username"
                errorMessage="Username should be 6-32 characters and shouldn't include any special character!"
                handleChange={setUsername}
                value={username}
                pattern="^[A-Za-z0-9]{6,32}$"
              />
              <div className="password">
                <p> Password </p>
                <Button
                  type="button"
                  label="Change password"
                  className="button"
                  handleClick={() => setpModal(!pModal)}
                />
              </div>
              <Button type="submit" label="Save Changes" className="button" />
              <Button
                type="button"
                label="Delete Account"
                className="delete-btn button"
                handleClick={() => setModalState(!modalState)}
              />
            </form>
            {pModal ? <PasswordModal /> : null}
            <ConfirmationModal
              header="Delete Account"
              body="Are you sure you want to delete this account?"
              onConfirm={() => deleteAccount(user[0].userid)}
              onHide={() => setModalState(!modalState)}
              isVisible={modalState}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
