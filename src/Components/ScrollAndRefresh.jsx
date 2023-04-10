
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ScrollAndRefresh = () => {
  const { SignUpDialog, CategoryPopUp, ForgotPWD, Otp_Toggle, CartToggle, EditInfo, } = useSelector((state) => state?.Toggle);
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = sessionStorage.getItem('location');
  const bool = CategoryPopUp || SignUpDialog || Otp_Toggle || ForgotPWD || CartToggle
  useEffect(() => {
    if (bool) {
      // document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'unset'
    }
  }, [bool])
  useEffect(() => {
    window.scrollTo(0, 0);
    // sessionStorage.setItem('location', location.pathname);

  }, [location]);


}
export default ScrollAndRefresh;