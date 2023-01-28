import React from "react";
import "../style/aboutus.css";
import CheckoutHeader from "../Components/CheckoutHeader";
import Footer from "../Components/Footer";
import about from "../icons/about.png";
import about1 from "../icons/about2.png";

const AboutUs = () => {
  return (
    <>
      <section className="about-us">
        <CheckoutHeader />
        <section className="au-body">
          <div className=" au-sec1">
            <div>
              <h1>We build bridges between</h1>
              <h1> local shops and local people.</h1>
            </div>
            <p>
              To build software and student community that brings the local shop
              and local street food vendors close to all the local people of
              that city.
            </p>
          </div>
          <img src={about} alt="" />
          <div className="au-sec2">
            <h1>Together we are strong</h1>
            <div className="au-sec2-data">
              <p>
                Our team continues to grow in size, but we are united in our
                common goal of making local sellers and street food vendors
                visible throughout the city in which they operate. We achieve
                this through the tireless efforts of a dedicated team of
                determined college students
              </p>
              <p>
                In 2022, we made the decision to alter the course of our college
                experience by starting a business. We were growing tired of the
                routine of college life. The idea for Zetomart came to us as we
                realized that there were many other students who shared our
                sentiment and desired to engage in real-world business. Thus, we
                began to construct a community of students through which they
                could manage a comprehensive e-commerce marketplace for an
                entire city via Zetomart.
              </p>
            </div>
          </div>
          <div className="au-sec3">
            <h1>Zetomart Core Team:</h1>
            <div className="au-sec4-data">
              <h1>
                “Our goal is to make people shop local and eat local. We want to
                boost the local economy of every city in India. And we want to
                do it with the help of students. We want to create the part-time
                job culture among students in India”
              </h1>
            </div>
          </div>
          <div className="au-sec4">
            <h1>Join our team</h1>
            <div className="au-sec4-data">
              <p>
                {" "}
                we believe it takes great people to make a great product. We are
                frequently looking for college students who want to join
                zetomart to make there college life full of adventures where
                they can explore the real world problems and solve them.
              </p>
              <span>See open positions</span>
              <span>join Discord</span>
            </div>
          </div>
          <div className="au-sec5">
            <div className="au-contact">
              <h1>Have a question? Our team is happy to assist you.</h1>
              <span>Contact-us</span>
              <span>Or call 9XX-XXX-XXXX</span>
            </div>
            <img src={about1} alt="" />
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default AboutUs;
