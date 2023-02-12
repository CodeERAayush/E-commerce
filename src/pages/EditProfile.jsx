import './Profile.css'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { auth ,db} from '../firebase_config';
import { getDoc,doc,collection,updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

export const EditProfile=()=>{

    const [details,setDetails]=useState({
        name:'',
        email:'',
        address:'',
        profile:'../images/userprofile.png'
    })

    const [user,setUser]=useState();


    function getData(){
        auth.onAuthStateChanged(async user=>{
            if(user){
                console.log(user.uid)
                const docSnap = await getDoc(doc(db, "users", user.uid));
                setUser(user.uid)
                console.log(docSnap.data())
                setDetails(docSnap.data())
            }
        })
}

useEffect(()=>{
getData();
},[])

const updateData=async()=>{
    await updateDoc(doc(db,'users',user),{
        ...details
    })
}




console.log(details)

    return (
        <>
        <div className='edit-profile-screen'>
        <div className='edit-profile-card'>
            <div className='edit-top-area'>
                <div className='edit-top-area-left'>
                    <label for='img-selector'>
                    <img 
                    style={{width:30,height:30,borderWidth:1,borderColor:'black',cursor:"pointer",position:"absolute",zIndex:1,alignSelf:"center",margin:50}}
                    src='../images/edit.png'/>
                    <img 
                    style={{width:'80%',height:"80%",borderRadius:"50%",borderWidth:1,borderColor:'black',cursor:"pointer",position:"relative"}}
                    src={details.profile===""?'../images/userprofile.png':details.profile}/>
                    </label>
                    <input 
                    id="img-selector"
                    type='file'
                    style={{display:'none'}}
                    /> 
                </div>
                <div className='top-area-right'>
                    <p className='user-info'><span style={{fontWeight:600,fontSize:20}}>{details.name}</span></p>
                    <p className='user-info'><span style={{color:'green'}}>{details.email}</span></p>
                    <p className='user-info-address'>{details.address===""?"Update Your Address!" :details.address }</p>
                </div>
            </div>
            <div className='bottom-area'>
                <input
                className="edit-profile-input"
                placeholder="Name"
                value={details.name}
                onChange={(event)=>setDetails({...details,name:event.target.value})}
                type='text'
                />
                   <input
                className="edit-profile-input"
                placeholder="Email"
                value={details.email}
                onChange={(event)=>setDetails({...details,email:event.target.value})}
                type='email'
                />
                   <textarea
                className="edit-profile-input"
                placeholder="Address"
                value={details.address}
                maxLength='80'
                onChange={(event)=>setDetails({...details,address:event.target.value})}
                type='text'
                rows='6'
                />
                <button 
                onClick={updateData}
                className="edit-submit-button">
                    Update
                </button>
            </div>
        </div>
        </div>
        </>
    )
}