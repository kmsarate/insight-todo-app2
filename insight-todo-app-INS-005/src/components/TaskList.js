import React from "react";
import Button from "./button";

const TaskList = (props) => {
  return (
    <>
      {props.taskList?.map((task) => (
        <div key={task.taskid}>
          <div className= { task.completed ? "task-container done" : "task-container" } >
            <div className="task-col-left">
              <Button type="button" className="checker" handleClick={() => props.updateHandler(task.taskid)} />
              <div>
                <div className="task-title">
                  <h1>{task.taskname}</h1>
                </div>
                <div className="task-description">
                  <h1>{task.description}</h1>
                </div>
                <div className="task-time">
                  <p>{task.startDate} - {task.endDate}</p>
                </div>
              </div>
            </div>
            <div className="task-col-right">
              <Button type="button" className="delete-task" label="remove" handleClick={() => props.deleteHandler(task.taskid)} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskList;
