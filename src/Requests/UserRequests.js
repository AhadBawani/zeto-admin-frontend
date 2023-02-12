const url = 'http://65.2.190.222:5000/';
// const url = "http://localhost:5000/";

const UserRequests = {
    PRODUCT_IMG: url + 'Images/',
    SELLER_IMG: url + 'SellerImages/',
    USER_LOGIN: url + "User/Login",
    USER_SIGNUP: url + "User/Signup",
    GET_USER: url + "User/",
    GET_USER_CART: url + "UserCart/",
    GET_ALL_PRODUCTS: url + "Product/",
    ADD_TO_CART: url + "UserCart/",
    ADD_CART_QUANTITY: url + "UserCart/AddQuantity/",
    REMOVE_CART_QUANTITY: url + "UserCart/RemoveQuantity/",
    DELETE_CART_ITEM: url + "UserCart/",
    PAYMENT: url + 'Payment/',
    PLACE_ORDER: url + "Orders/",
    GET_ORDER: url + "Orders/",
    GET_SELLER: url + "Seller/",
    VERIFY_OTP: url + "User/Verifyotp",
    FORGOT_PWD: url + "User/ForgotPassword/",
    NEW_PWD: url + "User/ChangePassword/",
    EDIT_USER: url + "User/EditUser/"  ,  
    ORDER_REVIEW: url + "OrderReview/",
    DELIVERY_RATE : url + "Deliveryrate/",
    CONTACT : url + "Contact/",
    SUBCATEGORY:url+"subCategory/",
    
}

export default UserRequests;