import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminOptionAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";

const Shopkeeper = () => {
    const seller = useSelector((state) => state?.Utils?.Seller) || [];
    const Products = useSelector((state) => state?.Utils?.Products) || [];
    const dispatch = useDispatch();
    return (
        <>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'end', marginRight: '3rem', marginBottom: '2rem' }}>
                <input
                    style={{ background: "red", color: "white" }}
                    type="submit"
                    value="Add Seller"
                    onClick={() => dispatch(AdminOptionAction('add-shopkeeper'))}
                />
            </div>
            <div className="order_table">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Seller Name</td>
                            <td>Seller Image</td>
                            <td>Date</td>
                            <td>Total Product</td>
                        </tr>
                    </thead>
                    <tbody>
                        {seller &&
                            seller.map((item) => {
                                return (
                                    <tr>
                                        <td>{item?._id}</td>
                                        <td>{item?.sellerName}</td>
                                        <td>
                                            <img style={{ height:'70px', width: '70px' }} src={AdminRequest.GET_SELLER_IMAGES + item?.sellerImage} alt="" />
                                        </td>
                                        <td>{item?.date}</td>                                        
                                        <td>{Products.filter((product) => product?.sellerName === item?.sellerName).length}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Shopkeeper;