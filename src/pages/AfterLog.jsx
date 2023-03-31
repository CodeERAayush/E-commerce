import React, { useEffect, useState } from "react";
import { ItemCard } from "../components/itemCard";
import { collection, getDocs,setDoc,doc,addDoc, query,where, limit, orderBy } from "firebase/firestore";
import { db } from "../firebase_config";
import { auth } from "../firebase_config";
import { useNavigate } from "react-router-dom";
// import NavBar from "../components/NavBar";
import './HomePage.css'
import { Categories } from "../components/categories";
import BottomArea from "../components/bottomArea";
export const AfterLog = ({navigation}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [products,setProducts]=useState([]);
    const [allProducts,setAllProducts]=useState([]);
    const categoryValues=[1,2,3,4,5,6,7,8,9,10,11];
    const categories=['Mens Wear','Ladies Wear','Electronics','Gadgets','Kids Wear','Books','Smartphones','Home','Personal Care','Toys and Baby','Grocery'];
    const [uploading,setUploading]=useState(false);
    const navigate=useNavigate();
    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };


    const getProducts=async(index)=>{
        console.log('getPorducts clicked',index)
        await getDocs(query(collection(db, "Products"),where("category","==",index)))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setProducts(newData);                
                console.log(products, newData);
            })
    }
    const getAllProducts=async()=>{
        await getDocs(query(collection(db, "Products"),orderBy('timestamp','desc'),limit(10)))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setAllProducts(newData);                
                console.log(products, newData);
            })
    }


    useEffect(()=>{
        // getProducts(i);
        getAllProducts();
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
                    onMouseOut={handleMouseOut}>All</p>
                    {isHovering&&<p className="category-subhead">Explore More</p>}
                </div>
                {!uploading&&allProducts.length>0&&<div className="items-in-row">
                    {
                        allProducts.map((elem)=>{
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
                categoryValues.map( (index)=>{
                     return <Categories
                     index={index}
                     addToCart={addToCart}

                     />
                })
               
                }










                {
                   uploading && products.length<1&&(<div className='container-fluid'>Please wait....</div>)
                }
            </div>
            {/* <BottomArea/> */}
        </>
    )
}