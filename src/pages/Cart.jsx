import React, { useState ,useEffect} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ItemInCard } from "../components/ItemInCart";
import { PriceCard } from "../components/priceCard";
import { collection, getDocs, updateDoc,getDoc,doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db,auth } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import './Cart.css'
import axios from "axios";

// toast.configure();
export const Cart=()=>{
    const navigate=useNavigate();
    const [totalPrice,setTotalPrice]=useState();
    const [uid,setUid]=useState();
    const [cartItems,setCartItems]=useState([]);
    function getData(){
            auth.onAuthStateChanged(async user=>{
                if(user){
                    setUid(user.uid);
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



const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(async user=>{
            if(user){
                await getDocs(db,'cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
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






const handleToken=async (token)=>{
console.log(token)
const cart={name:'All Products',totalPrice}
const response=await axios.post('http://localhost:8080/checkout',{
    token,
    cart
})
console.log(response.data);
let {status}=response.data;
if(status==='success'){
navigate('/')
// toast.success('Your order has been placed successfully', {
//     position: 'top-right',
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: false,
//     progress: undefined,
//   });


  



}
else{
    alert('something went wrong in checkout!')
}
}


const getCartItems=async ()=>{
    const uids=await getDoc(doc(db,"cart "+uid));
console.log("Carts Items Are :" + uids)
}
useEffect(()=>{
    getCartItems();
})



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
<PriceCard
cartItems={cartItems}
totalPrice={totalPrice}
setTotalPrice={setTotalPrice}
/>
{/* <button
className="order-btn"
>Order Now</button> */}
<StripeCheckout
                            stripeKey='pk_live_51MblCMSInLvTpt5QMKJSxh9g2NAR80L9QPE2CXkYYRmIrz2ZOOi05JzrwFR2KevP6UbhVBVmt0nPKlMD1PvAR8RO00KrGS2ANM'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All Products'
                            amount={totalPrice * 100}
                        ></StripeCheckout>
</div>
</div>
    )
}