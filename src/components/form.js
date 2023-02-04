import React ,{useState}from "react";
import './form.css'
import { loginAccount, signInWithGoogle } from "../firebase_config";

import { createAccount } from "../firebase_config";
function Form(props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      const onSignUp=(e)=>{
        e.preventDefault();
        console.log('called Signup Function!')
        if(formData.confirmPassword===formData.password&&formData.name!=="")
        createAccount(formData.email,formData.password);
        else{
          alert('Please Enter Correct Values!')
        }
      }
const onLogin=(e)=>{
  e.preventDefault();
  console.log('called Login Function!')
  loginAccount(formData.email,formData.password);
}
  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  return(
    <div style={{marginTop:20}}>
    <form onSubmit={props.signup?onSignUp:onLogin}>
     { props.signup && <div className="place-entity">
        {/* <label htmlFor="name">Name</label> */}
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
            placeholder="Name"
        />
      </div>
      }
      <div className="place-entity">
        {/* <label htmlFor="email">Email</label> */}
        <input
        className="input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className="place-entity">
        {/* <label htmlFor="password">Password</label> */}
        <input
        className="input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      {props.signup&&<div className="place-entity">
        {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
        <input
        className="input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
      </div>}
      <button 
      className="submit-button"
      type="submit"
      onClick={props.signup?onSignUp:onLogin}>{props.submit}</button>
    </form>
   
    </div>
  )
}
export default Form;