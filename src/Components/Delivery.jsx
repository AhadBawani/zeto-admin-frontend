import React from 'react'
import { useSelector } from 'react-redux'

const Delivery = () => {
  const orderDelivered = useSelector((state) => state?.Utils?.OrderDelivered) || [];
  return (
    <>
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
              orderDelivered.map((item) => {
                return <>
                  <tr>
                    <td>{item?.orderId}</td>
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
                          <span className="processing" style={{ cursor: 'pointer' }}>Pending</span>
                      }
                    </td>
                  </tr>
                </>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Delivery