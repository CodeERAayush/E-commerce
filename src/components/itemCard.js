import React from "react";
import './itemCard.css'
export const ItemCard=({elem,addToCart})=>{
    const handle_add=()=>{
        addToCart(elem);
    }
return(
    <div className="card-holder">
        <div className="upper-part">
            <img
            className="product-image"
            src={elem.url}
            />
        </div>
        <div className="lower-part">
            <p className="product-name">{elem.title}</p>
            <p className="product-price">$ {elem.price}</p>
            <p className="product-description">{elem.description}</p>
            <div className="product-asses">
                <button 
                onClick={handle_add}
                className="product-asses-button">Add to Cart</button>
                <button className="product-asses-button">View Product</button>
            </div>

        </div>
    </div>
)
}