import ActionType from "../ActionType";
const UserState = {
  SignUpDialog: false,
  SignUpBtn: false,
  CategoryPopUp: false,
  EditInfo: null,
  CartToggle: false,
};

const UserReducer = (state = UserState, { type, payload }) => {
  switch (type) {
    case ActionType.SIGNUP_DIALOG:
      return { ...state, SignUpDialog: payload };
    case ActionType.SIGNUP_BTN:
      return { ...state, SignUpBtn: payload };
    case ActionType.CATEGORY_TOGGLE:
      return { ...state, CategoryPopUp: payload };
    case ActionType.EDIT_INFO:
      return { ...state, EditInfo: payload };
    case ActionType.CART_TOGGLE:
      return { ...state, CartToggle: !state.CartToggle };

    default:
      return state;
  }
};

export default UserReducer;
