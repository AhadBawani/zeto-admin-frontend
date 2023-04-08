import React from 'react'
import "../style/orderSuccess.css"
import success from "../icons/orderSuccess.png"
import Header from './Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { DarkAction } from '../Redux/Actions/Actions'

const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(DarkAction(false));
  })
  const orderid = useSelector(state=>state?.User?.orderId)
  return (
    <>
    <section className="order_page">
   
      <Header />
        <div className="order_success">
            <span>Notice : Delivery between 7 to 9 pm </span>
            <h1>Your Order has been received</h1>
            <img src={success} alt="" />
            <h2>Thnak You for your purchase</h2>
            <h4>Your Order Id : <span>{orderid}</span></h4>
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
