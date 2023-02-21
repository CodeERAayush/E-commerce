import React, { useState, useEffect } from "react";
import { auth } from "../firebase_config";
import { Link } from "react-router-dom";
import "./Drop.css";

function Dropdown({ userId,logout }) {
  const [isOpen, setOpen] = useState(false);

  const loginOrLogout = userId === null ? "Login" : "Logout";
  const LoginOrLogout=userId === null ? "/Login" : false;
  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={toggleDropdown}className="drop-custom-btn">
        <img src="./images/userprofile.png" style={{ height: 24, width: 24, marginRight: 10 }} />
        {localStorage.getItem("name") && localStorage.getItem("name").substring(0, localStorage.getItem("name").indexOf(" "))}
      </button>
      {isOpen && (
        <ul onMouseLeave={closeDropdown} className="dropdown-menu" onMouseLeave={closeDropdown}>
         { !LoginOrLogout&& 
         <li>
            <Link to="/Profile">Profile</Link>
          </li>
}
{ !LoginOrLogout&&
          <li>
            <Link to="/Cart">Cart</Link>
          </li>
         }
          <div className="line"></div>
          <li>
            { LoginOrLogout&&
              <Link to={LoginOrLogout}>
              {loginOrLogout} &#8677;
            </Link>
            }
            {
              !LoginOrLogout &&
            <button 
            onClick={()=>logout()}
            style={{backgroundColor:'aliceblue',border:'none',cursor:'pointer'}}>
              Logout!
            </button>
}
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
