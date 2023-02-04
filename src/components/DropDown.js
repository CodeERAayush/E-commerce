import React, { useState } from "react";
import './Drop.css'
function Dropdown() {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button 
      onClick={toggleDropdown} className="dropdown-button">
        <img
        style={{
            width:25,
            height:25,
            marginRight:10
        }}
        src={'../images/userprofile.png'}
        />
        Dropdown
      </button>
      {isOpen && (
        <ul className="dropdown-content">
          <li className="dropdown-item">
            <a href="#" className="dropdown-link">
              Option 1
            </a>
          </li>
          <li className="dropdown-item">
            <a href="#" className="dropdown-link">
              Option 2
            </a>
          </li>
          <li className="dropdown-item">
            <a href="#" className="dropdown-link">
              Option 3
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
