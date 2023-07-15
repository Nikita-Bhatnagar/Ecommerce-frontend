import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  shippingAddress: localStorage.getItem("address")
    ? JSON.parse(localStorage.getItem("address"))
    : {},
  paymentMethod: "",
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart(state, action) {
      const itemExists = state.cartItems.find(
        (elem) => elem.id === action.payload.id
      );
      if (itemExists) {
        state.cartItems = state.cartItems.filter((elem) => {
          if (elem.id === action.payload.id)
            elem.qty += Number(action.payload.qty);
          if (elem.qty > elem.countInStock)
            elem.qty -= Number(action.payload.qty);
          return elem.qty !== 0;
        });
      } else {
        state.cartItems.push({
          ...action.payload,
          qty: action.payload.qty || 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItemsFromCart(state, action) {
      state.cartItems = state.cartItems.filter((elem) => {
        console.log(elem.id, action.payload);
        return elem.id != action.payload;
      });
      console.log(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    saveAddress(state, action) {
      console.log(action.payload);
      state.shippingAddress = { ...action.payload };
      localStorage.setItem("address", JSON.stringify(action.payload));
    },
    addToWishlist(state, action) {
      state.wishlist.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (elem) => elem.id !== action.payload.id
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});
export const reducer = cartSlice.reducer;
export default cartSlice.actions;
