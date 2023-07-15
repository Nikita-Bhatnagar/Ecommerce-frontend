import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Reducers/productReducers";
import { reducer as authReducer } from "./Reducers/authReducer";
import { reducer as cartReducer } from "./Reducers/cartReducer";
import { reducer as userReducer } from "./Reducers/userReducer";
import orderReducer from "./Reducers/orderReducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
export default store;
