import React, { useEffect } from "react";
import './priceCard.css'
export const PriceCard=({cartItems,totalPrice,setTotalPrice})=>{
    var Totalprice=0 
    var totalItem=0;
    const [attr,setAttr]=React.useState([]
    )
    useEffect(()=>{
       cartItems.map((elem)=>{
            Totalprice=Totalprice+(elem.Product.price*elem.Product.qty);
            totalItem=totalItem+elem.Product.qty;
            setAttr([totalItem,Totalprice])
       }) 
    },[cartItems])
    // console.log(cartItems)
    
    var discount=attr[1]*0.1;
    var afterDis=attr[1]-discount
    setTotalPrice(afterDis)
    // console.log(totalPrice)
    
    return (
        <>
        <div className="price-card">
            <div className="tag-holder"><p className="price-tag">Price Details</p></div>
            <div className="line"></div>
            <div className="tag-holder"><p className="price"><span style={{fontWeight:600}}>Price ({attr[0]} items) : </span> <span>{attr[1]}</span></p></div>
            <div className="tag-holder"><p className="price"><span style={{fontWeight:600}}>Discount (-10%) : </span> <span>-{discount.toFixed(2)}</span></p></div>
            <div className="tag-holder"><p className="price"><span style={{fontWeight:600}}>Delivery Charge : </span> <span style={{color:"green"}}>Free</span></p></div>
            <div className="line"></div>
            <div className="tag-holder"><p className="total-price"><span style={{fontWeight:600}}>Total : </span> <span style={{fontWeight:600}}>{totalPrice} /-</span></p></div>
        </div>
        </>
    )
}