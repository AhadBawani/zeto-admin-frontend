import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import dmart from "../icons/dmart.png";
import offer from "../icons/offer.png";
import "../style/homepage.css";
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
              <div className="seller_card">
                <div className="seller_img">
                  <Link to={"/product"}>
                    <img src={dmart} alt="" />
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
