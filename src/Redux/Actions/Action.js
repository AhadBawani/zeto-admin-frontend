import ActionType from "../ActionType";

export const AdminOptionAction = (response) => {
    return{
        type:ActionType.ADMIN,
        payload:response
    }
}

export const SellerAction = (response) => {
    return{
        type:ActionType.SELLER,
        payload:response
    }
}

export const OrderDeliveredAction = (response) => {
    return{
        type:ActionType.ORDERDELIVERED,
        payload:response
    }
}

export const OrderDetailsAction = (response) => {
    return{
        type:ActionType.SHOWORDERDETAILS,
        payload:response
    }
}

export const EditProductAction = (response) => {
    return{
        type:ActionType.EDITPRODUCT,
        payload:response
    }
}


export const ProductsAction = (response) => {
    return{
        type:ActionType.PRODUCTS,
        payload:response
    }
}

export const OrdersAction = (response) => {
    return{
        type:ActionType.ORDERS,
        payload:response
    }
}