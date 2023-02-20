import React, { useEffect, useState } from "react";
import { ItemCard } from "../components/itemCard";
import { collection, getDocs,setDoc,doc,addDoc, query,where, limit, orderBy } from "firebase/firestore";
import { db } from "../firebase_config";
import { auth } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import '../pages/HomePage.css'

export const Categories=({index,addToCart})=>{
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
    const categoryValues=[1,2,3,4,5,6,7,8,9,10,11];
    const [products,setProducts]=useState([]);
    const categories=['Mens Wear','Ladies Wear','Electronics','Gadgets','Kids Wear','Books','Smartphones','Home','Personal Care','Toys and Baby','Grocery'];
    const getProducts=async(index)=>{
        await getDocs(query(collection(db, "Products"),where("category","==",index)))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setProducts(newData);                
            })
    }

    useEffect(()=>{
        getProducts(index);
    },[])
return(
    <div>
        <div className="line"></div>
    <div className="category-heading-holder">
    <p className="category-heading"
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}>{categories[index-1]}</p>
    {isHovering&&<p className="category-subhead">Explore More</p>}
</div>
<div className="items-in-row">
    {
        products.map((elem)=>{
            getProducts(index);
            return (
                <ItemCard 
                addToCart={addToCart}
                key={Math.random()}
                elem={elem}/>
            )
        })
    }
</div>
</div>
)
}