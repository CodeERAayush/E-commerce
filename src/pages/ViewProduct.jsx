import { useLocation,useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { ItemCard } from "../components/itemCard";
import { collection, getDocs,setDoc,doc,addDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import { auth } from "../firebase_config";
import './ViewProd.css'
export const ViewProduct=()=>{
const location=useLocation();
const {elem}=location.state;
const navigate=useNavigate();

const [userId, setUid]=useState(null);
    function GetUserUid(){
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return userId;
    }

    const uid = GetUserUid();




let Product;
    const addToCart = async(product)=>{
        if(uid!==null){
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            await setDoc(doc(db, "cart "+uid, product.id),{
               Product
            });
        }
        else{
            navigate('/Login')
        }
        
    }






return(
    <div className="view-product-screen">
        <div className="view-product-left-element">

            <img className="view-product-img"
            src={elem.url}
            />
            <div className="view-product-description">
                <button className="view-product-add-to-cart"
                onClick={addToCart(elem)} >
                    Add To Cart
                </button>
                <button className="view-product-buy-now">
                    Buy Now!
                </button>
            </div>

        </div>

        <div className="view-product-right-element">

            <h1 className="view-product-title">{elem.title}</h1>
            <p className="view-product-details">{elem.description}</p>
            <p className="view-product-price">₹{elem.price}</p>
            <div className="long-description-area">
                <p className="view-product-description-right">Description!</p>
                <p style={{textAlign: "initial"}}>{elem.longDes===""||elem.longDes===undefined?"no description available":elem.longDes}</p>
            </div>
        </div>
    </div>
)
}