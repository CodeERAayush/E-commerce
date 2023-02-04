// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import {getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect,createUserWithEmailAndPassword,signInWithEmailAndPassword}from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2A0kw0h7TyesHyzxrwPETCA6C1dQuo_I",
  authDomain: "e-com-45865.firebaseapp.com",
  projectId: "e-com-45865",
  storageBucket: "e-com-45865.appspot.com",
  messagingSenderId: "693539659792",
  appId: "1:693539659792:web:1cebb80fc273686a0cea95",
  measurementId: "G-WFPJNY6D4Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
export const auth=getAuth(app);
const provider=new GoogleAuthProvider();
// const storage=app.storage();
export const signInWithGoogle = () => {
  signInWithPopup(auth , provider).then((res) => {
    console.log(res.user)
    const name=res.user.displayName;
    const email=res.user.email;
    const isVer=res.user.emailVerified;

    localStorage.setItem("name",name);
    localStorage.setItem("email",email);
    localStorage.setItem("isVer",isVer);
  }).catch((error) => {
    console.log(error.message)
  })
}
export const createAccount=(email,password)=>
{
  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
export const loginAccount=(email,password)=>{
  signInWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
// export {auth,provider,storage};
// export default db;