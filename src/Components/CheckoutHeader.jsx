import React, { useEffect, useLayoutEffect } from "react";
import { Link, Route } from "react-router-dom";
import "../style/header.css";
import profile from "../icons/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UserAction } from "../Redux/Actions/Actions";
import { useRef } from "react";

function useOutsideAlerter(ref, setNavUser) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setNavUser(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const CheckoutHeader = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [navUser, setNavUser] = useState(true);
  const picture = useSelector((state) => state?.User?.picture);
  const user = useSelector((state) => state?.User?.user);
  const Logout = () => {
    localStorage.removeItem("id");
    dispatch(UserAction(null));
  };
  useOutsideAlerter(wrapperRef, setNavUser);
  return (
    <nav className="navbar checkout_header">
      <Link to={"/"} >Back to Store</Link>
      <div className="nav_right">
        {user ? (
          <div className="userAfterLogin">
            <div
              onClick={() => setNavUser(!navUser)}
              className="login_logout flex"
            >
              <span>{user?.username?.split(" ")[0].toUpperCase()}</span>
              <img src={picture ? picture : profile} width="30px" alt="" />
            </div>
            <div
              ref={wrapperRef}
              className={navUser ? "navUser hide" : "navUser"}
            >
              <ul>
                <li>
                  <Link to="/order">Order</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={Logout}>Log Out</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="userAfterLogin">
            <div className="login_logout flex">
              <span>Guest</span>
              <img src={profile} width="30px" alt="" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CheckoutHeader;
