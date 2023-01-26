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
  const userOrder = useSelector((state) => state?.User?.userOrders) || [];
  useEffect(() => {
    console.log(UserRequests.GET_ORDER + user?._id);
    if (user?._id) {
      axios
        .get(UserRequests.GET_ORDER + user?._id)
        .then((res) => {
          dispatch(UserOrderAction(res.data));
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [user]);

  const currentOrder =
    userOrder && userOrder?.filter((item) => item?.orderDelivered === false);
  const oldOrder =
    userOrder && userOrder?.filter((item) => item?.orderDelivered === true);

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
            {currentOrder.length > 0 ? (
              currentOrder?.map((item, i) => {
                return (
                  !item.orderDelivered && (
                    <div key={i} className="order_card">
                      <img
                        src={
                          UserRequests.PRODUCT_IMG +
                          item.productId?.productImage
                        }
                      />
                      <div className="card_right">
                        <div className="ll">
                          <span>
                            {item?.productId?.productName}
                            <strong style={{ color: "#F70A0A" }}>
                              {item?.quantity} Item
                            </strong>{" "}
                          </span>{" "}
                          <span style={{ color: "#4870FD" }}>Processing</span>
                        </div>
                        <div className="lr">
                          <span>
                            <img src={rupeeB} alt="p" />{" "}
                            {item?.productId?.price}
                          </span>
                          <span style={{ color: "#F70A0A", cursor: "pointer" }}>
                            View Order
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <>
                <h2>
                  {" "}
                  Ohh You do not buy anything yet. We Are wating for you!
                </h2>
              </>
            )}
          </section>
          <section className="past_order">
            <span>Past Order</span>
            {oldOrder.length > 0 ? (
              oldOrder?.map((item, i) => {
                return (
                  item.orderDelivered && (
                    <div key={i} className="order_card">
                      <img
                        src={
                          UserRequests.PRODUCT_IMG +
                          item.productId?.productImage
                        }
                      />
                      <div className="card_right">
                        <div className="ll">
                          <span>
                            {item?.productId?.productName}
                            <strong style={{ color: "#F70A0A" }}>
                              3 Item
                            </strong>{" "}
                          </span>{" "}
                          <span style={{ color: "#1ED700E5" }}>
                            Delivered
                            <span style={{ color: "black", opacity: 0.5 }}>
                              {" "}
                              {item?.date}
                            </span>{" "}
                          </span>
                          <span style={{ color: "#4870FD" }}>
                            {item?.paymentType}
                          </span>
                        </div>
                        <div className="lr">
                          <span>
                            <img src={rupeeB} alt="p" />{" "}
                            {item?.productId?.price}
                          </span>
                          <span style={{ color: "#F70A0A", cursor: "pointer" }}>
                            View Order
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <>
                <h2> We Are wating for you!</h2>
              </>
            )}
          </section>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default Order;
