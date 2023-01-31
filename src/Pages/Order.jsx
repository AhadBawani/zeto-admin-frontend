import React, { useEffect } from "react";
import "../style/order.css";
import "../style/header.css";
import rupeeB from "../icons/rupeeB.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserRequests from "../Requests/UserRequests";
import { UserOrderAction } from "../Redux/Actions/Actions";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Rating from "../Components/Rating";
import { useState } from "react";
const Order = () => {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);
  const user = useSelector((state) => state?.User?.user);
  const userOrder = useSelector((state) => state?.User?.userOrders) || [];
  useEffect(() => {
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
        <Header />
        <Rating orderId={orderId} setOrderId={setOrderId} />
        <section className="order_body">
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
                          <span
                            
                            style={{ color: "#4870FD" }}
                          >
                            {item?.orderReview ? (
                              <>
                                <span>Item Rated</span>
                              </>
                            ) : (
                              <>
                                <span onClick={() => setOrderId(item?.orderId)}>Rate your Order</span>
                              </>
                            )}
                          </span>
                        </div>
                        <div className="lr">
                          <span>
                            <img src={rupeeB} alt="p" />{" "}
                            {Math.ceil(item?.productId?.price)}
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
                          <span
                            onClick={() => setOrderId(item?.orderId)}
                            style={{ color: "#4870FD" }}
                          >
                            {item?.orderReview
                              ? "Item Rated"
                              : "Rate this Order"}
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
