import React from "react";

const Dropdown = (props) => {

  function handleChange(event) {
    props.handleClick(event.target.value);
  }

  return (
    <select onChange={handleChange}>
      {props.items.map((item) => (
        <option key={item.id}>{item.value}</option>
      ))}
    </select>
  );
};

export default Dropdown;
