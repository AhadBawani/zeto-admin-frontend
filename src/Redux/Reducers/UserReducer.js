import ActionType from "../ActionType";
const UserState = {
  user: null,
  usercart: null,
  userOrders: null,
  userPhone: null,
  userLocalCart: null,
  
  userAddress:{
    college :"marwadi",
    hostel:"hostel A",
    room_no:"0000"
  },
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

    default:
      return state;
  }
};

export default UserReducer;
