import React from "react";
import { Link } from "react-router-dom";
import store from "../icons/store.png"
import google from "../icons/google.png"

// import termandcondition from "../docs/termandcondition.pdf"
// import deliverypolicy from "../docs/deliverypolicy.pdf"
// import privacypolicy from "../docs/privacypolicy.pdf"
// import refundpolicy from "../docs/refundpolicy.pdf"
import "../style/footer.css";
const Footer = () => {
  return (
    <section className="footer__container">
      <div className="footer__up">
        <div className="f__center">
          <Link to={"/about-us"} > About Us</Link>
          <Link to={"/contact"} > Contact Us</Link>
          <Link to={"/privacy"} >Privacy Policy</Link>
          <Link to="./docs/termandcondition.pdf" download target={"_blank"}> Terms and Conditions</Link>
          <Link to="./docs/refundpolicy.pdf" download target={"_blank"}> Return and Refund Policy</Link>
          <Link to={"./docs/deliverypolicy.pdf"} download target={"_blank"}>Shipping and Delivery Policy</Link>
        </div>
        <div className="f__center">
          <span>Comming soon Zetomart Mobile app</span>
          <img src={store} alt="" />
          
        </div>
      </div>
      <div className="__copyright">Copyright @ 2022 | ZetoMart Right Reserved</div>
    </section>
  );
};

export default Footer;
