import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/checkout.css";
import SignUpDialog from "../Components/SignUpDialog";
import { useDispatch, useSelector } from "react-redux";
import { EditInfoToggleBtnAction } from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import CheackoutHeader from "../Components/CheackoutHeader";
import { useNavigate } from "react-router-dom";
import EditDialog from "../Components/EditDialog";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Checkout = () => {
  document.title = "Zetomart | Checkout"
  const [selectAdd, setSelectAdd] = useState({
    add: false,
    num: false
  })
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.User?.user);
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const Products = useSelector((state) => state?.Products?.Products) || [];
  const address = useSelector(state => state?.User?.userAddress)
  const [quantity, setQuantity] = useState();
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [total, setTotal] = useState();
  const userLocalCart =
    useSelector((state) => state?.User?.userLocalCart) || [];
  const navigate = useNavigate();
  useEffect(() => {
    let quan = 0;
    let amount = 0;
    if (user) {
      userCart.map((item) => {
        if (!item?.productId?.disabled) {
          quan += item?.quantity;
          amount += item?.quantity * item?.productId?.price;
        }
      });
      setQuantity(quan);
      setTotal(amount + deliveryFee);
    }
  }, [userCart]);
  useEffect(() => {
    if (!user) {
      let quant = 0;
      let amount = 0;
      if (userLocalCart) {
        userLocalCart.map((item) => {
          quant += item?.quantity;
          amount += item?.price;
        });
      }
      setQuantity(quant);
      setTotal(amount + deliveryFee);
    }
  }, [userLocalCart]);

  async function CheckoutProcess() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    axios
      .post(UserRequests.PAYMENT, {
        amount: total,
      })
      .then((response) => {
        const options = {
          key: "rzp_live_e9qbydMHEkjESM",
          currency: response.data.currency,
          amount: response.data.amount,
          order_id: response.data.id,
          name: "Payment",
          description:
            "Thank you for paying online your products are on the way!",
          handler: function (response) {
            let product = [];
            userCart.map((item) => {
              let obj = {
                productId: item?.productId?._id,
                quantity: item?.quantity,
              };
              product.push(obj);
            });
            let obj = {
              userId: user?._id,
              product: product,
              block: "A",
              room: "111",
              paymentType: "Online",
              paymentId: response.razorpay_payment_id,
              orderDelivered: false,
            };
            axios.post(UserRequests.PLACE_ORDER, obj).then((response) => {
              if (response.data) {
                navigate("/OrderPlaced");
              }
            });
          },
          prefill: {
            name: user?.username,
            email: user?.email,
            phone_number: user?.phoneNumber,
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const PlaceOrder = () => {
    if (!cashOnDelivery) {
      setPaymentError(true);
    }
    else if (!selectAdd.add && !selectAdd.num) {
      toast.error("Please select address and mobile number ! ")
    }
    else {
      setPaymentError(false);
      let product = [];
      userCart.map((item) => {
        if (!item?.productId?.disabled) {
          let obj = {
            productId: item?.productId?._id,
            quantity: item?.quantity,
          };
          product.push(obj);
        }
      });
      let obj = {
        userId: user?._id,
        product: product,
        block: address?.hostel,
        room: address?.hostel,
        paymentType: cashOnDelivery ? "Cash on Deliver" : "",
        orderDelivered: false,
      };
      axios
        .post(UserRequests.PLACE_ORDER, obj)
        .then((response) => {
          if (response.data) {
            navigate("/OrderPlaced");
          }
        })
        .catch((error) => { });
    }
  };
  var deliveryFee = 30;
  return (
    <>
      <CheackoutHeader />
      <EditDialog setSelectAdd={setSelectAdd} selectAdd={selectAdd} />
      <div className="checkout__page">
        <div className="check__left">
          {!user ? (
            <div className="checkout__card">
              <h2>{user ? "1.Account Details" : "You need to SignIn/SignUp"}</h2>
              <SignUpDialog />
            </div>
          ) : (
            <div className="checkout__card c__signIn">
              <h2>1.Account Details</h2>
              <h3>{user?.username.toUpperCase()}</h3>
            </div>
          )}

          <div style={user ? { cursor: "pointer" } : { cursor: "pointer", pointerEvents: "none", opacity: "0.7" }} className="checkout__card">
            <h2>2.Shipping Details</h2>
            <div className="checkout__shipping">
              <details
                onClick={() => dispatch(EditInfoToggleBtnAction("address"))}
              >
                <summary>Marwadi university</summary>
              </details>
              <details
                onClick={() => dispatch(EditInfoToggleBtnAction("address"))}
              >
                <summary>Hostel Ground Floor</summary>
              </details>
              <details
                onClick={() =>
                  dispatch(EditInfoToggleBtnAction("phoneChange"))
                }
              >
                <summary>{user?.phoneNumber}</summary>
              </details>
            </div>
          </div>
          <div style={user ? { cursor: "pointer" } : { cursor: "pointer", pointerEvents: "none", opacity: "0.7" }} className="checkout__card">
            <h2>3.Payment Details</h2>
            <div className="checkout__shipping">
              <details>
                <summary
                  onClick={() => CheckoutProcess()}
                  style={{ cursor: "pointer" }}
                >
                  Upi/Debit Card
                </summary>
              </details>
              <form
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 1.2rem",
                  paddingLeft: "2.3rem",
                }}
              >
                <label style={{ marginLeft: "-1rem" }} htmlFor="checkbox">Cash on delivery</label>
                <input
                  style={{ width: "25px" }}
                  type="checkbox"
                  name="cod"
                  id="checkbox"
                  onClick={(e) => setCashOnDelivery(e?.target?.checked)}
                />
              </form>

              {paymentError ? (
                <>
                  <span
                    style={{
                      color: "red",
                      fontWeight: "500",
                      fontSize: "1.1rem",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Select a Payment Method
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            className="checkoutBtn"
            style={user ? { cursor: "pointer" } : { cursor: "pointer", pointerEvents: "none", opacity: "0.5" }}
            onClick={() => PlaceOrder()}
          >
            <span>Checkout</span>
            <span>{total}</span>
          </div>

        </div>
        <div className="checkout__right">
          <div className="ch__btn">
            <div
              className="checkoutBtn"
              style={user ? { cursor: "pointer" } : { cursor: "pointer", pointerEvents: "none", opacity: "0.5" }}
              onClick={() => PlaceOrder()}
            >
              <span>Checkout</span>
              <span>{total}</span>
            </div>
            <details style={{ cursor: "pointer" }}>
              <summary>Order Summary ({quantity})</summary>
              <div className="payment">
                {user ? (
                  <>
                    {userCart.map((item) => {
                      return (
                        !item?.productId?.disabled && <>
                          <div className="sub_payment">
                            <span>{item?.productId?.productName}</span>
                            <span>{item?.quantity}</span>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {userLocalCart ? (
                      userLocalCart.map((items) => {
                        let item = Products.find(
                          (item) => item?._id == items?.productId
                        );
                        return (
                          <>
                            <div className="sub_payment">
                              <span>{item?.productName}</span>
                              <span>{items?.quantity}</span>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </details>
          </div>
          <div className="payment">
            <div className="sub_payment">
              <span>Subtotal</span>
              <span>{total - deliveryFee}</span>
            </div>
            <div className="sub_payment">
              <span>delivery Fee</span>
              <span>{deliveryFee}</span>
            </div>
          </div>
          <div className="payment">
            <div style={{ fontWeight: "600" }} className="sub_payment">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </div>
        </div>
        <div onClick={() => PlaceOrder()} className="checkoutBtn checkoutMob">
          <span>Checkout</span>
          <span>555</span>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Checkout;
