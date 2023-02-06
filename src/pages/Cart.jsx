import React, { useState ,useEffect} from "react";
import { ItemInCard } from "../components/ItemInCart";
import { PriceCard } from "../components/priceCard";
import { collection, getDocs, updateDoc,doc, deleteDoc } from "firebase/firestore";
import { db,auth } from "../firebase_config";
import './Cart.css'
export const Cart=()=>{
    const [cartItems,setCartItems]=useState([]);
    function getData(){
            auth.onAuthStateChanged(async user=>{
                if(user){

                    await getDocs(collection(db, "cart " +user.uid))
                    .then( (querySnapshot)=>{               
                        const newData = querySnapshot.docs
                            .map((doc) => ({...doc.data(), id:doc.id }));
                        setCartItems(newData);                
                        
                    })
                }
            })
    }
    
useEffect(()=>{
    getData();
},[])


console.log(cartItems)

let Product;

const cartProductIncrease=(cartProduct)=>{
    // console.log(cartProduct);
    Product=cartProduct;
    Product.qty=Product.qty+1;
    Product.TotalProductPrice=Product.qty*Product.price;
    // updating in database
    console.log(cartProduct.id)
    auth.onAuthStateChanged(async user=>{
        if(user){
            const updateRef = doc(db,'cart ' + user.uid ,cartProduct.id );
            await updateDoc(updateRef,{
                Product
            })
            console.log('update successfull')
        }
        else{
            console.log('user is not logged in to increment');
        }
    })
}

const removeItem=async (cartProduct)=>{
    auth.onAuthStateChanged(async user=>{

        await deleteDoc(doc(db,'cart ' + user.uid ,cartProduct.id ));
        console.log("deleted Successfully")
    })
}

// cart product decrease functionality
const cartProductDecrease =(cartProduct)=>{
    Product=cartProduct;
    if(Product.qty > 1){
        Product.qty=Product.qty-1;
        Product.TotalProductPrice=Product.qty*Product.price;
         // updating in database
         auth.onAuthStateChanged(async user=>{
            if(user){
                const updateRef = doc(db,'cart ' + user.uid ,cartProduct.id );
                await updateDoc(updateRef,{
                    Product
                })
                console.log('update successfull')
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }
}







    return (
<div className="cart">
<div className="left-section">
<h1>Items You Added!</h1>
<div className="Cline"></div>
<div className="ItemInCart-holder">
 {
    cartItems.map((elem)=>{
        return <ItemInCard
        elem={elem}
        key={Math.random()}
        cartProductIncrease={cartProductIncrease}
        removeItem={removeItem}
        cartProductDecrease={cartProductDecrease}
        />
    })
 }
</div>
</div>
<div className="right-section">
<PriceCard/>
<button
className="order-btn"
>Order Now</button>
</div>
</div>
    )
}