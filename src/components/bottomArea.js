import React from "react";
import "./BottomArea.css"; 

function BottomArea() {
  return (
    <div className="footer">
      <div className="top-area-footer">
        
        <div className="left-part-top-footer">

          <div className="section-inside">
          <span className="mail-us">About:</span>
            <p className="section-footer">Contact us</p>
            <p className="section-footer">About us</p>
            <p className="section-footer">Carrier</p>
            <p className="section-footer">Press</p>
            <p className="section-footer">Wholesale</p>
            <p className="section-footer">Corporation</p>
          </div>
          <div className="section-inside">
          <span className="mail-us">Help:</span>
            <p className="section-footer">Payment</p>
            <p className="section-footer">Shipping</p>
            <p className="section-footer">Cancellation & Return</p>
            <p className="section-footer">FAQ</p>
          </div>
          <div className="section-inside">
          <span className="mail-us">Consumer Policy:</span>
          <p className="section-footer">Return Policy</p>
            <p className="section-footer">Terms of use</p>
            <p className="section-footer">Security</p>
            <p className="section-footer">Privacy</p>
            <p className="section-footer">Sitemap</p>
            <p className="section-footer">EPR compliance</p> <p className="mail-us-footer">India</p>
          </div>
          <div className="section-inside">
          <span className="mail-us">Social:</span>
            <p className="section-footer">Linkedin</p>
            <p className="section-footer">Github</p>
            <p className="section-footer">Instagram</p>
            <p className="section-footer">Youtube</p>
          </div>

        </div>


        <div className="mid-vertical-line">
        </div>


        <div className="right-part-top-footer">
          <div className="right-part-top-footer-elements">
            <span className="mail-us">Mail us:</span>
            <p className="mail-us-footer">E-com Codeeraayush</p>
            <p className="mail-us-footer">Buildings Alyssa, Begonia &</p>
            <p className="mail-us-footer">Clove Embassy Tech Village,</p>
            <p className="mail-us-footer">India</p>
          </div>

          <div className="right-part-top-footer-elements">
          <span className="mail-us">Contact:</span>
            <p className="mail-us-footer">dev.aayushpandey1100@gmail.com</p>
            <p className="mail-us-footer">Call: +917860456546</p>
            <p className="mail-us-footer">Ramjanki Nagar</p>
            <p className="mail-us-footer">Nakha No 1, Basharatpur</p>
            <p className="mail-us-footer">Pin: 273004 , 0551</p>
            <p className="mail-us-footer">Gorakhpur, UttarPradesh</p>
            <p className="mail-us-footer">India</p>
          </div>



        </div>


      </div>






      <div className="bottom-area-footer">
        <p className="bottom-area-options">Become a Seller</p>
        <p className="bottom-area-options">Advertise</p>
        <p className="bottom-area-options">Gift Cards</p>
        <p className="bottom-area-options">Help Center</p>
        <p style={{color:"white",fontSize:10}}>©2023 Codeeraayush-ecom</p>
      <img
      className="bottom-area-img"
      src="../images/bottom.png"/>

      </div>
    </div>
  );
}

export default BottomArea;
