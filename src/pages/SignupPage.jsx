import React,{useState} from 'react'
import Form from '../components/form';
import { Link } from 'react-router-dom';
import './loginSignup.css'
import { signInWithGoogle } from "../firebase_config";
export const SignupPage=()=>{
    const signup=true;





    return(
        <div className='screen'>
        <div className='form-holder'>
        <h2 className='title'>SignUp!</h2>
        <Form
        className='form-elem'
       submit='Signup'
       signup={signup}
       />
        <Link to='/Login' className='link'>
       <p className='footer-label'>Already have an account? Login!</p>
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