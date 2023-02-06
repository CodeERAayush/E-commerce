import React from "react";
import './priceCard.css'
export const PriceCard=()=>{
    return (
        <>
        <div className="price-card">
            <div className="tag-holder"><p className="price-tag">Price Details</p></div>
            <div className="line"></div>
            <div className="tag-holder"><p className="price"><span style={{fontWeight:600}}>Price (3 items) : </span> <span>1200</span></p></div>
            <div className="tag-holder"><p className="price"><span style={{fontWeight:600}}>Discount (-10%) : </span> <span>-120</span></p></div>
            <div className="tag-holder"><p className="price"><span style={{fontWeight:600}}>Delivery Charge : </span> <span style={{color:"green"}}>Free</span></p></div>
            <div className="line"></div>
            <div className="tag-holder"><p className="total-price"><span style={{fontWeight:600}}>Total : </span> <span style={{fontWeight:600}}>1080 /-</span></p></div>
        </div>
        </>
    )
}