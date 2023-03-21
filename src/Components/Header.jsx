import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "../style/header.css";
import "../style/SignUpSignInBtn.css";
import { Link } from "react-scroll";
import { Link as Route, useNavigate } from "react-router-dom";
import hamburgerI from "../icons/hamburger.png";
import close from "../icons/close.png";
import bag from "../icons/shopping-bag.png";
import profileh from "../icons/profile-h.png";
import logout from "../icons/logout.png";
import logo from "../icons/logo.png";
import profile from "../icons/Profile.png";
import cartIcon from "../icons/cartIcon.svg";
import { useDispatch } from "react-redux";
import SignUpDialog from "../Components/SignUpDialog";
import {
  SignUpDialogAction,
  SignUpBtnAction,
  UserAction,
  CartToggleAction,
  SearchQueryAction,
  SellerAction,
} from "../Redux/Actions/Actions";
import ForgotPassword from "./ForgotPassword";
function useOutsideAlerter(ref, setNavUser, navEle) {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if ((navEle.current && !navEle.current.contains(event.target))) {
          setNavUser(true);
        }
        dispatch(SearchQueryAction(""));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Header = ({ reference }) => {
  const wrapperRef = useRef(null);
  const [hamburger, setHamburger] = useState(true);
  const [navUser, setNavUser] = useState(true);
  const [quantity, setQuantity] = useState();
  const navigate = useNavigate();
  const picture = useSelector((state) => state?.User?.picture);
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const forgotpwd = useSelector((state) => state?.Toggle?.ForgotPWD);
  const dark = useSelector((state) => state?.Toggle?.Dark_Toggle);
  const SignUpPopUp = useSelector((state) => state?.Toggle?.SignUpDialog);
  const Products = useSelector((state) => state.Products?.Products) || [];
  const query = useSelector((state) => state.Products?.query);
  const SignUpBtn = useSelector((state) => state?.Toggle?.SignUpBtn);
  const user = useSelector((state) => state?.User?.user);
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const seller = useSelector((state) => state?.Products?.all_seller);
  const userLocalCart =
    useSelector((state) => state?.User?.userLocalCart) || [];
  const dispatch = useDispatch();
  const Logout = () => {
    localStorage.removeItem("id");
    dispatch(UserAction(null));
    setHamburger(true);
  };
  const filteredData = Products.filter((item) => {
    return (
      item?.description?.toLowerCase().includes(query.toLowerCase()) ||
      item?.category?.toLowerCase().includes(query) ||
      item?.productName.includes(query)
    );
  });
  useEffect(() => {
    if (user) {
      let quan = 0;
      userCart.map((item) => {
        if (!item?.productId?.disabled) {
          quan += item?.quantity;
        }
      });
      setQuantity(quan);
    }
  }, [userCart]);

  useEffect(() => {
    if (!user) {
      let quan = 0;
      userLocalCart.map((item) => {
        quan += item?.quantity;
      });
      setQuantity(quan);
    }
  }, [userLocalCart]);
  const NavigateProduct = (item) => {
    seller.forEach((element) => {
      if (element?.seller?._id === item?.sellerID) {
        dispatch(SellerAction(element));
        if (element?.seller?.categoryId?.category === "Street Food") {
          navigate("/food");

        } else {
          navigate("/product");

        };
      }
    });
    dispatch(SearchQueryAction(""));
  };

  useEffect(() => {
    if (!hamburger) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'unset'
    }
  }, [hamburger])

  // const ham = document.getElementById("hamburger1");

  // function OnDrag() { }
  // ham.addEventListener("mousedown", () => {
  //   ham.addEventListener("mousemove", ({ movementX, movementY }) => {
  //     let style = window.getComputedStyle(ham)
  //     let left = parseInt(style.left);
  //     let top = parseInt(style.top);
  //     ham.style.left = `${left + movementX}px`
  //     ham.style.top = `${top + movementY}px`
  //   })
  // })

  const navuser = useRef(null)
  useOutsideAlerter(wrapperRef, setNavUser, navuser);
  return (
    <>
      {SignUpPopUp && <SignUpDialog />}
      {forgotpwd && <ForgotPassword />}
      <nav className="navbar">
        <div className="nav_left">
          <div
            className="hamburger">

            {hamburger && <img
              onClick={() => setHamburger(!hamburger)}
              className=""
              src={hamburgerI}
            />}
            <div

              id="hamburger1"
              className={
                hamburger
                  ? "hamburger__list activeHamburger"
                  : "hamburger__list"
              }
            >
              <a onClick={() => setHamburger(!hamburger)}>
                <img src={close} className="hamburgerClose" />
              </a>
              <a> <span>Hi </span>
                {user ? (
                  user?.username?.toUpperCase()
                ) : (
                  <>
                    <span
                      onClick={() => {
                        dispatch(SignUpDialogAction(true));
                        setHamburger(true);
                      }}
                    >
                      SignIn/SignUp
                    </span>
                  </>
                )}
              </a>

              {user && <>
                <Route to="/profile" >
                  <span className="hamburger-logo">
                    <img src={profileh} alt="" />
                    <span>Profile</span>
                  </span></Route>
                <Route to="/order"  >
                  <span className="hamburger-logo">
                    <img src={bag} alt="" />
                    <span>Order</span>
                  </span></Route>

              </>}
              <hr />
              <div className="hamburger-privacy-policy">
                <Route to="/contact">Contact Us</Route>
                <Route to="/about-us">About Us</Route>
                <Route to="/privacy">Privacy & Policy</Route>
                <Route to="./docs/termandcondition.pdf" download target={"_blank"}> Terms & Conditions</Route>
                <Route to="./docs/refundpolicy.pdf" download target={"_blank"}> Return & Refund Policy</Route>
                <Route to={"./docs/deliverypolicy.pdf"} download target={"_blank"}>Shipping & Delivery Policy</Route>
              </div>
              <hr />
              {user && <a onClick={Logout}>
                <span className="hamburger-logo">
                  <img src={logout} alt="" />
                  <span>Logout</span>
                </span></a>}
            </div>
          </div>
          <Route to={"/"}>
            {" "}
            <img className="main-logo" src={logo} alt="" />
          </Route>
        </div>
        <div className="nav_center">
          <input
            type="text"
            placeholder="Search Product..."
            onChange={(e) =>
              dispatch(SearchQueryAction(e.target.value.toLowerCase()))
            }
          />
          {query.length > 0 ? (
            <div ref={wrapperRef} className="searchCard">
              <span>Your Search result</span>
              <ul>
                {filteredData.length < 1 && <li>Yorr Search Does not match</li>}
                {filteredData
                  .map((item, i) => {
                    return (
                      <li
                        key={i}
                        onClick={(e) => dispatch(SearchQueryAction(""))}
                      >
                        <Link
                          activeClass="active"
                          spy={true}
                          smooth={true}
                          offset={-160}
                          duration={300}
                          to={item?.categoryId?._id}
                          key={item}
                        >
                          {" "}
                          <span
                            style={{ width: "100%", display: "inline-block" }}
                            onClick={() => NavigateProduct(item)}
                          >
                            {item.productName}
                          </span>{" "}
                        </Link>
                      </li>
                    );
                  })
                  .slice(0, 10)}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        <div ref={wrapperRef} className="nav_right">
          {user ? (
            <div className="userAfterLogin">
              <div
                ref={navuser}
                onClick={() => setNavUser(!navUser)}
                className="login_logout flex"
              >
                <span>{user?.username?.split(" ")[0].toUpperCase()}</span>
                <img src={picture ? picture : profile} width="30px" alt="" />
              </div>
              <div className={navUser ? "navUser hide" : "navUser"}>
                <ul>
                  <li>
                    <Route to="/order" onClick={() => sessionStorage.setItem('location', '/order')}>Order</Route>
                  </li>
                  <li>
                    <Route to="/profile" onClick={() => sessionStorage.setItem('location', '/profile')}>Profile</Route>
                  </li>

                  <li onClick={Logout}>Log Out</li>
                  {user?.type === "Admin" && (
                    <li>
                      <Route to="/profile">Admin Dashboard</Route>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            !SignUpPopUp && (
              <div
                onClick={() => dispatch(SignUpDialogAction(true))}
                className="login_logout"
              >
                <button
                  onClick={() => dispatch(SignUpBtnAction(true))}
                  className={!SignUpBtn ? "login " : "login loginActive"}
                >
                  Sign In
                </button>
                <button
                  onClick={() => dispatch(SignUpBtnAction(false))}
                  className={!SignUpBtn ? "logout loginActive" : "logout "}
                >
                  Sign Up
                </button>
              </div>
            )
          )}

          {<div ref={reference}
            onClick={() => {
              dispatch(CartToggleAction(!CartToggle));
            }}
            className="cartBtn"
          >
            <img src={cartIcon} />
            <strong>{quantity}</strong>
          </div>}
        </div>
      </nav>
      <div className={dark ? "dartback" : ""}></div>
    </>
  );
};

export default Header;
