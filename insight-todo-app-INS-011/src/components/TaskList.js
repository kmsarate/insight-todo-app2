import React, { useState } from "react";
import Button from "./button";
import "../styles/Home.css";

const TaskList = (props) => {
  const [filterState, setFilterState] = useState(true);

  const filter = () => {
    let tasks = [];
    if (props.filter === "filter") {
      if (props.list) {
        props.list.forEach((todo) => {
          if (filterState === false) {
            tasks = props.list.filter((todo) => !todo.completed);
          } else if (filterState === true) {
            tasks = props.list.filter((todo) => todo.completed);
          }
        });
      }
    } else {
      tasks = [...props.list];
    }
    return tasks;
  };

  return (
    <>
      {props.filter === "filter" ? (
        <>
          <Button
            type="button"
            className={
              filterState === true ? "tag-button tag-active" : "tag-button"
            }
            label="Completed"
            handleClick={() => setFilterState(true)}
          />
          <Button
            type="button"
            className={
              filterState === false ? "tag-button tag-active" : "tag-button"
            }
            label="In progress"
            handleClick={() => setFilterState(false)}
          />
        </>
      ) : null}

      {filter()?.map((task) => (
        <div key={task.taskid}>
          <div
            className={
              task.completed ? "task-container done" : "task-container"
            }
          >
            <div className="task-col-left">
              <div className="task-checker">
                <Button
                  type="button"
                  className="checker"
                  handleClick={() => props.updateHandler(task.taskid)}
                />
              </div>
              <div className="task-details">
                <div className="task-title">
                  <h1>{task.taskname}</h1>
                </div>
                <div className="task-description">
                  <h1>{task.description}</h1>
                </div>
                <div className="task-time">
                  <p>
                    {task.startDate} - {task.endDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="task-col-right">
              <Button
                type="button"
                className="delete-task black-text"
                label="Edit"
                handleClick={() => props.editHandler(task.taskid)}
              />
              <Button
                type="button"
                className="delete-task"
                label="Delete"
                handleClick={() => props.handleConfirmDelete(task.taskid)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskList;
