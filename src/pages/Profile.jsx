import './Profile.css'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { auth ,db} from '../firebase_config';
import { getDoc,doc,collection } from 'firebase/firestore';
const Profile=()=>{


    const [details,setDetails]=useState({
        name:localStorage.getItem('name'),
        email:localStorage.getItem('email'),
        address:'Nan',
        profile:'../images/userprofile.png'
    })


    function getData(){
        auth.onAuthStateChanged(async user=>{
            if(user){
                console.log(user.uid)
                const docSnap = await getDoc(doc(db, "users", user.uid));
                // console.log(docSnap.data())
                setDetails(docSnap.data())
            }
        })
}

useEffect(()=>{
getData();
},[])




    
    return(
        <div className='profile-screen'>
        <div className='profile-card'>
            <div className='top-area'>
                <div className='top-area-left'>
                    <img 
                    style={{width:'80%',height:"80%",borderRadius:"50%",borderWidth:1,borderColor:'black'}}
                    src={details.profile===""?'../images/userprofile.png':details.profile}/>
                </div>
                <div className='top-area-right'>
                    <p className='user-info'><span style={{fontWeight:600,fontSize:20}}>{details.name}</span></p>
                    <p className='user-info'><span style={{color:'green'}}>{details.email}</span></p>
                    <p className='user-info-address'>{details.address===""?"Update Your Address!" :details.address }</p>
                </div>
            </div>
            <div className='bottom-area'>
                <div className='profile-utility-button'>
                <Link  
                className='profile-utility-button'
                to='/'>
                    <p className='utility-button-content'>Home</p>
                </Link>
                </div>
                <div className='profile-utility-button'>
                <Link  
                className='profile-utility-button'
                to='/Profile/Edit'>
                    <p className='utility-button-content'>Edit Profile</p>
                </Link>
                </div>


                <div className='profile-utility-button'>
                <Link  
                className='profile-utility-button'
                to='#'>
                    <p className='utility-button-content'>Orders</p>
                </Link>
                </div>



                <div className='profile-utility-button'>
                <Link  
                className='profile-utility-button'
                to='#'>
                    <p className='utility-button-content'>Contact Us!</p>
                </Link>
                </div>
                <div className='profile-utility-button'>

                <a  
                className='profile-utility-button'
                href='https://codeeraayush-portfolio.netlify.app'>
                    <p className='utility-button-content'>About Us!</p>
                </a>
                </div>
                
            </div>
        </div>
        </div>
    )
}
export default Profile;