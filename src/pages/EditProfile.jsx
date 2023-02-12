import { Link } from "react-router-dom"
import React from "react"
import './Profile.css'

export const EditProfile=()=>{
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
                    src='../images/userprofile.png'/>
                    </label>
                    <input 
                    id="img-selector"
                    type='file'
                    style={{display:'none'}}
                    /> 
                </div>
                <div className='top-area-right'>
                    <p className='user-info'><span style={{fontWeight:600,fontSize:20}}>{localStorage.getItem('name')}</span></p>
                    <p className='user-info'><span style={{color:'green'}}>{localStorage.getItem('email')}</span></p>
                    <p className='user-info-address'>Ramjanki Nagar, Nakha No. 1, 273004, Basharatpur, Gorakhpur, Uttar Pradesh</p>
                </div>
            </div>
            <div className='bottom-area'>
                <input
                className="edit-profile-input"
                placeholder="Name"
                type='text'
                />
                   <input
                className="edit-profile-input"
                placeholder="Email"
                type='email'
                />
                   <textarea
                className="edit-profile-input"
                placeholder="Address"
                type='text'
                rows='6'
                />
                <button className="edit-submit-button">
                    Update
                </button>
            </div>
        </div>
        </div>
        </>
    )
}