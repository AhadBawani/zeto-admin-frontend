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
  const [order, setOrder] = useState([])
  const user = useSelector((state) => state?.User?.user);
  const userOrder = useSelector((state) => state?.User?.userOrders) || [];
  const Products = useSelector((state) => state.Products?.Products) || [];
  const seller = useSelector((state) => state?.Products?.all_seller);

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
    userOrder && order?.filter((item) => item?.orderDelivered === false);
  const oldOrder =
    userOrder && order?.filter((item) => item?.orderDelivered === true);


  const GeneratePDF = (order) => {
    // /Orders/Generatepdf/:orderId/:userId
    axios.get(UserRequests.GENERATE_PDF + order?.orderId + "/" + user?._id).then(res => {
      console.log(res)
    })
      .catch(err => {
        console.log(err);
      })
  }
  const findSeller = (productId) => {
    let s = Products.findIndex(ele => productId === ele?._id)
    return s >= 0 ? Products[s]?.sellerID : null
  }
  useEffect(() => {

    const order = userOrder?.map(item => {
      let sellerId = findSeller(item?.product[0]?.productId)
      const i = seller?.findIndex(ele => ele?.seller?._id === sellerId)
      return { ...item, seller: seller[i]?.seller }
    })
    setOrder(order)
  }, [userOrder])
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
                          <span onClick={() => GeneratePDF(item)} style={{ color: "#F70A0A", cursor: "pointer" }}>
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
                          UserRequests.SELLER_IMG +
                          item.seller?.sellerImage
                        }
                      />
                      <div className="card_right">
                        <div className="ll">
                          <span>

                            {item?.seller?.sellerName}
                            <strong style={{ color: "#F70A0A", margin: "0 .5rem" }}>
                              {item?.product?.length } 
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
    </>
  );
};

export default Order;
