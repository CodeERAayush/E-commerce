import React,{useEffect, useState} from 'react'
import Form from '../components/form';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from '../firebase_config';
export const LoginPage=()=>{
    const navigate=useNavigate();
    const signup=false;
    return(
        <div className='login-screen'>
        <div className='login-form-holder'>
            <h2 className='title'>Login!</h2>
        <Form
        className='form-elem'
       submit='Login'
       signup={signup}
       />
       <Link to='/Signup' className='link'>
       <p className='footer-label'>Don't have an account? Signup!</p>
       </Link>
       <div>
    <button 
    onClick={signInWithGoogle}
    className='google-auth'>
       <img
       className="google-auth-btn"
       src='../images/google_logo.png'
       />
       </button>
    </div>
       </div>
        </div>
    )
}