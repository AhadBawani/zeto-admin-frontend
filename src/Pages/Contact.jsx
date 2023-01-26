import React from "react";
import "../style/contact.css";
import Header from "../Components/Header";
import { useState } from "react";
import Footer from "../Components/Footer";

const Contact = () => {
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    interest: "",
    phoneNumber: "",
    query: "",
  });
  const changeUpdate = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setContactData({ ...contactData, [name]: val });
  };

  const submitHandle = () => {
    console.log(contactData);
  };
  return (
    <>
      <section className="contact">
        <Header />
        <div className="c-user-detail">
          <h1>
            Love to hear from you,
            <br /> Get in touch
          </h1>
          <div className="c-input-table">
            <div>
              <label htmlFor="username">Your Name</label>
              <input
                name="username"
                onChange={changeUpdate}
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email">Enter your email</label>
              <input
                onChange={changeUpdate}
                name="email"
                type="email"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label htmlFor="interest">What you are interested</label>
              <select onChange={changeUpdate} name="interest" id="interest">
                <option value="technology">Technology</option>
                <option value="technology">Technology</option>
                <option value="technology">Technology</option>
              </select>
            </div>
            <div>
              <label htmlFor="phoneNumber">Your mobile Number</label>
              <input
                onChange={changeUpdate}
                type="tel"
                name="phoneNumber"
                placeholder="XXX-XXX-XXXX"
              />
            </div>
          </div>
          <textarea
            onChange={changeUpdate}
            name="query"
            className="query"
            placeholder="White Something"
          ></textarea>
          <button onClick={submitHandle}>Just Send</button>
        </div>
        <Footer/>
      </section>
    </>
  );
};

export default Contact;
