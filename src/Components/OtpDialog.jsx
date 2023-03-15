import React, { useState } from "react";
import UserRequests from "../Requests/UserRequests";
import close from "../icons/close.png";
import axios from "axios";
import OTPInput from "otp-input-react";
import { DarkAction, OtpAction } from "../Redux/Actions/Actions";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const OtpDialog = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const userEmail = useSelector((state) => state?.User?.userEmail);
  const [OTP, setOTP] = useState("");
  const OtpVerify = () => {
    useEffect(() => {
      dispatch(DarkAction(true));
    }, []);
    let obj = {
      email: userEmail,
      otp: OTP,
    };
    axios
      .post(UserRequests.VERIFY_OTP, obj)
      .then((res) => {
        console.log(res);
        dispatch(OtpAction(false));
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid OTP");
      });
  };
  return (
    <>
      <section className="signInMdel otp">
        <div className="checkput__form ">
          <h1>OTP Verification</h1>
          <span>
            Enter the OTP send to <strong>{userEmail}</strong>
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
          <button className="otpVerify" onClick={OtpVerify}>
            Verify
          </button>
        </div>
      </section>
    </>
  );
};

export default OtpDialog;
