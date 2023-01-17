import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import "../style/order.css";
import "../style/header.css";
import logo from "../icons/logo.svg";
import Profile from "../icons/Profile.png";
import rupeeB from "../icons/rupeeB.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserRequests from "../Requests/UserRequests";
import { UserOrderAction } from "../Redux/Actions/Actions";
import { toast } from "react-toastify";
const Order = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.User?.user);
  const userOrder = useSelector((state) => state?.User?.userOrders);
  useEffect(() => {
    axios
      .get(UserRequests.GET_ORDER + user?._id)
      .then((res) => {
        dispatch(UserOrderAction(res.data));
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);
  const a = 1;
  const arr = [a, a, a, a, a, a, a, a];

  return (
    <>
      <section className="order">
        <div className="navbar order_nav">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <Link to={"/"}></Link>
          <div className="nav_right">
            <img className="order_profile" src={Profile} alt="" />
          </div>
        </div>
        <section className="order_body">
          <section className="order_header">
            <h2>Order History</h2>
            <div className="order_filter">
              <span>Current Order </span>
              <span>Cancel Order </span>
            </div>
          </section>
          <section className="current_order">
            <span>Current Order</span>
            {arr.map((item, i) => {
              return (
                <div key={i} className="order_card">
                  <img src={Profile} />
                  <div className="card_right">
                    <div className="ll">
                      <span>
                        Patel Panner Shop{" "}
                        <strong style={{ color: "#F70A0A" }}>3 Item</strong>{" "}
                      </span>{" "}
                      <span style={{ color: "#4870FD" }}>Processing</span>
                    </div>
                    <div className="lr">
                      <span>
                        <img src={rupeeB} alt="p" /> 555
                      </span>
                      <span style={{ color: "#F70A0A", cursor: "pointer" }}>
                        View Order
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          <section className="past_order">
            <span>Past Order</span>
            {arr.map((item, i) => {
              const today = new Date();
              return (
                <div key={i} className="order_card">
                  <img src={Profile} />
                  <div className="card_right">
                    <div className="ll">
                      <span>
                        Patel Pannerlore3 ersdl sadksa ldkas;d Shop{" "}
                        <strong style={{ color: "#F70A0A" }}>3 Item</strong>{" "}
                      </span>{" "}
                      <span style={{ color: "#1ED700E5" }}>
                        Delivered
                        <span style={{ color: "black", opacity: 0.5 }}>
                          {" "}
                          {today.toLocaleDateString() +
                            " " +
                            today.toLocaleTimeString()}
                        </span>{" "}
                      </span>
                      <span style={{ color: "#4870FD" }}>Rate your Order</span>
                    </div>
                    <div className="lr">
                      <span>
                        <img src={rupeeB} alt="p" /> 555
                      </span>
                      <span style={{ color: "#F70A0A", cursor: "pointer" }}>
                        View Order
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default Order;
