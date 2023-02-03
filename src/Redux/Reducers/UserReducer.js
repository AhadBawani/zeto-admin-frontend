import ActionType from "../ActionType";
const UserState = {
  user: null,
  picture: localStorage.getItem("profile") || "/static/media/4.e058948c8f15db27e920.png",
  usercart: null,
  userOrders: [],
  userPhone: null,
  userLocalCart: null,
  userEmail: null,
  orderId:"0000000",
  userAddress: {
    college: "marwadi",
    hostel: "hostel A",
    room_no: "0000"
  },
  deliveryRate:null
};

const UserReducer = (state = UserState, { type, payload }) => {
  switch (type) {
    case ActionType.USER:
      return { ...state, user: payload };
    case ActionType.CHANGE_PHONE:
      return { ...state, userPhone: payload };
    case ActionType.ADDRESS:
      return { ...state, userAddress: payload };
    case ActionType.USERCART:
      return { ...state, usercart: payload };
    case ActionType.ADD_TO_CART:
      return { ...state, usercart: payload };
    case ActionType.REMOVE_TO_CART:
      return { ...state, usercart: payload };
    case ActionType.USERLOCALCART:
      return { ...state, userLocalCart: payload };
    case ActionType.USER_ORDER:
      return { ...state, userOrders: payload };
    case ActionType.USER_EMAIL:
      return { ...state, userEmail: payload };
    case ActionType.ORDER_ID:
      return { ...state, orderId: payload };
    case ActionType.PROFILE_PICTURE:
      localStorage.setItem("profile", payload);
      return { ...state, picture: payload };
    case ActionType.DELIVERY_RATE:
      return {...state, deliveryRate:payload};
    default:
      return state;
  }
};

export default UserReducer;
