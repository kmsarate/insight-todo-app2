import React from "react";
import "../styles/confirmation.css";

const ConfirmationModal = (props) => {
    return props.isVisible ? 
    (
      <div className={props.isVisible ? "overlay" : "overlay d-none" }>
        <div className="popup-del">
        <h1>Warning !</h1>
        <p>Are you sure to delete this task?</p>
        <div className="add-dialog-buttons">
          <button className="btn-cancel" onClick={props.onHide}>Cancel</button>
          <button className="btn-delete" onClick={props.onConfirm}>Delete</button>
        </div>
      </div>
      </div>
    ) : null
}

export default ConfirmationModal;
