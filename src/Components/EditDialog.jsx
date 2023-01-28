import React, { useState } from "react";
import UserRequests from "../Requests/UserRequests";
import axios from "axios";
import { AddressSubmitAction, UserAction } from "../Redux/Actions/Actions";
import close from "../icons/close.png";
import "../style/editDialog.css";
import { useDispatch, useSelector } from "react-redux";
import { EditInfoToggleBtnAction } from "../Redux/Actions/Actions";
import { toast } from "react-toastify";
const EditDialog = ({ setSelectAdd, selectAdd }) => {
  const dispatch = useDispatch();
  const editInfo = useSelector((state) => state?.Toggle?.EditInfo);
  const user = useSelector((state) => state?.User?.user);
  const [mobile, setMobile] = useState(user?.phoneNumber);
  const MobileChange = (e) => {
    e.preventDefault();
    if (mobile.length < 10) {
      toast.error("Invalid Mobile Number");
    } else
      axios
        .patch(UserRequests.GET_USER + user?._id, {
          phoneNumber: mobile,
        })
        .then((res) => {
          console.log(res);
          dispatch(UserAction({ ...user, phoneNumber: mobile }));
          dispatch(EditInfoToggleBtnAction(null));
          setSelectAdd({ ...selectAdd, num: true });
        })
        .catch((err) => {
          toast.error("error occured");
        });
  };

  const [address, setAddress] = useState({
    college: "",
    hostel: "",
    room_no: "",
  });
  let name, val;
  const addressHandler = (e) => {
    name = e.target.name;
    val = e.target.value;
    setAddress({ ...address, [name]: val });
  };

  const addressSubmitHandler = (e) => {
    e.preventDefault();
    if (!address.college) toast.error("Please Choose Address");
    else if (!address.hostel) toast.error("Please Choose hostel");
    else if (!address.room_no) toast.error("Please Choose room_no");
    else if (!(address.room_no < 1200)) {
      toast.error("Please Choose valid room_no");
    } else {
      localStorage.setItem("address", JSON.stringify(address));
      dispatch(AddressSubmitAction(address));
      dispatch(EditInfoToggleBtnAction(null));
      setSelectAdd({ ...selectAdd, add: true });
    }
  };
  return (
    <>
      <section className={editInfo ? "edit_dialog" : "hide edit_dialog"}>
        <img
          onClick={() => dispatch(EditInfoToggleBtnAction(null))}
          className="close_editInfo"
          src={close}
          alt=""
        />
        
        {editInfo == "phoneChange" && (
          <section className="edit_num">
            <form>
              <strong>Change your Mobile Number</strong>
              <label htmlFor="phoneNum">Enter your mobile number</label>
              <input
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                type="number"
                placeholder="XXXX-XXXX-XX"
              />
              <button className="checkoutBtn" onClick={(e) => MobileChange(e)}>
                Done
              </button>
            </form>
          </section>
        )}
        {editInfo == "address" && (
          <section className="edit_address">
            <form>
              <strong>Change your Address</strong>
              <label htmlFor="college">Select Your College</label>
              <select onChange={addressHandler} name="college" id="college">
                <option value="marwadi">Your College</option>
                <option value="marwadi">Marwadi University</option>
                <option value="dharshan">Dharshan University</option>
              </select>
              <label htmlFor="hostel">Select Your Hostel</label>
              <select onChange={addressHandler} name="hostel" id="hostel">
                <option value="Hostel">Hostel</option>
                <option value="Hostel A">A Wing</option>
                <option value="Hostel B">B Wing</option>
                <option value="Hostel C">C Wing</option>
                <option value="Hostel D">D Wing</option>
              </select>
              <label htmlFor="room_no">Enter your room number</label>
              <input
                onChange={addressHandler}
                type="number"
                id="room_no"
                name="room_no"
                placeholder="0000"
              />
              <button
                onClick={addressSubmitHandler}
                className="checkoutBtnMobile checkoutBtn"
              >
                Done
              </button>
            </form>
          </section>
        )}
      </section>
    </>
  );
};

export default EditDialog;
