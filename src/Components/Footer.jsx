import React from "react";
import { Link } from "react-router-dom";
// import termandcondition from "../docs/termandcondition.pdf"
// import deliverypolicy from "../docs/deliverypolicy.pdf"
// import privacypolicy from "../docs/privacypolicy.pdf"
// import refundpolicy from "../docs/refundpolicy.pdf"
import "../style/footer.css";
const Footer = () => {
  return (
    <section className="footer__container">
      <div className="footer__up">
        <div className="f__left">
          <span>
            Marwadi University, Rajkot <br />
            Gujarat - 360003
          </span>
          <Link>
            <span>contact@zetomart.com</span>
          </Link>
        </div>

        <div className="f__center">
         
          <Link to={"/about-us"} onClick={() => sessionStorage.setItem('location', '/about-us')}> About Us</Link>
          <Link to={"/contact"} onClick={() => sessionStorage.setItem('location', '/contact')}> Contact Us</Link>
          <Link to={"/privacy"} onClick={() => sessionStorage.setItem('location', '/privacy')}>Privacy Policy</Link>
        </div>
        <div className="f__center">
         
          <Link to="./docs/termandcondition.pdf" download target={"_blank"}> Terms and Conditions</Link>
          <Link to="./docs/refundpolicy.pdf" download target={"_blank"}> Return and Refund Policy</Link>
          <Link to={"./docs/deliverypolicy.pdf"} download target={"_blank"}>Shipping and Delivery Policy</Link>
        </div>
        <div className="f__center">
       
          <Link to={"/contact"} onClick={() => sessionStorage.setItem('location', '/contact')}> Twitter</Link>
          <a href="https://www.linkedin.com/company/zetomart/" target="_blank">LinkedIn</a>
          <a href=""> Instagram</a>
        </div>
      </div>
      <div className="__copyright">Copyright @ 2022 | ZetoMart</div>
    </section>
  );
};

export default Footer;
