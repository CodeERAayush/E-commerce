import React,{useState} from "react";
import NavBar from "../components/NavBar";
import './HomePage.css'
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";

export const HomePage=()=>{
      
        return (
                <>
        <div className="screenHome">
        {/* <NavBar/> */}
        <div className="left-section">
                <h1 className="hero-title">It's Shopping &nbsp; Time!</h1>
                <h2 className="hero-title">Let's do some shopping for your loved ones!</h2>
                <button className="hero-button">Browse New</button>
        </div>
        </div>
        <div className="banner_fadeBottom"></div>
        </>
        );
}