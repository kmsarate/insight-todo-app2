import React, { useState, useEffect } from "react";
import Button from "./button";
import "../styles/Home.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = (props) => {
  const [taskList, setTaskList] = useState(props.list);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    setTaskList(
      reorder(taskList, result.source.index, result.destination.index)
    );
  };

  useEffect(() => {
    setTaskList(props.list);
  }, [props.list]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  return (
    <>
      {props.filter === "filter" ? (
        <>
          <Button
            type="button"
            className={
              props.filterState === true ? "tag-button tag-active" : "tag-button"
            }
            label="Completed"
            handleClick={() => props.setFilterState(true)}
          />
          <Button
            type="button"
            className={
              props.filterState === false ? "tag-button tag-active" : "tag-button"
            }
            label="In progress"
            handleClick={() => props.setFilterState(false)}
          />
        </>
      ) : null}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList?.map((task, index) => (
                <Draggable
                  key={task.taskid}
                  draggableId={task.taskid.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={
                        task.completed
                          ? "task-container done"
                          : "task-container"
                      }
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging
                          ? "0 0 .5rem #888"
                          : "none",
                        background: snapshot.isDragging
                          ? "#A6B2BD"
                          : "#31313115",
                      }}
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
                            <p>Start Date: {task.startDate}</p>
                            <p>End Date: {task.endDate}</p>
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
                          handleClick={() =>
                            props.handleConfirmDelete(task.taskid)
                          }
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TaskList;
