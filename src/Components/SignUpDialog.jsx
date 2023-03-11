import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  SignUpBtnAction,
  UserAction,
  SignUpDialogAction,
  FPWDAction,
  DarkAction,
  BtnLoaderAction,
} from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import close from "../icons/close.png";
import axios from "axios";
import "../style/SignUpDialog.css";
import ScrollAndRefresh from "./ScrollAndRefresh";

function useOutsideAlerter(ref) {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(DarkAction(false));
        dispatch(SignUpDialogAction(false));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const SignUpModel = () => {
  const dispatch = useDispatch();
  const SignUpBtn = useSelector((state) => state?.Toggle?.SignUpBtn);
  const Btn_loader = useSelector((state) => state?.Toggle?.Btn_loader);
  useEffect(() => {
    dispatch(DarkAction(true));
  }, []);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  let name, val;

  const loginInputhandler = (e) => {
    name = e.target.name;
    val = e.target.value;
    setUser({ ...user, [name]: val });
  };

  const inputhandler = (e) => {
    name = e.target.name;
    val = e.target.value;
    setUser({ ...user, [name]: val });
  };

  const Login = (e) => {
    e.preventDefault();

    if (user.mobile === "") toast.error("Enter Your Email");
    else if (user.password.length < 5) toast.error("Enter valid Password");
    else {
      dispatch(BtnLoaderAction("login"));
      axios
        .post(UserRequests.USER_LOGIN, {
          phoneNumber: user.mobile,
          password: user.password,
        })
        .then((res) => {
          localStorage.setItem("id", res.data._id);

          dispatch(UserAction(res.data));
          dispatch(SignUpDialogAction(false));
          dispatch(DarkAction(false));
          dispatch(BtnLoaderAction(null));
          toast.success("Login successfully");
        })
        .catch((err) => {
          dispatch(BtnLoaderAction(null));
          console.log(err);
          toast.error("Invelid Number or Password");
        });
    }
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const signUp = (e) => {
    e.preventDefault();
    if (user.name === "") toast.error("Enter Your Name please");
    else if (user.email === "") toast.error("Enter Your Email");
    else if (user.mobile === "") toast.error("Enter Your Email");
    else if (user.password.length < 5) toast.error("Enter Your valid Password");
    else if (user.password !== user.confirmPassword) {
      toast.error("Password should be same");
    } else {
      dispatch(BtnLoaderAction("signup"));
      axios
        .post(UserRequests.USER_SIGNUP, {
          username: user.name,
          email: user.email,
          phoneNumber: user.mobile,
          password: user.password,
          type: "constomer",
        })
        .then((res) => {
          dispatch(BtnLoaderAction(null));
          localStorage.setItem("id", res.data.user._id);
          dispatch(UserAction(res.data.user));
          dispatch(SignUpDialogAction(false));
          toast.success(res.data.messege);
          dispatch(DarkAction(false));
        })
        .catch((err) => {
          dispatch(BtnLoaderAction(null));
          toast.success(err);
        });
    }
  };
  const Register = () => {};
  return (
    <>
    <ScrollAndRefresh/>
      <div className="signInMdel ">
        <img
          onClick={() => {
            dispatch(DarkAction(false));
            dispatch(SignUpDialogAction(false));
          }}
          style={{ width: "25px", position: "absolute", right: "1rem" }}
          src={close}
        />
        <div ref={wrapperRef} className="checkput__form ">
          <div className="login_logout">
            <button
              onClick={() => dispatch(SignUpBtnAction(true))}
              className={SignUpBtn ? "login loginActive " : "login "}
            >
              Sign In
            </button>
            <button
              onClick={() => dispatch(SignUpBtnAction(false))}
              className={SignUpBtn ? "logout " : "logout loginActive"}
            >
              Sign Up
            </button>
          </div>
          <div className="form_class otp">
            {SignUpBtn ? (
              <>
                <form style={{ marginTop: "3rem" }}>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter Your Mobile Number"
                    value={user.mobile}
                    onChange={loginInputhandler}
                  />
                  <input
                    type="password"
                    name="password"
                    id=""
                    placeholder="Enter Your Password"
                    value={user.password}
                    onChange={loginInputhandler}
                  />
                  <button
                    className={Btn_loader ? "load" : "cl"}
                    onClick={Login}
                  >
                    {Btn_loader === "login" && (
                      <span className="loaders"></span>
                    )}{" "}
                    Log in
                  </button>
                </form>
                <div className="newuser">
                  <strong onClick={() => {
                    dispatch(FPWDAction("email"))
                    dispatch(SignUpDialogAction(false))
                  }}>
                    Forgot Password ?
                  </strong>
                  <span>
                    New user ?{" "}
                    <strong onClick={() => dispatch(SignUpBtnAction(false))}>
                      Register
                    </strong>
                  </span>
                </div>
              </>
            ) : (
              <form>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={user.name}
                  onChange={inputhandler}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={user.email}
                  onChange={inputhandler}
                />
                <input
                  type="number"
                  name="mobile"
                  id=""
                  placeholder="Enter Your Mobile Number"
                  value={user.mobile}
                  onChange={inputhandler}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Your password"
                  value={user.password}
                  onChange={inputhandler}
                />
                <input
                  name="confirmPassword"
                  type="password"
                  id=""
                  placeholder="Confirm Your Password"
                  value={user.confirmPassword}
                  onChange={inputhandler}
                />
                <button className={Btn_loader ? "load" : "cl"} onClick={signUp}>
                  {Btn_loader === "signup" && <span className="loaders"></span>}
                  SignUp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModel;
