import ActionType from "../ActionType";
const UserState = {
  SignUpDialog: false,
  SignUpBtn: false,
  CategoryPopUp: false,
  EditInfo: null,
  CartToggle: false,
  Otp_Toggle: false,
  Dark_Toggle: false,
  ForgotPWD: "",
  Btn_loader: ""
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
    case ActionType.OTP_TOGGLE:
      return { ...state, Otp_Toggle: payload };
    case ActionType.DARK:
      return { ...state, Dark_Toggle: payload };
    case ActionType.DARK:
      return { ...state, Dark_Toggle: payload };
    case ActionType.FORGOTPWD:
      return { ...state, ForgotPWD: payload };
    case ActionType.BTN_LOADER:
      return { ...state, Btn_loader: payload };
    default:
      return state;
  }
};

export default UserReducer;
