// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import { Navigate, useNavigate } from "react-router-dom";
import { collection, getDoc, addDoc, updateDoc, doc, deleteDoc,setDoc } from 'firebase/firestore'
// import {useHistory} from 'react-router-dom'
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
const userCollectionRef = collection(db, "users");
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
    window.location.reload();
  }).catch((error) => {
    console.log(error.message)
  })
}
export const createAccount=(email,password,fullName)=>
{
  createUserWithEmailAndPassword(auth,email,password)
  .then(async(userCredential) => {

    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name: fullName,
      email: email,
      password: password,
      profile:"",
      address:""
    });
    console.log(user.uid);
    loginAccount(email,password);

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

  });
}
export const loginAccount=(email,password)=>{
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
// export {auth,provider,storage};
// export default db;