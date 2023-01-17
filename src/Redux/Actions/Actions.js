import ActionType from "../ActionType"

export const UserAction = (response) => {
    return{
        type:ActionType.USER,
        payload:response
    }
}

export const UserLocalCartAction = (response) => {
    return{
        type:ActionType.USERLOCALCART,
        payload:response
    }
}

export const UserCartAction = (response) => {
    return{
        type:ActionType.USERCART,
        payload:response
    }
}
export const UserOrderAction = (response) => {
    return{
        type:ActionType.USER_ORDER,
        payload:response
    }
}
export const ProductsAction = (response) => {
    return{
        type:ActionType.PRODUCTS,
        payload:response
    }
}
export const AddToCartAction = (response) => {
    return{
        type:ActionType.ADD_TO_CART,
        payload:response
    }
}
export const RemoveToCartAction = (response) => {
    return{
        type:ActionType.REMOVE_TO_CART,
        payload:response
    }
}

export const ChangePhoneAction = (response) => {
    return{
        type:ActionType.CHANGE_PHONE,
        payload:response
    }
}
export const CategoryAction = (response) => {
    return{
        type:ActionType.CATEGORY,
        payload:response
    }
}
export const AddressSubmitAction = (response) => {
    return{
        type:ActionType.ADDRESS,
        payload:response
    }
}
export const SearchQueryAction = (response) => {
    return{
        type:ActionType.SEARCH_QUERY,
        payload:response
    }
}



//  Togglinng Actions 

export const SignUpDialogAction = (response) => {
    return{
        type:ActionType.SIGNUP_DIALOG,
        payload:response
    }
}
export const SignUpBtnAction = (response) => {
    return{
        type:ActionType.SIGNUP_BTN,
        payload:response
    }
}
export const CategoryToggleBtnAction = (response) => {
    return{
        type:ActionType.CATEGORY_TOGGLE,
        payload:response
    }
}

export const EditInfoToggleBtnAction = (response) => {
    return{
        type:ActionType.EDIT_INFO,
        payload:response
    }
}
export const CartToggleAction = (response) => {
    return{
        type:ActionType.CART_TOGGLE,
        payload:response
    }
}