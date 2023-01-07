import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminOptionAction, OrderDeliveredAction, OrderDetailsAction, OrdersAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";
import "../Styles/order.css";
const Order = () => {
  const orders = useSelector((state) => state?.Utils?.Orders) || [];
  const dispatch = useDispatch();
  const ShowOrderDetails = (response) => {
    dispatch(AdminOptionAction('orders-detail'));
    dispatch(OrderDetailsAction(response));
  }
  const DeliveredOrder = (response) => {
    axios.post(AdminRequest.ORDER_DELIVERED + response)
      .then((response) => {
        axios.get(AdminRequest.GET_ALL_ORDERS)
          .then((response) => {
            let orderDelivered = response.data?.filter((item) => item?.orderDelivered == true);
            let orderPending = response.data?.filter((item) => item?.orderDelivered == false);
            dispatch(OrderDeliveredAction(orderDelivered));
            dispatch(OrdersAction(orderPending));
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <section className="prod_order">
        <div className="total_order_detail">
          <div className="order_card">
            <span>Total Order</span>
            <strong>{orders.length}</strong>
          </div>
          <div className="order_card">
            <span>Pending Orders</span>
            <strong>{orders.filter((item) => item?.orderDelivered == false).length}</strong>
          </div>
          <div className="order_card">
            <span>Delivered Orders</span>
            <strong>{orders.filter((item) => item?.orderDelivered == true).length}</strong>
          </div>
        </div>
        <div className="order_filter">
          <span>Total Order</span>
          <span>Pending Order</span>
          <span>Deliverd Order</span>
          <span>Canceled Order</span>
        </div>
        <div className="order_table">
          <table>
            <thead>
              <tr>
                <td>Order Id </td>
                <td>Order Date</td>
                <td>Product Name</td>
                <td>Product Price</td>
                <td>Address</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((item) => {
                  return <>
                    <tr>
                      <td onClick={() => ShowOrderDetails(item)}>{item?.orderId}</td>
                      <td>{item?.date}</td>
                      <td>{item?.productId?.productName}</td>
                      <td>{(item?.productId?.price) * (item?.quantity)}</td>
                      <td>{item?.block}  {item?.room}</td>
                      <td>
                        {
                          item?.orderDelivered
                            ?
                            <span className="delivered">Delivered</span>
                            :
                            <span className="processing" style={{ cursor: 'pointer' }} onClick={() => DeliveredOrder(item?.orderId)}>Pending</span>
                        }
                      </td>
                    </tr>
                  </>
                })
              }
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Order;
