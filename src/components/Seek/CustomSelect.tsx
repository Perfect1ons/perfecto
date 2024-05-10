'use client'
import React, { useState } from "react";

interface CustomSelectProps {
  value: string;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`}>
      <div className="select-header" onClick={toggleOpen}>
        <span className="select-header_sort">Сортировка: </span>
        <span className={`select-header_sorted ${isOpen ? "open" : ""}`}>
          {options.find((option) => option.value === value)?.label ||
            "По умолчанию"}
          <p className={isOpen ? "open" : ""}>&#10095;</p>
        </span>
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option ${value === option.value ? "selected" : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="option__cyrcle"></span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;






