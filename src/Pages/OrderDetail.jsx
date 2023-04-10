import React from 'react'
import "../style/orderDetail.css"
import Header from '../Components/Header'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import UserRequests from '../Requests/UserRequests'
const OrderDetail = () => {
  const [deliveryfee, setDeliveryfee] = useState("X")
  const { invoice, user } = useSelector(state => state?.User) || []
  useEffect(() => {
    axios.get(UserRequests.DELIVERY_RATE)
      .then(res => {
        setDeliveryfee(res?.data?.rate)
      })
      .catch(err => {
      })
  }, [])
  // const Print = () => {
  //   let printContents = document.getElementById('printablediv').innerHTML;
  //   let originalContents = document.body.innerHTML;
  //   document.title = "Order Invoice"
  //   document.body.innerHTML = printContents;
  //   let er = window.print();
  //   document.body.innerHTML = originalContents;
  //   return false

  document.title = "Zetomart | Invoice"
  return (
    <>
      <section className="order-detail">
        <Header />
        <section id='printablediv' className="o-detail">
          <h1>Invoice</h1>
          <div className="user">
            <h1>Shop Name : {invoice?.seller?.sellerName}</h1>
            <div className="user-detail">
              <div className="u-d-left">
                <ul>
                  <li>
                    <strong>orderId : </strong>
                    <span>{invoice?.orderId}</span>
                  </li>
                  <li>
                    <strong>order date : </strong>
                    <span>{invoice?.date}</span>
                  </li>
                  <li>
                    <strong>invoice date : </strong>
                    <span>{invoice?.date}</span>
                  </li>
                  <li>
                    <strong>mail Id : </strong>
                    <span>{user?.email}</span>
                  </li>
                  <li>
                    <strong>mobile no : </strong>
                    <span>{user?.phoneNumber}</span>
                  </li>
                </ul>
                <strong>
                  Total item {Math.round(invoice?.quantity.reduce((a, b) => a + b))}
                </strong>
              </div>
              <div className="u-d-center">
                <ul>
                  <li><strong>Bill to : </strong></li>
                  <li><span>{user?.username}</span></li>
                  <li><span>marwadi university <br />Rajkot,gujarat</span></li>
                  <li></li>
                </ul>
              </div>
              <div className="u-d-right">
                <span><strong>Invoice no :</strong> {invoice?.invoice}</span>
              </div>
            </div>
          </div>
          <div className="o-product">

            <div className='o-product-list'>
              <div><strong>product name</strong></div>
              <div><strong>qty</strong></div>
              <div><strong>Amount</strong></div>
              <div><strong>Discount</strong></div>
              <div><strong>Total value</strong></div>
            </div>
            {
              invoice?.product?.map((ele, i) => {
                return <>
                  <div className='o-product-list o-product-list2'>
                    <div ><span>{ele?.productName}</span></div>
                    <div><span>{invoice.quantity[i]}</span></div>
                    <div><span>{ele?.mrp * invoice.quantity[i]}</span></div>
                    <div><span>{Math.round(ele?.mrp - invoice?.price[i]) * invoice.quantity[i]}</span></div>
                    <div><span>{Math.round(invoice?.price[i]) * invoice.quantity[i]}</span></div>
                  </div>
                </>
              })
            }
            <div className='o-product-list'>
              <div><strong>Delivery Fee</strong></div>
              <div></div>
              <div></div>
              <div></div>
              <div><strong>{deliveryfee}</strong></div>

            </div>
            <div className='o-product-list'>
              <div></div>
              <div></div>
              <div><strong>{Math.round(invoice?.product?.map((ele, i) => (ele?.mrp * invoice?.quantity[i])).reduce((a, b) => a + b))}</strong></div>
              <div><strong>{Math.round((invoice?.product?.map((ele, i) => (ele?.mrp * invoice?.quantity[i])).reduce((a, b) => a + b)) - (invoice?.price?.map((ele, i) => (ele * invoice?.quantity[i]))?.reduce((a, b) => a + b)))}</strong></div>
              <div><strong>{Math.round((invoice?.price?.map((ele, i) => (ele * invoice?.quantity[i]))?.reduce((a, b) => a + b))) + deliveryfee}</strong></div>
            </div>


          </div>
          <div className="total">
            {/* <button id='printBtn'>Print</button> */}
            <button onClick={() => window.print()}>Print</button>
            <strong>Grand Total : {Math.round((invoice?.price?.map((ele, i) => (ele * invoice?.quantity[i]))?.reduce((a, b) => a + b))) + deliveryfee}</strong>
          </div>
        </section>
      </section>
    </>
  )
}

export default OrderDetail