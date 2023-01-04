import ActionType from "../ActionType";

const UtilState = {
    Products:null,
    Orders:null,
    OrderDelivered:null,
    EditProduct:null,
    OrderDetails:null,
    Seller:null
}

const UtilsReducer = (state = UtilState, {type, payload}) => {
    switch(type){
        case ActionType.PRODUCTS:
            return{...state, Products:payload};

        case ActionType.ORDERS:
            return{...state, Orders:payload};

        case ActionType.ORDERDELIVERED:
            return{...state, OrderDelivered:payload};

        case ActionType.SHOWORDERDETAILS:
            return{...state, OrderDetails:payload};

        case ActionType.EDITPRODUCT:
            return{...state, EditProduct:payload};

        case ActionType.SELLER:
            return{...state, Seller:payload};

        default:
            return state;
    }
}

export default UtilsReducer;