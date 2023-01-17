const url = 'http://52.66.195.69:5000/';

const UserRequests = {
    PRODUCT_IMG : url + 'Images/',
    USER_LOGIN : url + "User/Login",
    USER_SIGNUP : url + "User/Signup",
    GET_USER:url+"User/",
    GET_USER_CART : url + "UserCart/",
    GET_ALL_PRODUCTS : url + "Product/",
    ADD_TO_CART : url + "UserCart/",
    ADD_CART_QUANTITY : url + "UserCart/AddQuantity/",
    REMOVE_CART_QUANTITY : url + "UserCart/RemoveQuantity/",
    DELETE_CART_ITEM : url + "UserCart/",
    PAYMENT : url + 'Payment/',
    PLACE_ORDER : url + "Orders/",
    GET_ORDER : url + "Orders/"
}

export default UserRequests;