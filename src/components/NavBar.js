import React from "react";
import Dropdown from "./DropDown";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../firebase_config";
import './Nav.css'
function NavBar() {
  return (
      <nav className="navbar">
      <div className="navbar-container">
        <div className="left-part">
        <Link to='/' className="navbar-logo">
          E-com
        </Link>
        <div className="navbar-menu-icon">
          <i className="fa fa-bars fa-2x" />
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
          <Link to='/' className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
          <Link to='/Login' className="navbar-link">
              About
            </Link>
          </li>
          <li className="navbar-item">
          <Link to='/Signup' className="navbar-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="right-part">
        <Dropdown/>
        <p className="login-custom-btn">
        <Link to='/Login' className="navbar-link">
              Login
            </Link>
        </p>
      </div>
      </div>

    </nav>
  );
}

export default NavBar;
