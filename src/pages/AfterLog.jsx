import React, { useEffect, useState } from "react";
import { ItemCard } from "../components/itemCard";
import { collection, getDocs,setDoc,doc,addDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import { auth } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import './HomePage.css'
export const AfterLog = ({navigation}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [products,setProducts]=useState([]);
    const [uploading,setUploading]=useState(false);
    const navigate=useNavigate();
    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };


    const getProducts=async()=>{
        await getDocs(collection(db, "Products"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setProducts(newData);                
                console.log(products, newData);
            })
    }



    useEffect(()=>{
        getProducts();
    },[])
  


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

console.log("User is logged in "+ uid);



    let Product;
    const addToCart = async(product)=>{
        if(uid!==null){
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            setUploading(true);
            await setDoc(doc(db, "cart "+uid, product.id),{
               Product
            });
            setUploading(false)

        }
        else{
            // props.history.push('/login');
            navigate('/Login')
        }
        
    }



    return (
        <>
        <div className="screenHome">
                <div className="left-section-home">
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
                {!uploading&&products.length>0&&<div className="items-in-row">
                    {
                        products.map((elem)=>{
                            return (
                                <ItemCard 
                                addToCart={addToCart}
                                key={Math.random()}
                                elem={elem}/>
                            )
                        })
                    }
                </div>}
                {
                   uploading && products.length<1&&(<div className='container-fluid'>Please wait....</div>)
                }
            </div>
        </>
    )
}