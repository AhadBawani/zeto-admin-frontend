import React from 'react'
import "../style/orderSuccess.css"
import success from "../icons/orderSuccess.png"
import Header from './Header'
import { Link } from 'react-router-dom'
import CheackoutHeader from './CheackoutHeader'
const OrderSuccess = () => {
  return (
    <>
    <section className="order_page">
   
      <CheackoutHeader/>
        <div className="order_success">
            <span>Notice : Delivery between 6 to 9 pm </span>
            <h1>Your Order has been received</h1>
            <img src={success} alt="" />
            <h2>Thnak You for your purchase</h2>
            <h4>Your Order Id : <span>{4646546546}</span></h4>
            <strong>we will Email your Order detail</strong>
          <Link to={"/"}>  <button>
                Continue Your Shopping
            </button></Link>
            </div>  
    </section>
    </>
  )
}

export default OrderSuccess
