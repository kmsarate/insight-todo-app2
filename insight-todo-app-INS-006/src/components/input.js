import { useState } from "react";
import "../styles/signup.css";

const Input = (props) => {
  const { label, type, placeholder, errorMessage, handleChange, pattern } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        onBlur={handleFocus}
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        pattern={pattern}
        focused={focused.toString()}
      />
      <span className="err">{errorMessage}</span>
    </div>
  );
};

export default Input;
