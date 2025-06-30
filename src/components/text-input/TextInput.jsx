import React, { useState } from 'react';
import './TextInput.css';

const TextInput = ({
  label = "Input Label",
  placeholder = "Enter text here...",
  required = false,
  onChange,
  defaultValue = "",
  type = "text",
  name = "text-input",
  disabled = false,
  errorMessage = "This field is required"
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
    <div className={`text-input-container ${showError ? 'error' : ''}`}>
      <label className="text-input-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      
      <input
        className="text-input-field"
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
      
      {showError && (
        <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
};

export default TextInput;