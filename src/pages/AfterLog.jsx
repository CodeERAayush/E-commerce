import React,{useState} from "react";
import { ItemCard } from "../components/itemCard";
import NavBar from "../components/NavBar";
import './HomePage.css'
export const AfterLog=()=>{
    return(
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
        <div className="items-in-row">
                <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        </div>
        </>
    )
}