import React from "react";
import { useSelector } from "react-redux";
import "../Styles/order.css";
const OrderDetail = () => {
  const order = useSelector((state) => state?.Utils?.OrderDetails);
  return (
    <>
      <section className="order_detail">
        <table>
          <tbody>
            <tr >
              <td>Name</td>
              <td>{order?.userId?.username}</td>
            </tr>
            <tr>
              <td>Order Id</td>
              <td>{order?.orderId}</td>
            </tr>
            <tr>
              <td>Order Date</td>
              <td>{order?.date}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{order?.block} {order?.room}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>{order?.userId?.phoneNumber}</td>
            </tr>
            <tr>
              <td>Ground Floor</td>
              <td>Selected </td>
            </tr>
            <tr>
              <td>Product Name</td>
              <td>{order?.productId?.productName}</td>
            </tr>
            <tr>
              <td>Product Price</td>
              <td>{order?.productId?.price}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <select name="Order_status" id="">
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default OrderDetail;
