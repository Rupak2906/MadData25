import React, { useState, useRef, useEffect } from 'react';

export default function PlayerDropDown(props, selectedPlayers) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [selectedOption, setSelectedOption] = useState('Dropdown');

  // Handle the selection change
  const handleChange = (event) => {
    setIsOpen(!isOpen);
    setSelectedOption(event.target.text);
  };
  // console.log(props.onClick);
  <div onClick={props.onClick}>
  </div>

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div onClick = {props.onClick} style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      <button onClick={handleToggle}>{selectedOption}</button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '105%',
            left: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
          }}
        >

          {/* <a href="#option1" onClick = {handleChange} style={itemStyle}>{props["0"]}</a>
          <a href="#option2" onClick = {handleChange} style={itemStyle}>{props["5"]}</a>
          <a href="#option3" onClick = {handleChange} style={itemStyle}>{props["2"]}</a> */}
          {Object.keys(props).map((key, index) => (
          <a key={key} href={`#option${index + 1}`} onClick={handleChange} style={itemStyle}>
            {props[key]}
          </a>
          ))}
        </div>
      )}
    </div>
  );
}

const itemStyle = {
  padding: '12px 16px',
  display: 'block',
  textDecoration: 'none',
  color: '#333',
};
