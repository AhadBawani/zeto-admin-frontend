const url = "http://52.66.195.69:5000/";
// const url = "http://localhost:5000/"

const AdminRequest = {
    GET_ALL_PRODUCTS : url + "Product",
    ADD_PRODUCT : url + "Admin/",
    GET_PRODUCT_IMAGE : url + "Images/",
    GET_ALL_ORDERS : url + "Admin/",
    EDIT_PRODUCT : url + "Admin/EditProduct/",
    ORDER_DELIVERED : url + "Admin/OrderDelivered/",
    ADD_SELLER : url + "Seller/",
    GET_ALL_SELLER : url + "Seller/",
    GET_SELLER_IMAGES : url + "SellerImages/",
    DISABLED_PRODUCT : url + "Admin/DisabledProduct/"
}

export default AdminRequest;