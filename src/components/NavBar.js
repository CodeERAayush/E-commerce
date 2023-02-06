import React,{useState,useEffect} from "react";
import Dropdown from "./DropDown";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import './Nav.css'
import { signOut } from "firebase/auth";
function NavBar() {
  const navigate=useNavigate();
  const logout=async ()=>{
    localStorage.clear()
    await signOut(auth)
    window.location.reload();
  }
  const [userId, setUid]=useState(null);
    function GetUserUid(){
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return userId;
    }

    const uid = GetUserUid();
  const openCart=()=>{
if(uid!=null){
console.log('cart opened!')
navigate('/Cart')
}else{
alert('please login to your account first!')
navigate('/Login')
}
  }
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
         <p className="login-custom-btn"
         style={{marginRight:5}}>
      <button 
        onClick={openCart}
        className="navbar-link">
              <img
              src="../images/cart.png"
              height={20}
              width={20}
              />
            </button>
        </p>
        <Dropdown/>
        {
          localStorage.getItem('name')===null?
        <p className="login-custom-btn">
        <Link to='/Login' className="navbar-link">
              Login
            </Link>
        </p>
        :
        <p className="login-custom-btn">
        <button 
        onClick={logout}
        className="navbar-link">
              Logout!
            </button>
        </p>
}
      </div>
      </div>

    </nav>
  );
}

export default NavBar;
