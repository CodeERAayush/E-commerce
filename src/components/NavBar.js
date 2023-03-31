import React,{useState,useEffect} from "react";
import Dropdown from "./DropDown";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import './Nav.css'
import { signOut } from "firebase/auth";
function NavBar({userId}) {
  const navigate=useNavigate();






  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClass = isScrolled ? 'scrolled' : 'navbar';









  const logout=async ()=>{
    localStorage.clear()
    await signOut(auth)
    window.location.reload();
  }
  const [user, setUid]=useState(null);
    function GetUserUid(){
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return user;
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
      <nav className={navbarClass}>
      <div className="navbar-container">
        <div className="left-part">
        <Link to='/' className="navbar-logo">
          E-com
        </Link>
        {/* <iframe src="https://embed.lottiefiles.com/animation/112961"></iframe> */}
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
          <a target='_blank' href="https://codeeraayush-portfolio.netlify.app" className="navbar-link">
              About
            </a>
          </li>
          <li className="navbar-item">
          <a target='_blank' href="https://codeeraayush-portfolio.netlify.app" className="navbar-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="middle-part">
      <input 
          className="search-box"
          placeholder="Search Product"
         
        >
         </input>
         <img src="../images/search.svg" alt="search-icon" className="search-icon"/>
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
        <Dropdown userId={userId}
        logout={logout}
        />
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
