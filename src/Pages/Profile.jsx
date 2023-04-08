import React from "react";
import "../style/profile.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import pic1 from "../icons/1.png";
import pic2 from "../icons/2.png";
import pic3 from "../icons/3.png";
import pic4 from "../icons/4.png";
import profile from "../icons/Profile.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserRequests from "../Requests/UserRequests";
import {
  BtnLoaderAction,
  ProfilePictureAction,
  UserAction,
} from "../Redux/Actions/Actions";
import Rating from "../Components/Rating";
const Profile = () => {
  const dispatch = useDispatch();
  const picture = useSelector((state) => state?.User?.picture);
  const Btn_loader = useSelector((state) => state?.Toggle?.Btn_loader);
  const user = useSelector((state) => state?.User?.user);
  const [update, setUpdate] = useState({
    username: user && user?.username,
    phoneNumber: user && user?.phoneNumber,
    email: user && user?.email,
  });
  const changeUpdate = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setUpdate({ ...update, [name]: val });
  };

  const HandleUpdate = () => {
    dispatch(BtnLoaderAction("editProfile"));
    if (update.email === "") {
      toast.error("Enter Email Address");
    } else if (update.phoneNumber === "") {
      toast.error("Enter Phone Number");
    } else if (update.username === "") {
      toast.error("Enter your Name");
    } else {
      axios
        .put(UserRequests.EDIT_USER + user?._id, update)
        .then((res) => {
          dispatch(BtnLoaderAction(""));
          toast.success(res.data.message);
          dispatch(
            UserAction({
              ...user,
              username: update.username,
              phoneNumber: update.phoneNumber,
              email: update.email,
            })
          );
        })
        .catch((err) => {
          dispatch(BtnLoaderAction(""));
          toast.error(err);
        });
    }
  };

  return (
    <>
      <section className="profile">
        <Header />
        <Rating />
        <div className="p-main">
          <div className="p-header">
            <span>
              Welcome {user && user?.username?.split(" ")[0].toUpperCase()}
            </span>
          </div>
          <section className="p-body ">
            <div className="p-left">
              <img src={picture ? picture : profile} alt="" />
              <span>{user && user?.username}</span>
              <span>{user && user?.email}</span>
              <span>{user && user?.phoneNumber}</span>
            </div>

            <div className="p-right">
              <label htmlFor="name">Name</label>
              <input
                onChange={changeUpdate}
                value={update?.username}
                type="text"
                name="username"
                id="name"
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={changeUpdate}
                value={update?.email}
                type="email"
                name="email"
                id="email"
              />
              <label htmlFor="mobile">Phone Number</label>
              <input
                onChange={changeUpdate}
                type="tel"
                value={user && update.phoneNumber}
                name="phoneNumber"
                id="mobile"
              />
              <label htmlFor="avatar">Chooge Avatar</label>
              <div className="avatar">
                <img
                  onClick={() => dispatch(ProfilePictureAction(pic1))}
                  src={pic1}
                />
                <img
                  onClick={() => dispatch(ProfilePictureAction(pic2))}
                  src={pic2}
                />
                <img
                  onClick={() => dispatch(ProfilePictureAction(pic3))}
                  src={pic3}
                />
                <img
                  onClick={() => dispatch(ProfilePictureAction(pic4))}
                  src={pic4}
                />
              </div>
              <button onClick={HandleUpdate} style={{ cursor: "pointer" }}>
                {Btn_loader === "editProfile" && (
                  <span className="loader"></span>
                )}{" "}
                Update
              </button>
            </div>
          </section>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Profile;
