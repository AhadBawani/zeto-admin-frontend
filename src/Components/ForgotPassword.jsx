import React, { useEffect, useState } from "react";
import "../style/forgotPWD.css";
import OTPInput from "otp-input-react";
import { toast } from "react-toastify";
import {
  BtnLoaderAction,
  DarkAction,
  FPWDAction,
  SignUpBtnAction,
} from "../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserRequests from "../Requests/UserRequests";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const forgotpwd = useSelector((state) => state?.Toggle?.ForgotPWD);
  const Btn_loader = useSelector((state) => state?.Toggle?.Btn_loader);
  useEffect(() => {
    dispatch(DarkAction(true));
  }, []);
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const FPWDVerify = () => {
    dispatch(BtnLoaderAction("otp"));
    let obj = {
      email: sessionStorage.getItem("forgotEmail"),
      otp: parseInt(OTP),
    };
    axios
      .post(UserRequests.VERIFY_OTP, obj)
      .then((response) => {
        dispatch(BtnLoaderAction(""));
        if (response) {
          console.log(response.data?.message);
          dispatch(FPWDAction("cpwd"));
        }
      })
      .catch((error) => {
        dispatch(BtnLoaderAction(""));
        toast.error(error.response.data?.message);
      });
  };
  const changePassword = () => {
    if (password !== confirmPassword) {
      toast.error("Password and confirm password doesn't match");
    } else {
      let obj = {
        email: sessionStorage.getItem("forgotEmail"),
        password: password,
      };
      dispatch(BtnLoaderAction("pwd"));
      axios
        .post(UserRequests.NEW_PWD, obj)
        .then((response) => {
          dispatch(SignUpBtnAction(true));
          dispatch(FPWDAction(""));
          dispatch(BtnLoaderAction(""));
          if (response) {
            toast.success(response.data?.message);
            dispatch(SignUpBtnAction(true));
          }
        })
        .catch((error) => {
          dispatch(BtnLoaderAction(""));
          console.log(error);
        });
    }
  };
  const SendEmail = () => {
    dispatch(BtnLoaderAction("email"));

    let obj = {
      email: email,
    };
    axios
      .post(UserRequests.FORGOT_PWD, obj)
      .then((response) => {
        dispatch(BtnLoaderAction(""));
        if (response) {
          toast.success(response.data?.message);
          dispatch(FPWDAction("otp"));
          sessionStorage.setItem("forgotEmail", email);
        }
      })
      .catch((error) => {
        dispatch(BtnLoaderAction(""));
        if (error) {
          toast.error(error.response.data?.message);
        }
      });
  };
  return (
    <>
      {forgotpwd && (
        <section className="signInMdel fpwd">
          {forgotpwd == "email" && (
            <div className="checkput__form ">
              <h1>Reset Password</h1>
              <span>Enter an email address you use to sign into.</span>
              <form>
                <input
                  type="email"
                  placeholder="Enter register Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img src="" alt="" />
              </form>
              <span>
                <strong>Don't recieve the OPT ? </strong>
                <span>RESEND OTP</span>
              </span>
              <button
                className={Btn_loader ? "otpVerify load" : "otpVerify"}
                onClick={SendEmail}
              >
                {Btn_loader === "email" && <span className="loader"></span>}
                Send OTP
              </button>
            </div>
          )}
          {forgotpwd == "otp" && (
            <div className="checkput__form ">
              <h1>OTP Verification</h1>
              <span>
                Enter the OTP send to{" "}
                <strong>{sessionStorage.getItem("forgotEmail")}</strong>
              </span>
              <div className="opt-form">
                <OTPInput
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                />
              </div>
              <span>
                <strong>Don't recieve the OPT ? </strong>
                <span>RESEND OTP</span>
              </span>
              <button
                className={Btn_loader ? "otpVerify load" : "otpVerify"}
                onClick={FPWDVerify}
              >
                Verify
                {Btn_loader === "otp" && <span className="loader"></span>}
              </button>
            </div>
          )}
          {forgotpwd == "cpwd" && (
            <div className="checkput__form ">
              <h1>Create new password</h1>

              <div className="opt-form">
                <form>
                  <label htmlFor="fpwd">Password</label>
                  <input
                    type="password"
                    id="fpwd"
                    placeholder="Enter register Email"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="fpwd"> Conform Password</label>
                  <input
                    type="password"
                    id="cfpwd"
                    placeholder="Enter register Email"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </form>
              </div>
              <button
                className={Btn_loader ? "otpVerify load" : "otpVerify"}
                onClick={changePassword}
              >
                {Btn_loader === "pwd" && <span className="loader"></span>}
                Confirm Change
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ForgotPassword;
