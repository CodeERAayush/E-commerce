import React from "react";
import './ItemInCart.css'
export const ItemInCard=({elem,cartProductIncrease,removeItem,cartProductDecrease})=>{
    console.log(elem)
    const [orders,setOrders]=React.useState([]);
    // React.useEffect(()=>{
    //     setOrders(...orders,[elem]);
    // },[elem])
    return(
        <>
        <div className="card">
            <div className="upper-part">
                <div className="cart-left-section">
                <img
// src="https://static.vecteezy.com/system/resources/previews/002/238/646/original/isolated-of-shopping-cart-icon-basket-symbol-eps10-free-vector.jpg"
src={elem.Product.url}
// src="https://firebasestorage.googleapis.com/v0/b/e-com-45865.appspot.com/o/product-images%2Faayush.jpg?alt=media&token=1cd0e7f8-d31e-46e0-bcc9-c7219c8f409f"
className="cart-image"
                />
            </div>
            <div className="cart-right-section">
                <p className="cart-product-name">{elem.Product.title}</p>
                <p className="cart-product-subtitle">{elem.Product.description}</p>
                <p className="cart-product-price">{elem.Product.price} $</p>
                <p className="stock-status">In Stock</p>
            </div>
            </div>
            <div className="cartLine"></div>
            <div className="assesibility">
                <div className="value-inc-dec">
                    <button className="inc-dec-btn"
                    onClick={()=>cartProductIncrease(elem.Product)}
                    >+</button>
                    <p className="quantity">{elem.Product.qty}</p>
                    <button className="inc-dec-btn"
                    onClick={()=>cartProductDecrease(elem.Product)}
                    >-</button>
                </div>
                <button className="remove-item"
                onClick={()=>removeItem(elem.Product)}
                >Remove</button>
            </div>
        </div>
        </>
    )
}