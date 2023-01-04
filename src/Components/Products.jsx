import React, { useState } from "react";
import test from "../Icons/test.png";
import search from "../Icons/search.png";
import "../Styles/adminProduct.css";
import { useDispatch, useSelector } from "react-redux";
import AdminRequest from "../Requests/AdminRequests";
import { AdminOptionAction, EditProductAction, ProductsAction } from "../Redux/Actions/Action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Products = () => {
  const [query, setquery] = useState("");
  const Products = useSelector((state) => state?.Utils?.Products) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredData = Products.filter((item) => {
    return (
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query) ||
      item.productName.includes(query)
    );
  });

  const EditProduct = (response) => {
    dispatch(EditProductAction(response));
    dispatch(AdminOptionAction('create_product'))
  }

  const disabledProduct = (productId, result) => {        
    let res = null;
    if(result == "true"){
      res = "false"
    }
    else{
      res = "true"
    }
    axios.patch(AdminRequest.DISABLED_PRODUCT + productId + "/" + res)
      .then((response) => {        
        axios.get(AdminRequest.GET_ALL_PRODUCTS)
          .then((response) => {
            dispatch(ProductsAction(response.data));
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
      <section className="dashboard_product">
        <section className="search_header">
          <h2>Products</h2>
          <form>
            <input
              onChange={(e) => setquery(e.target.value)}
              type="text"
              placeholder="Search Product..."
            />
            <img src={search} />
          </form>
        </section>
        <div className="order_table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Brand Name</th>
                <th>Category</th>
                <th>Shop Name</th>
                <th>Price</th>
                <th>Discount%</th>
                <th>MRP</th>
                <th>Disabled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((item) => {                  
                  let result = item?.disabled ? "true" : "false";
                  return (
                    <tr onClick={() => EditProduct(item)}>
                      <td>
                        <img className="prod_img" src={AdminRequest.GET_PRODUCT_IMAGE + item?.productImage} alt="" />
                      </td>
                      <td>{item.productName.slice(0, 20)}</td>
                      <td>{item?.category.slice(0, 20)}</td>
                      <td>{item?.sellerName}</td>
                      <td>{(item?.mrp) - (item?.mrp * item?.discount / 100)}</td>
                      <td>{item?.discount}%</td>
                      <td>{item?.mrp}</td>
                      <td>{result}</td>
                      <th>
                        <span
                          style={{
                            fontSize: "30px !important",
                            cursor: "pointer",
                          }}
                          onClick={() => disabledProduct(item?._id, result)}
                        >
                          ...
                        </span>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Products;
