import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import ProductReducer from "./ProductReducer";
import ToggleReducer from "./ToggleReducer"


const RootReducer = combineReducers({
    User:UserReducer,
    Products:ProductReducer,
    Toggle:ToggleReducer,
})

export default RootReducer;