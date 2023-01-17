import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  SignUpBtnAction,
  UserAction,
  SignUpDialogAction,
} from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import close from "../icons/close.png";
import axios from "axios";
import "../style/SignUpDialog.css";
const SignUpModel = () => {
  const dispatch = useDispatch();
  const SignUpBtn = useSelector((state) => state?.Toggle?.SignUpBtn);

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
      axios
        .post(UserRequests.USER_LOGIN, {
          phoneNumber: user.mobile,
          password: user.password,
        })
        .then((res) => {
          localStorage.setItem("id", res.data._id);
          toast.success("Login successfully");
          dispatch(UserAction(res.data));
          dispatch(SignUpDialogAction(false));
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const signUp = (e) => {
    e.preventDefault();
    if (user.name === "") toast.error("Enter Your Name please");
    else if (user.email === "") toast.error("Enter Your Email");
    else if (user.mobile === "") toast.error("Enter Your Email");
    else if (user.password.length < 5) toast.error("Enter Your valid Password");
    else if (user.password !== user.confirmPassword) {
      toast.error("Password should be same");
    } else {
      axios
        .post(UserRequests.USER_SIGNUP, {
          username: user.name,
          email: user.email,
          phoneNumber: user.mobile,
          password: user.password,
          type: "user",
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("id", res.data.user._id);
          toast.success("signup successfully");
          dispatch(UserAction(res.data.user));
          dispatch(SignUpDialogAction(false));
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <>
      <div
      
        className="signInMdel"
      >
        <img
          onClick={() => dispatch(SignUpDialogAction(false))}
          style={{ width: "25px", position: "absolute", right: "1rem" }}
          src={close}
        />
        <div className="checkput__form">
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
          <div className="form_class">
            {SignUpBtn ? (
              <form>
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
                <button onClick={Login}> Log in</button>
              </form>
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
                <button onClick={signUp}> SignUp</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModel;
