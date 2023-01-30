import RootReducer from "../Reducers/RootReducer";
import { createStore } from "redux";

const store = createStore(RootReducer, {},  window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;