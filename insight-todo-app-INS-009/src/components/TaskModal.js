import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
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
  const task = useLiveQuery(() =>
    db.tasks.where("taskid").equals(props.editId).toArray()
  );

  useEffect(() => {
    if (props.edit === true) {
      if (task) {
        setTaskName(task[0].taskname);
        setDescription(task[0].description);
        setStartDate(task[0].startDate);
        setEndDate(task[0].endDate);
      }
    }
  }, [task]);

  const success = () => {
    setTaskName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    modalHandler();
  };

  const cancel = () => {
    modalHandler();
    props.setEdit(false);
  };

  const addTask = (e) => {
    e.preventDefault();
    let newTask = {
      taskname: taskName,
      description: description,
      startDate: startDate,
      endDate: endDate,
      completed: false,
      userid: props.userid,
    };
    if (taskName !== "" && startDate !== "" && endDate !== "") {
      if (endDate < startDate) {
        props.notify(
          "End date must be greater than or equal to start date",
          "error"
        );
      } else {
        props.notify("Task Saved", "success");
        db.tasks.add(newTask);
        success();
      }
    } else {
      props.notify("Please enter all fields, description (optional)", "error");
    }
  };

  const editTask = (e) => {
    e.preventDefault();
    if (taskName !== "" && startDate !== "" && endDate !== "") {
      if (endDate < startDate) {
        props.notify(
          "End date must be greater than or equal to start date",
          "error"
        );
      } else {
        props.notify("Task Saved", "success");
        db.tasks.update(task[0].taskid, {
          taskname: taskName,
          description: description,
          startDate: startDate,
          endDate: endDate,
        });
        success();
        props.setEdit(false)
      }
    } else {
      props.notify("Please enter all fields, description (optional)", "error");
    }
  };

  return (
    <>
      <form className="add-task-form">
        <div className="input-container">
          <div className="input-task-title">
            <Input
              type="text"
              value={taskName}
              placeholder="Enter task title"
              handleChange={setTaskName}
            />
          </div>
          <Input
            type="text"
            value={description}
            placeholder="Enter task description (optional)"
            handleChange={setDescription}
          />
        </div>
        <div className="date-container">
          <div className="input-date">
            <div className="text-date">
              <h1>Start Date</h1>
              <Input
                type="date"
                value={startDate}
                handleChange={setStartDate}
              />
            </div>
            <div className="text-date">
              <h1>End Date</h1>
              <Input type="date" value={endDate} handleChange={setEndDate} />
            </div>
          </div>
        </div>
        <div className="btn-col-2">
          {props.edit ? (
            <Button
              label="Update Task"
              type="submit"
              className="button"
              handleClick={editTask}
            />
          ) : (
            <Button
              label="Add Task"
              type="submit"
              className="button"
              handleClick={addTask}
            />
          )}
          <Button
            label="cancel"
            type="button"
            className="button cancel"
            handleClick={cancel}
          />
        </div>
      </form>
    </>
  );
};

export default TaskModal;
