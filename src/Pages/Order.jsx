import React, { useEffect, useRef } from "react";
import "../style/order.css";
import "../style/header.css";
import rupeeB from "../icons/rupeeB.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserRequests from "../Requests/UserRequests";
import { CartToggleAction, InvoiceAction, UserOrderAction } from "../Redux/Actions/Actions";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Rating from "../Components/Rating";
import { useState } from "react";
import SidebarCart from "../Components/SidebarCart";
import { Link } from "react-router-dom";
function useOutsideAlerter(ref) {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(CartToggleAction(false));

      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
const Order = () => {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState([])
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const user = useSelector((state) => state?.User?.user);
  const userOrder = useSelector((state) => state?.User?.userOrders) || [];
  const Products = useSelector((state) => state.Products?.Products) || [];
  const seller = useSelector((state) => state?.Products?.all_seller);
  useEffect(() => {
    if (user?._id) {
      axios
        .get(UserRequests.GET_ORDER + user?._id)

        .then((res) => {
          if (res?.data?.message) {

            toast.error(res?.data?.message);

          }
          else {
            dispatch(UserOrderAction(res?.data))
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [user]);

  const currentOrder =
    userOrder && order?.filter((item) => item?.orderDelivered === false);
  const oldOrder =
    userOrder && order?.filter((item) => item?.orderDelivered === true);


  const findSeller = (productId) => {
    let s = Products.findIndex(ele => productId === ele?._id)
    return s >= 0 ? Products[s]?.sellerID : null
  }
  useEffect(() => {
    console.log(userOrder);
    const order = userOrder?.map(item => {
      let sellerId = findSeller(item?.product[0]?.productId)
      const i = seller?.findIndex(ele => ele?.seller?._id === sellerId)
      return { ...item, seller: seller[i]?.seller }
    })
    setOrder(order)
  }, [userOrder])
  const cart = useRef(null)
  useOutsideAlerter(cart)
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
                          UserRequests.SELLER_IMG +
                          item.seller?.sellerImage
                        }
                      />
                      <div className="card_right">
                        <div className="ll">
                          <span>
                            {item?.seller?.sellerName}
                            <strong style={{ color: "#F70A0A", marginLeft: ".5rem" }}>
                              {item?.product?.length} Item
                            </strong>{" "}
                          </span>{" "}
                          <span

                            style={{ color: "#4870FD" }}
                          >
                            Proccessing
                          </span>
                        </div>
                        <div className="lr">
                          <span>
                            <img src={rupeeB} alt="p" />{" "}
                            {Math.round(item?.price.reduce((sum, i) => sum + i))}
                          </span>
                          
                          <Link onClick={()=>dispatch(InvoiceAction(item))} to={"/invoice"}><span style={{ color: "#F70A0A", cursor: "pointer" }}>
                            View Order
                          </span></Link>
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
                          UserRequests.SELLER_IMG +
                          item.seller?.sellerImage
                        }
                      />
                      <div className="card_right">
                        <div className="ll">
                          <span>

                            {item?.seller?.sellerName}
                            <strong style={{ color: "#F70A0A", margin: "0 .5rem" }}>
                              {item?.product?.length}
                              <span> Items</span>
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
                            {Math.round(item?.price.reduce((sum, i) => sum + i))}
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
      <div ref={cart} className={!CartToggle ? "homecart homecartactive" : "homecart"}>
        <SidebarCart />
      </div>
    </>
  );
};

export default Order;
