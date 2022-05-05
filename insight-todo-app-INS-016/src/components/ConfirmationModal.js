import React from "react";
import Button from "./button";
import "../styles/popup.css"

const ConfirmationModal = (props) => {
  return props.isVisible ? (
    <div className="overlay">
      <div className="add-dialog">
        <h3>{props.header}</h3>
        <p>{props.body}</p>
        <div className="add-dialog-buttons">
          <button className="cancel-btn" onClick={props.onHide}>Cancel</button>
          <button className="confirm-btn" onClick={props.onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmationModal;
