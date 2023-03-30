import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import UserRequests from "../Requests/UserRequests";
import "../style/homepage.css";
import "../style/loading.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DarkAction,
  DeliveryRateAction,
  SellerAction,
  AllSellerAction,
  CartToggleAction,
} from "../Redux/Actions/Actions";
import SidebarCart from "../Components/SidebarCart";
import { useState } from "react";
function useOutsideAlerter(ref, header) {
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if ((header.current && !header.current.contains(event.target))) {

          dispatch(CartToggleAction(false));
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const seller = useSelector((state) => state?.Products?.all_seller);
  const currentLocation = sessionStorage.getItem("location");
  const [category, setCategory] = useState([]);
  useEffect(() => {
    dispatch(DarkAction(false));
    axios
      .get(UserRequests.DELIVERY_RATE)
      .then((response) => {
        dispatch(DeliveryRateAction(response.data?.rate));
      })
      .catch((error) => {
        toast.error("There is some technical issue");
      });

  }, [seller]);
  const categorySorting = (category) => {
    let start = 0;
    for (let i = 0; i < seller?.length; i++) {
      if (seller[i].seller?.categoryId?.category === category) {
        let temp = seller[start];
        seller[start] = seller[i];
        seller[i] = temp;
        start++;
      }
    }
    const myArr = [...seller];
    dispatch(AllSellerAction(myArr));
  };
  useEffect(() => {
    let set = new Set();
    seller
      ?.filter((i) => i?.seller?.categoryId !== undefined || null)
      .map((i) => set.add(i?.seller?.categoryId?.category));
    setCategory(Array.from(set).sort());

  }, [seller]);
  const NavigateUser = (data, action) => {
    localStorage.setItem("sellerData", JSON.stringify(data));
    dispatch(SellerAction(data));
    if (action === "review") {
      navigate("/review");

    } else if (action === "product") {
      navigate("/product");
    } else {
      navigate("/food");

    }
  };
  const cart = useRef(null)
  const header = useRef(null)
  useOutsideAlerter(cart, header)
  document.title = "Zetomart | Home";
  return (
    <>
      <section className="hp">
        <Header reference={header} header ={header}/>
        <section className="hp_home">
          <div className="hp_category">
            {category?.map((i) => (
              <span onClick={() => categorySorting(i)}>
                {i}
                <button className="category_badge">
                  {i?.split(" ")?.map((i) => i?.charAt(0))}
                </button>
              </span>
            ))}
          </div>
          <div className="hp_shop">
            <h2 className="down_border">Local Shops</h2>
            <section className="hp_seller">
              {seller ? (
                seller
                  .filter(
                    (items) => items?.seller?.categoryId?.category != null
                  )

                  ?.map((item, i) => {
                    return (
                      <div key={i} className="seller_card">
                        <div className="seller_img">
                          {item?.seller?.categoryId?.category === "Street Food" ? (
                            <Link
                              to={"/food"}

                            >
                              <img
                                onClick={() => NavigateUser(item, "food")}
                                src={
                                  UserRequests.SELLER_IMG +
                                  item?.seller?.sellerImage
                                }
                                alt=""
                              />
                            </Link>
                          ) : (
                            <>
                              <Link
                                to={"/product"}

                              >
                                <img
                                  onClick={() => NavigateUser(item, "product")}
                                  src={
                                    UserRequests.SELLER_IMG +
                                    item?.seller?.sellerImage
                                  }
                                  alt=""
                                />
                              </Link>
                            </>
                          )}
                        </div>
                        <div className="hp_seller_detail">
                          <span>
                            {item?.seller?.sellerName}{" "}
                            <strong>
                              (
                              {item?.seller?.categoryId?.category
                                ?.split(" ")
                                .map((i) => i.charAt(0))}
                              )
                            </strong>
                          </span>
                          <span onClick={() => NavigateUser(item, "review")}>
                            <strong>{item?.averageRating}</strong>
                            <span>&#9733;</span>
                            <strong> ({item?.review?.length})</strong>
                          </span>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <>
                  <div className="seller-skeleton skeleton"></div>
                  <div className="seller-skeleton skeleton"></div>
                  <div className="seller-skeleton skeleton"></div>
                  <div className="seller-skeleton skeleton"></div>
                  <div className="seller-skeleton skeleton"></div>
                  <div className="seller-skeleton skeleton"></div>
                </>
              )}
            </section>
          </div>
          <div ref={cart} className={!CartToggle ? "homecart homecartactive" : "homecart"}>
            <SidebarCart />
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
