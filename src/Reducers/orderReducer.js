import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  createdOrder: {},
  orderItems: [],
  shippingAddress: "",
  loading: false,
  error: "",
  payLoading: false,
  payError: "",
  paySuccess: false,
  myOrders: [],
  myOrdersLoading: false,
  myOrdersError: "",
  allOrdersLoading: false,
  allOrdersError: "",
  allOrders: [],
};

export const placeOrder = createAsyncThunk("order/post", async (order) => {
  const url = `http://127.0.0.1:5000/api/orders`;
  const token = JSON.parse(localStorage.getItem("userAuth")).token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(url, order, config);
  console.log(response);
  return response.data;
});

export const getOrderById = createAsyncThunk("order/get", async (id) => {
  const url = `http://127.0.0.1:5000/api/orders/${id}`;
  const token = JSON.parse(localStorage.getItem("userAuth")).token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(url, config);
  console.log(response);
  return response.data;
});

export const payOrder = createAsyncThunk(
  "payorder/put",
  async (id, paymentResult) => {
    const url = `http://127.0.0.1:5000/api/orders/${id}/pay`;
    const token = JSON.parse(localStorage.getItem("userAuth")).token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(url, paymentResult, config);
    console.log(response);
    return response.data;
  }
);

export const getMyOrders = createAsyncThunk("myorders/get", async () => {
  const url = `http://127.0.0.1:5000/api/orders/myorders`;
  const token = JSON.parse(localStorage.getItem("userAuth")).token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(url, config);
  console.log(response);
  return response.data;
});

export const getAllOrders = createAsyncThunk("orders/get", async () => {
  const url = `http://127.0.0.1:5000/api/orders`;
  const token = JSON.parse(localStorage.getItem("userAuth")).token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(url, config);
  console.log(response);
  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderPayReset(state, action) {
      state.payLoading = false;
      state.payError = "";
      state.paySuccess = false;
    },
    myOrdersReset(state, action) {
      state.myOrders = [];
      state.myOrdersLoading = false;
      state.myOrdersError = "";
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [placeOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.createdOrder = action.payload;
    },
    [placeOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error =
        action.payload || "Something went wrong. Order couldn't be placed.";
    },
    [getOrderById.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderItems = action.payload;
      state.shippingAddress = action.payload.shippingAddress;
    },
    [getOrderById.rejected]: (state, action) => {
      state.loading = false;
      state.error =
        action.payload ||
        "Something went wrong. Couldn't fetch order details .";
    },
    [payOrder.pending]: (state, action) => {
      state.payLoading = true;
    },
    [payOrder.fulfilled]: (state, action) => {
      state.payLoading = false;
      state.paySuccess = true;
    },
    [payOrder.rejected]: (state, action) => {
      state.payLoading = false;
      state.payError = action.payload || "Payment unsuccessful";
    },

    [getMyOrders.pending]: (state, action) => {
      state.myOrdersLoading = true;
    },
    [getMyOrders.fulfilled]: (state, action) => {
      state.myOrdersLoading = false;
      state.myOrders = action.payload;
      console.log(action.payload);
    },
    [getMyOrders.rejected]: (state, action) => {
      state.myOrdersLoading = false;
      state.myOrdersError = action.payload || "Couldn't fetch your orders.";
      console.log(action.payload);
    },
    [getAllOrders.pending]: (state, action) => {
      state.allOrdersLoading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.allOrdersLoading = false;
      state.allOrders = action.payload;
      console.log(action.payload);
    },
    [getAllOrders.rejected]: (state, action) => {
      state.allOrdersLoading = false;
      state.allOrdersError = action.payload || "Couldn't fetch the orders.";
      console.log(action.payload);
    },
  },
});
export const { orderPayReset, myOrdersReset } = orderSlice.actions;
export default orderSlice.reducer;
