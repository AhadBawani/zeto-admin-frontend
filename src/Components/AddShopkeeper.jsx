import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AdminOptionAction, SellerAction } from '../Redux/Actions/Action';
import AdminRequest from '../Requests/AdminRequests';

const AddShopkeeper = () => {
  const [sellerImage, setSellerImage] = useState();
  const today = new Date();
  const dispatch = useDispatch();
  const [Seller, setSeller] = useState({
    sellerName: null,
    date: today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear()
  });
  const imageChange = (e) => {
    let img = document.getElementById('img');
    let selectedImage = document.getElementById('selectImage');
    img.src = URL.createObjectURL(e.target.files[0]);
    setSellerImage(e.target.files[0]);
    selectedImage.style.display = "none";
  }
  const onInput = (e) => {
    setSeller({ ...Seller, [e.target.name]: e.target.value });
  }
  const AddSeller = () => {
    let seller = new FormData();
    seller.append('sellerImage', sellerImage);
    seller.append('sellerName', Seller.sellerName);
    seller.append('date', Seller.date);

    axios.post(AdminRequest.ADD_SELLER, seller)
      .then((response) => {
        console.log(response.data);
        axios.get(AdminRequest.GET_ALL_SELLER)
          .then((response) => {
            dispatch(SellerAction(response.data));
            dispatch(AdminOptionAction('shopkeeper'));
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
              <label htmlFor="title">Seller Name</label> <br />
              <input
                name="sellerName"
                type="text"
                id="sellerName"
                onChange={onInput}
              />
            </div>
            <div>
              <label htmlFor="title">Date</label> <br />
              <input
                name="date"
                type="text"
                id="date"
                value={today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear()}
              />
            </div>
            <div>
              <input
                style={{ background: "red", color: "white", cursor: 'pointer' }}
                type="submit"
                value="Add Seller"
                onClick={() => AddSeller()}
              />
            </div>
          </section>
        </section>
      </>
    </>
  )
}

export default AddShopkeeper;