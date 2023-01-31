import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import offer from "../icons/offer.png";
import UserRequests from "../Requests/UserRequests";
import "../style/homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { DeliveryRateAction, SellerAction, SellerDetailAction } from "../Redux/Actions/Actions";
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
  const dispatch = useDispatch();
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const seller = useSelector((state) => state?.Products?.seller);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(UserRequests.SELLER)
      .then((res) => {
        dispatch(SellerAction(res.data));
      })
      .catch((err) => {
        toast.error("Something Went wrong");
      });

    axios.get(UserRequests.DELIVERY_RATE)
      .then((response) => {        
          dispatch(DeliveryRateAction(response.data?.rate));
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const categorySorting = (category) => {
    let start = 0;
    for (let i = 0; i < seller?.length; i++) {
      if (seller[i].category === category) {
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
      ?.filter((i) => i?.category !== undefined || null)
      .map((i) => set.add(i.category));
    setCategory(Array.from(set));
  }, []);

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
                  {i.split(" ").map((i) => i.charAt(0))}
                </strong>
              </span>
            ))}
          </div>
          <div className="hp_shop">
            <h2 className="down_border">Local Shops</h2>
            <section className="hp_seller">
              {seller &&
                seller
                  .filter((items) => items?.category != null)
                  .map((item, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() =>
                          dispatch(
                            SellerDetailAction({
                              name: item?.sellerName,
                              photo: UserRequests.SELLER_IMG + item.sellerImage,
                            })
                          )
                        }
                        className="seller_card"
                      >
                        <div className="seller_img">
                          {item?.category === "Food" ? (
                            <Link to={"/food"}>
                              <img
                                src={UserRequests.SELLER_IMG + item.sellerImage}
                                alt=""
                              />
                            </Link>
                          ) : (
                            <>
                              <Link to={"/product"}>
                                <img
                                  src={
                                    UserRequests.SELLER_IMG + item.sellerImage
                                  }
                                  alt=""
                                />
                              </Link>
                            </>
                          )}
                          <span>
                            {item.category.split(" ").map((i) => i.charAt(0))}
                          </span>
                        </div>
                        <div className="hp_seller_detail">
                          <span>{item?.sellerName}</span>
                          <span>
                            4.5<span>&#9733;</span>(465)
                          </span>
                        </div>
                      </div>
                    );
                  })}
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
