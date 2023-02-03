import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import offer from "../icons/offer.png";
import UserRequests from "../Requests/UserRequests";
import "../style/homepage.css";
import "../style/loading.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DarkAction,
  DeliveryRateAction,
  ReviewAction,
  SellerAction,
  SellerDetailAction,
} from "../Redux/Actions/Actions";
import SidebarCart from "../Components/SidebarCart";
import { useState } from "react";
const randomColor = (cat) => {
  var ColorCode =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";
  return ColorCode.toString();
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const seller = useSelector((state) => state?.Products?.seller);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    dispatch(DarkAction(false));
    axios
      .get(UserRequests.SELLER)
      .then((res) => {
        console.log(res);
        dispatch(SellerAction(res.data));
      })
      .catch((err) => {
        toast.error("Something Went wrong");
      });

    axios
      .get(UserRequests.DELIVERY_RATE)
      .then((response) => {
        dispatch(DeliveryRateAction(response.data?.rate));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categorySorting = (category) => {
    let start = 0;
    for (let i = 0; i < seller?.length; i++) {
      if (seller[i].seller.category === category) {
        let temp = seller[start];
        seller[start] = seller[i];
        seller[i] = temp;
        start++;
      }
    }
    let myArr = [...seller];

    dispatch(SellerAction(myArr));
  };
  useEffect(() => {
    let set = new Set();
    seller
      ?.filter((i) => i?.seller.category !== undefined || null)
      .map((i) => set.add(i?.seller?.category));
    setCategory(Array.from(set));
  }, []);

  const SellerDetail = (seller) => {
    console.log(seller);
    localStorage.setItem("seller", JSON.stringify(seller));
    dispatch(SellerDetailAction(seller));
  };

  const SellerReview = (data) => {
    localStorage.setItem("review", JSON.stringify(data));
    dispatch(ReviewAction(data));
    navigate("/review");
  };
  document.title = "Zetomart | Home";
  return (
    <>
      <section className="hp">
        <Header />
        <section className="hp_home">
          <div className="hp_category">
            {category.map((i) => (
              <span onClick={() => categorySorting(i)}>
                {i}
                <strong style={{ color: randomColor("Grocery") }}>
                  {i?.split(" ").map((i) => i.charAt(0))}
                </strong>
              </span>
            ))}
          </div>
          <div className="hp_shop">
            <h2 className="down_border">Local Shops</h2>
            <section className="hp_seller">
              {seller ? (
                seller
                  .filter((items) => items?.seller?.category != null)

                  ?.map((item, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() =>
                          SellerDetail({
                            name: item?.seller?.sellerName,
                            photo:
                              UserRequests.SELLER_IMG +
                              item?.seller?.sellerImage,
                          })
                        }
                        className="seller_card"
                      >
                        <div className="seller_img">
                          {item?.seller?.category === "Food" ? (
                            <Link to={"/food"}>
                              <img
                                src={
                                  UserRequests.SELLER_IMG +
                                  item?.seller?.sellerImage
                                }
                                alt=""
                              />
                            </Link>
                          ) : (
                            <>
                              <Link to={"/product"}>
                                <img
                                  src={
                                    UserRequests.SELLER_IMG +
                                    item?.seller?.sellerImage
                                  }
                                  alt=""
                                />
                              </Link>
                            </>
                          )}
                          <span>
                            {item?.seller?.category
                              ?.split(" ")
                              .map((i) => i.charAt(0))}
                          </span>
                        </div>
                        <div className="hp_seller_detail">
                          <span>{item?.seller?.sellerName}</span>
                          <span onClick={() => SellerReview(item)}>
                            {item?.averageRating}
                            <span>&#9733;</span>
                            {item?.productCount}
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
            <h2 className="down_border">Offers</h2>
            <section className="offerCard">
              <img src={offer} alt="" />
              <img src={offer} alt="" />
            </section>
          </div>
          <div className={!CartToggle ? "homecart homecartactive" : "homecart"}>
            <SidebarCart />
          </div>
          <Footer />
        </section>
      </section>
    </>
  );
};

export default Home;
