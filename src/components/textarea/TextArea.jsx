import React, { useState } from 'react';
import './TextArea.css';

const TextArea = ({
  label = "Your feedback",
  placeholder = "Enter your comments here...",
  required = false,
  onChange,
  defaultValue = "",
  rows = 4,
  maxLength = 500,
  name = "textarea-input"
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const showError = required && isTouched && !value.trim();

  return (
    <div className={`textarea-container ${showError ? 'error' : ''}`}>
      <label className="textarea-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      
      <textarea
        className="textarea-input"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
      />
      
      {showError && (
        <span className="error-message">This field is required</span>
      )}
      
      {maxLength && (
        <div className="character-count">
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
};

export default TextArea;