import React, { useState } from "react";
import "../styles/components.css";
import Input from "./input";
import Button from "./button";
import db from "../utils/db";

const TaskModal = (props) => {
  const { modalHandler } = props;
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    let newTask = {
      taskname: taskName,
      description: description,
      startDate: startDate,
      endDate: endDate,
      completed: false,
      userid: props.id,
    };

    if (
      taskName !== "" &&
      startDate !== "" &&
      endDate !== ""
    ) {
      if (endDate < startDate) {
        props.notify("End date must be greater than or equal to start date", "error");
      } else {
        props.notify("Task Saved", "success");
        db.tasks.add(newTask);
        modalHandler();
      }
    } else {
      props.notify("Please enter all fields, description (optional)", "error");
    }
  };

  return (
    <>
      <form className="add-task-form" onSubmit={addTask}>
        <div className="input-container">
          <div className="input-task-title">
            <Input
              type="text"
              placeholder="Enter task title"
              handleChange={setTaskName}
            />
          </div>
          <Input
            type="text"
            placeholder="Enter task description (optional)"
            handleChange={setDescription}
          />
        </div>
        <div className="date-container">
          <div className="input-date">
            <div className="text-date">
              <h1>Start Date</h1>
              <Input type="date" handleChange={setStartDate} />
            </div>
            <div className="text-date">
              <h1>End Date</h1>
              <Input type="date" handleChange={setEndDate} />
            </div>
          </div>
        </div>
        <div className="btn-col-2">
          <Button label="Add Task" type="submit" className="button" />
          <Button
            label="cancel"
            type="button"
            className="button cancel"
            handleClick={modalHandler}
          />
        </div>
      </form>
    </>
  );
};

export default TaskModal;
