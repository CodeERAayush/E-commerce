import React ,{useState}from "react";
import './form.css'
import { signInWithGoogle } from "../firebase_config";
import {getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect,createUserWithEmailAndPassword,signInWithEmailAndPassword}from "firebase/auth";
import { auth ,db} from "../firebase_config";

import { collection, getDoc, addDoc, updateDoc, doc, deleteDoc,setDoc } from 'firebase/firestore'
import { createAccount } from "../firebase_config";
import { useNavigate } from "react-router-dom";
function Form(props) {

const Navigate=useNavigate();

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
        createAccount(formData.email,formData.password,formData.name);
        else{
          alert('Please Enter Correct Values!')
        }
      }
const onLogin=(e)=>{
  e.preventDefault();
  console.log('called Login Function!')
  loginAccount(formData.email,formData.password);
}




const loginAccount=(email,password)=>{
  signInWithEmailAndPassword(auth,email,password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
const docSnap = await getDoc(doc(db, "users", user.uid));
if (docSnap.exists()) {
  const {email,name,profile}=docSnap.data();
  console.log("Document data:", name);



  //save data to local storage!
  
  localStorage.setItem("name",name);
  localStorage.setItem("email",email);
  localStorage.setItem("profile",profile);
  Navigate('/')
  window.location.reload();
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
    console.log(user.uid);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
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