import React,{useState} from 'react'
import { storage,db } from '../firebase_config';
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {doc,setDoc,addDoc,collection} from 'firebase/firestore'
import './AddProduct.css'
import Select from "react-dropdown-select";

export const AddProducts = () => {

    const [title, setTitle]=useState('');
    const [description, setDescription]=useState('');
    const [price, setPrice]=useState('');
    const [image, setImage]=useState(null);
    const [imageError, setImageError]=useState('');
    const [longDes,setLongDes]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const [uploadError, setUploadError]=useState('');
    const [category,setCategory]=useState()

    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }

    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        if(category===undefined){
            alert('please select category!')
        }
        else{
        const uploadTask=ref(storage,`product-images/${image.name}`)
        const uploadFile=uploadBytesResumable(uploadTask,image);
        uploadFile.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            // ref(storage,'product-images').child(image.name).
            getDownloadURL(uploadFile.snapshot.ref).then(async url=>{
                try {
                    const docRef = await addDoc(collection(db, "Products"), {
                        title,
                    description,
                    longDes,
                    price: Number(price),
                    url,
                    category:category[0].value,
                    timestamp:Date.now(),
                    });
                    console.log("Document written with ID: ", docRef.id);
                    setSuccessMsg('Product added successfully');
                    setTitle('');
                    setDescription('');
                    setLongDes('');
                    setPrice('');
                    setCategory();
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }



            })
        })
    }
    }





    const options = [
        { 
          value: 1,
          label: "Mens Wear"
        },
        {
          value:  2,
          label: "Ladies Wear"
        },
        { 
            value: 3,
            label: "Electronics"
          },
          {
            value:  4,
            label: "Gadgets"
          },
          { 
            value: 5,
            label: "Kids Wear"
          },
          {
            value:  6,
            label: "Books"
          },
          {
            value:  7,
            label: "Smartphones"
          },
          {
            value:  8,
            label: "Home"
          },
          {
            value:  9,
            label: "Personal Care"
          },
          {
            value:  10,
            label: "Toys and Baby"
          },
          {
            value:  11,
            label: "Grocery"
          }


      ];










  
    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Product Title</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                <br></br>
                <Select options={options}
            placeholder="Select Category"
            onChange={(values) => setCategory(values)} />
            <br></br>
                <label>Product Short Description</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Product long description</label>
                <textarea className='textarea-control' required
                value={longDes}
                onChange={(e)=>setLongDes(e.target.value)} 
                rows='10'
                cols='87'
                >

                </textarea>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required
                onChange={(e)=>setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input>
                
                {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>}
                <br></br>           
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>
            {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>}

        </div>
    )
}