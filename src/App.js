import logo from './logo.svg';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import NavBar from './components/NavBar';
import { AfterLog } from './pages/AfterLog';
import { AddProducts } from './pages/AddProducts';
import { Cart } from './pages/Cart';
import Profile from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { ViewProduct } from './pages/ViewProduct';
import React,{useEffect,useState} from 'react';
import BottomArea from './components/bottomArea';
import { auth } from './firebase_config';

function App() {
  const [userId, setUid]=useState(null);
      useEffect(()=>{
          auth.onAuthStateChanged(user=>{
              if(user){
                  setUid(user.uid);
              }
          })
      },[])
  return (
    <div className="App">
      <Router>
        <NavBar userId={userId}/>
<Routes>
  <Route path='/' element={<AfterLog/>}/>
  <Route path='/Login' element={<LoginPage/>}/>
  <Route path='/Signup' element={<SignupPage/>}/>
  <Route path='/AddProd' element={<AddProducts/>}/>
  <Route path='/Cart' element={<Cart/>}/>
  <Route path='/Profile' element={<Profile/>}/>
  <Route path='/Profile/Edit' element={<EditProfile/>}/>
  <Route path='/viewproduct' element={<ViewProduct/>}/>
</Routes>

     </Router>
     <BottomArea/>
    </div>
  );
}

export default App;
