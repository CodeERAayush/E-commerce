import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Drop.css'
function Dropdown() {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleDropdown} className="drop-custom-btn">
        <img
        src="./images/userprofile.png"
        style={{height:24,width:24,marginRight:10}}
        />
       {localStorage.getItem('name')&&localStorage.getItem('name').substring(0,localStorage.getItem('name').indexOf(' '))}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to='/Profile'>Profile</Link>
          </li>
          <li>
          <Link to='/Cart'>Cart</Link>
          </li>
          <div className="line"></div>
          <li>
            <a href="#logout">Logout &#8677;</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
