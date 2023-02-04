import React from "react";
import './itemCard.css'
export const ItemCard=()=>{
return(
    <div className="card-holder">
        <div className="upper-part">
            <img
            className="product-image"
            src="https://www.nativeclap.com/wp-content/uploads/2021/10/Bihar-se-hain-Front-Tshirt-Mockup-New-copy-2-scaled.jpg"
            />
        </div>
        <div className="lower-part">
            <p className="product-name">Product Name</p>
            <p className="product-price">$200</p>
            <p className="product-description">Koverify Oversized Tshirt for Men/Women/Black Oversized Tshirt/White Oversized Tshirt/Peach Oversized Tshirt/Pure Cotton Premium Tshirt</p>
            <div className="product-asses">
                <button className="product-asses-button">Add to Cart</button>
                <button className="product-asses-button">View Product</button>
            </div>

        </div>
    </div>
)
}