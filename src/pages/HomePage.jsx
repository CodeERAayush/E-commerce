import React,{useState} from "react";
import { ItemCard } from "../components/itemCard";
import NavBar from "../components/NavBar";
import './HomePage.css'
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";

export const HomePage=()=>{
        const [isHovering, setIsHovering] = useState(false);

        const handleMouseOver = () => {
          setIsHovering(true);
        };
      
        const handleMouseOut = () => {
          setIsHovering(false);
        };
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
        <div className="show-products">
                <div className="category-heading-holder">
                    <p className="category-heading"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}>Category Name</p>
                    {isHovering&&<p className="category-subhead">Explore More</p>}
                </div>
                <div className="items-in-row">
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                </div>
            </div>
        </>
        );
}