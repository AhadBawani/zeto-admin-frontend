import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminOptionAction, ProductsAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";

const AddProduct = () => {
  const Products = useSelector((state) => state?.Utils?.Products) || [];
  const EditProduct = useSelector((state) => state?.Utils?.EditProduct);
  const seller = useSelector((state) => state?.Utils?.Seller) || [];
  const [category, setCategory] = useState([]);
  const [productImage, setProductImage] = useState();
  const [editProduct, setEditProduct] = useState(EditProduct ? EditProduct : null);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    productName: null,
    category: null,
    mrp: null,
    sellerName: null,
    discount: null,
    price: null,
    description: null
  });

  useEffect(() => {
    let arr = [];
    if (Products) {
      Products.map((item) => {
        let index = arr.findIndex((items) => items === item?.category);        
        if (index < 0) {
          arr.push(item?.category);
        }
      })
      setCategory(arr);
    }
  }, [Products])
  const imageChange = (e) => {
    let img = document.getElementById('img');
    let selectedImage = document.getElementById('selectImage');
    img.src = URL.createObjectURL(e.target.files[0]);
    setProductImage(e.target.files[0]);
    selectedImage.style.display = "none";
  }

  const onInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const AddProducts = () => {
    product.price = product.mrp - ((product.mrp * product.discount) / 100);
    const Product = new FormData();
    Product.append('productImage', productImage);
    Product.append('productName', product.productName);
    Product.append('category', product.category);
    Product.append('price', product.price);
    Product.append('sellerName', product.sellerName);
    Product.append('mrp', product.mrp);
    Product.append('discount', product.discount);
    Product.append('description', product.description);
    Product.append('disabled', false);

    axios.post(AdminRequest.ADD_PRODUCT, Product)
      .then((response) => {
        alert(response.data?.message);
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

  const EditProducts = (id) => {
    axios.put(AdminRequest.EDIT_PRODUCT + id, editProduct)
      .then((response) => {
        if (response.data) {
          axios.get(AdminRequest.GET_ALL_PRODUCTS)
            .then((response) => {
              dispatch(ProductsAction(response.data));
              dispatch(AdminOptionAction("product"));
            })
            .catch((error) => {
              console.log(error)
            })

        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const onEditInput = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value })
  }
  return (
    <>
      {
        EditProduct !== null | undefined
          ?
          <>
            <section className="add-product" style={{ marginTop: '4rem' }}>
              <section className="add-prod-detail">
                <div id="selectImage">
                  {/* <label htmlFor="image">Browse Image</label> <br />
                  <input
                    onChange={imageChange}
                    type="file"
                    hidden
                    name="image"
                    id="image"
                  /> */}
                  <img id="img" src={AdminRequest.GET_PRODUCT_IMAGE + EditProduct?.productImage} height="200px" width="200px" />
                </div>
                <div>
                  <label htmlFor="category">Category Name</label> <br />
                  <select name="category" id="category" defaultValue={EditProduct?.category} onChange={onEditInput}>
                    {
                      category.map((item) => {
                        return <option style={{ color: 'black' }}>{item}</option>
                      })
                    }
                  </select>
                </div>
                <div>
                  <label htmlFor="title">Product Name</label> <br />
                  <input
                    name="productName"
                    type="text"
                    id="productName"
                    onChange={onEditInput}
                    defaultValue={EditProduct?.productName}
                  />
                </div>
                <div className="price">
                  <div>
                    <label htmlFor="mrp">MRP</label>
                    <input
                      onChange={onEditInput}
                      name="mrp"
                      type="number"
                      id="mrp"
                      defaultValue={EditProduct?.mrp}
                    />
                  </div>
                  <div>
                    <label htmlFor="discount">Discount</label>
                    <input
                      onChange={onEditInput}
                      name="discount"
                      type="number"
                      id="discount"
                      defaultValue={EditProduct?.discount}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      type="number"
                      id="price"
                      value={editProduct.mrp - ((editProduct.mrp * editProduct.discount) / 100)}
                    // defaultValue={EditProduct?.price}
                    />
                  </div>
                </div>
              </section>
              <section className="add-prod-detail">
                <div></div>
                <div>
                  <label htmlFor="brand">Brand Name</label> <br />
                  <input
                    onChange={onEditInput}
                    type="text"
                    name="brand"
                    id="brand"
                  />
                </div>
                <div>
                  <label htmlFor="xyz">Shop Keeper</label> <br />
                  <select name="sellerName" id="sellerName" onChange={onEditInput}>
                    {
                      seller.map((item) => {
                        return <option style={{ color: 'black' }}>{item?.sellerName}</option>
                      })
                    }
                  </select>
                </div>
                <div>
                  <label htmlFor="desc">Description</label> <br />
                  <textarea name="description" id=""
                    onChange={onEditInput}
                    defaultValue={EditProduct?.description}></textarea>
                </div>
                <div>
                  <input
                    style={{ background: "orange", color: "white" }}
                    type="submit"
                    value="Edit Product"
                    onClick={() => EditProducts(EditProduct?._id)}
                  />
                </div>
              </section>
            </section>
          </>
          :
          <>
            <>
              <section className="add-product" style={{ marginTop: '4rem' }}>
                <section className="add-prod-detail">
                  <div id="selectImage">
                    <label htmlFor="image">Browse Image</label> <br />
                    <input
                      onChange={imageChange}
                      type="file"
                      hidden
                      name="image"
                      id="image"
                    />
                  </div>
                  <img id="img" />
                  <div>
                    <label htmlFor="category">Category Name</label> <br />
                    <select name="category" id="category" onChange={onInput}>
                      {
                        category.map((item) => {
                          return <option style={{ color: 'black' }}>{item}</option>
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor="title">Product Name</label> <br />
                    <input
                      name="productName"
                      type="text"
                      id="productName"
                      onChange={onInput}
                    />
                  </div>
                  <div className="price">
                    <div>
                      <label htmlFor="mrp">MRP</label>
                      <input
                        onChange={onInput}
                        name="mrp"
                        type="number"
                        id="mrp"
                      />
                    </div>
                    <div>
                      <label htmlFor="discount">Discount</label>
                      <input
                        onChange={onInput}
                        name="discount"
                        type="number"
                        id="discount"
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price</label>
                      <input
                        name="price"
                        type="number"
                        id="price"
                        value={product.mrp - ((product.mrp * product.discount) / 100)}
                      />
                    </div>
                  </div>
                </section>
                <section className="add-prod-detail">
                  <div></div>
                  <div>
                    <label htmlFor="brand">Brand Name</label> <br />
                    <input
                      onChange={onInput}
                      type="text"
                      name="brand"
                      id="brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="xyz">Shop Keeper</label> <br />
                    <select name="sellerName" id="sellerName" onChange={onInput}>
                      {
                        seller.map((item) => {
                          return <option style={{ color: 'black' }}>{item?.sellerName}</option>
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor="desc">Description</label> <br />
                    <textarea name="description" id="" onChange={onInput}></textarea>
                  </div>
                  <div>
                    <input
                      style={{ background: "red", color: "white" }}
                      type="submit"
                      value="Add Product"
                      onClick={() => AddProducts()}
                    />
                  </div>
                </section>
              </section>
            </>
          </>
      }
    </>
  );
};

export default AddProduct;
