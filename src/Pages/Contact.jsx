import React from "react";
import "../style/contact.css";
import Header from "../Components/Header";
import { useState } from "react";
import Footer from "../Components/Footer";
import axios from "axios";
import UserRequests from "../Requests/UserRequests";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SignUpDialogAction } from "../Redux/Actions/Actions";
const Contact = () => {
  const dispatch  = useDispatch()
  const user = useSelector((state) => state?.User?.user);
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    interest: "",
    phoneNumber: "",
    description: "",
  });
  const changeUpdate = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setContactData({ ...contactData, [name]: val });
  };

  const submitHandle = () => {
    axios
      .post(UserRequests.CONTACT, contactData)
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.success("Sorry your Contact unable to add");
      });
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
                defaultValue = {user?.username}
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email">Enter your email</label>
              <input
                onChange={changeUpdate}
                defaultValue = {user?.email}
                name="email"
                type="email"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label htmlFor="interest">What you are interested</label>
              <select onChange={changeUpdate} name="interest" id="interest">
                <option value="Bussiness">Bussiness</option>
                <option value="Marketing">Marketing</option>
                <option value="Investment">Investment</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="phoneNumber">Your mobile Number</label>
              <input
                onChange={changeUpdate}
                defaultValue = {user?.phoneNumber}
                type="tel"
                name="phoneNumber"
                placeholder="XXX-XXX-XXXX"
              />
            </div>
          </div>
          <textarea
            onChange={changeUpdate}
            name="description"
            className="query"
            placeholder="White Something"
          ></textarea>
        { user?<><button onClick={submitHandle}>Just Send</button></>:<><button onClick={()=>dispatch(SignUpDialogAction(true))}>Login to submit</button></> }
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Contact;
