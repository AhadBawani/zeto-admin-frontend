import React from "react";
import { Link } from "react-router-dom";
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
          <span>About Us</span>
          <Link to={"/contact"}> Contact Us</Link>
          <Link to={"/privacy"}>Privacy Policy</Link>
        </div>
        <div className="f__center">
          <span>About Us</span>
          <Link to={"/contact"}> Contact Us</Link>
          <Link to={"/privacy"}>Privacy Policy</Link>
        </div>
        <div className="f__center">
          <span>About Us</span>
          <Link to={"/contact"}> Contact Us</Link>
          <Link to={"/privacy"}>Privacy Policy</Link>
        </div>
        <div className="f__center">
          <span>About Us</span>
          <Link to={"/contact"}> Contact Us</Link>
          <Link to={"/privacy"}>Privacy Policy</Link>
        </div>
      </div>
      <div className="__copyright">Copyright @ 2022 | ZetoMart</div>
    </section>
  );
};

export default Footer;
