import React, { useState } from 'react';
import './ToggleSelect.css';

const ToggleSelect = ({
  options,
  label = "Select an option",
  required = false,
  onChange,
  defaultValue = null,
  name = "toggle-select",
  type = "radio" // 'radio' or 'button'
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsTouched(true);
    if (onChange) {
      onChange(value);
    }
  };

  const showError = required && isTouched && !selectedValue;

  return (
    <div className={`toggle-select-container ${showError ? 'error' : ''}`}>
      <div className="toggle-select-header">
        <label className="toggle-select-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
        {showError && (
          <span className="error-message">This selection is required</span>
        )}
      </div>
      
      {type === "radio" ? (
        <div className="toggle-button-group" role="radiogroup">
          {options.map((option) => (
            <div className="radio-option" key={option.value}>
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleSelect(option.value)}
                className="radio-input"
              />
              <label 
                htmlFor={`${name}-${option.value}`}
                className={`radio-label ${selectedValue === option.value ? 'active' : ''}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="button-toggle-group">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`button-toggle ${selectedValue === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToggleSelect;