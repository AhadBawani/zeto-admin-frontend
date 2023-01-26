import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import dmart from "../icons/dmart.png";
import offer from "../icons/offer.png";
import UserRequests from "../Requests/UserRequests";
import "../style/homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { SellerAction } from "../Redux/Actions/Actions";
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
  const seller = useSelector((state) => state?.Products?.seller);
  useEffect(() => {
    axios
      .get(UserRequests.SELLER)
      .then((res) => {
        dispatch(SellerAction(res.data));
      })
      .catch((err) => {
        toast.error("Something Went wrong");
      });
  }, []);
  document.title = "Zetomart | Home";
  return (
    <>
      <section className="hp">
        <Header />

        <section className="hp_home">
          <div className="hp_category">
            <span>
              Grocery{" "}
              <strong style={{ color: randomColor("Grocery") }}>G</strong>
            </span>
            <span>
              Street Food{" "}
              <strong style={{ color: randomColor("Street Food") }}>SF</strong>
            </span>
            <span>
              Stationary <strong style={{ color: randomColor() }}> S</strong>
            </span>
          </div>
          <div className="hp_shop">
            <h2 className="down_border">Local Shops</h2>
            <section className="hp_seller">
              {seller &&
                seller.map((item, i) => {
                  return (
                    <div key={i} className="seller_card">
                      <div className="seller_img">
                        <Link to={"/product"}>
                          <img
                            src={UserRequests.SELLER_IMG + item.sellerImage}
                            alt=""
                          />
                        </Link>

                        <span>SF</span>
                      </div>
                      <div className="hp_seller_detail">
                        <span>D-mart</span>
                        <span>
                          4.5<span>&#9733;</span>(465)
                        </span>
                      </div>
                    </div>
                  );
                })}

              <div className="seller_card">
                <div className="seller_img">
                  <Link to={"/food"}>
                    <img src={offer} alt="" />
                  </Link>
                  <span>G</span>
                </div>
                <div className="hp_seller_detail">
                  <span>D-mart</span>
                  <span>
                    4.5<span>&#9733;</span>(465)
                  </span>
                </div>
              </div>
              <div className="seller_card">
                <div className="seller_img">
                  <img src={dmart} alt="" />
                  <span>G</span>
                </div>
                <div className="hp_seller_detail">
                  <span>D-mart</span>
                  <span>
                    4.5<span>&#9733;</span>(465)
                  </span>
                </div>
              </div>
              <div className="seller_card">
                <div className="seller_img">
                  <img src={dmart} alt="" />
                  <span>G</span>
                </div>
                <div className="hp_seller_detail">
                  <span>D-mart</span>
                  <span>
                    4.5<span>&#9733;</span>(465)
                  </span>
                </div>
              </div>
              <div className="seller_card">
                <div className="seller_img">
                  <img src={dmart} alt="" />
                  <span>G</span>
                </div>
                <div className="hp_seller_detail">
                  <span>D-mart</span>
                  <span>
                    4.5<span>&#9733;</span>(465)
                  </span>
                </div>
              </div>
            </section>
            <h2 className="down_border">Offers</h2>
            <section className="offerCard">
              <img src={offer} alt="" />
              <img src={offer} alt="" />
            </section>
          </div>
          <Footer />
        </section>
      </section>
    </>
  );
};

export default Home;
