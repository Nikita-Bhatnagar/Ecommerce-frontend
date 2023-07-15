import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  electronicsProducts: [],
  fashionProducts: [],
  homeProducts: [],
  productDetails: [],
  topProducts: [],
  discountProducts: [],
  latestProducts: [],
  allProducts: [],
  loading: false,
  error: "",
  deleteSuccess: false,
  deleteLoading: false,
  deleteError: "",
  createdProduct: {},
  createSuccess: false,
  createLoading: false,
  createError: "",
  updateSuccess: false,
  updateError: "",
  updateLoading: false,
};

export const getProducts = createAsyncThunk(
  "products/get",
  async (category) => {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/products?category=${category}`
    );
    // console.log(response.data.products);
    return { products: response.data.products, category };
  }
);

export const getProductDetails = createAsyncThunk(
  "productDetails/get",
  async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/products/${id}`
    );
    console.log(response);
    return response.data;
  }
);
export const getSpecialProducts = createAsyncThunk(
  "specialProducts/get",
  async (keyword) => {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/products/${keyword}`
    );
    console.log(response);
    return { products: response.data, type: keyword };
  }
);

export const getAllProducts = createAsyncThunk("allProducts/get", async () => {
  const url = `http://127.0.0.1:5000/api/products`;
  const response = await axios.get(url);
  console.log(response);
  return response.data;
});

export const deleteProductById = createAsyncThunk(
  "product/delete",
  async (id) => {
    const url = `http://127.0.0.1:5000/api/products/${id}`;
    const token = JSON.parse(localStorage.getItem("userAuth")).token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(url, config);
    console.log(response);
    return response.data;
  }
);

export const createProduct = createAsyncThunk("product/post", async () => {
  const url = `http://127.0.0.1:5000/api/products`;
  const token = JSON.parse(localStorage.getItem("userAuth")).token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(url, {}, config);
  console.log(response);
  return response.data;
});

export const updateProduct = createAsyncThunk(
  "product/put",
  async (product) => {
    const url = `http://127.0.0.1:5000/api/products/${product._id}`;
    const token = JSON.parse(localStorage.getItem("userAuth")).token;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(url, product, config);
    console.log(response);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productCreateReset(state, action) {
      state.createError = "";
      state.createLoading = false;
      state.createSuccess = false;
      //state.createdProduct = {};
      return state;
    },
    productUpdateReset(state, action) {
      state.updateError = "";
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updatedProduct = {};
      return state;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      switch (action.payload.category) {
        case "electronics":
          state.electronicsProducts = action.payload.products;
          break;
        case "fashion":
          state.fashionProducts = action.payload.products;
          break;
        case "home":
          state.homeProducts = action.payload.products;
      }
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
      console.log(state.error);
    },
    [getProductDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDetails = action.payload;
    },
    [getProductDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong. Try again.";
    },
    [getSpecialProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getSpecialProducts.fulfilled]: (state, action) => {
      state.loading = false;
      switch (action.payload.type) {
        case "top":
          state.topProducts = action.payload.products;
          break;
        case "discount":
          state.discountProducts = action.payload.products;
          break;
        case "latest":
          state.latestProducts = action.payload.products;
      }
    },
    [getSpecialProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong. Try again.";
    },
    [getAllProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
      console.log(action.payload);
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Couldn't fetch products";
    },
    [deleteProductById.pending]: (state, action) => {
      state.deleteLoading = true;
    },
    [deleteProductById.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
    },
    [deleteProductById.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = action.payload || "Couldn't delete product";
    },
    [createProduct.pending]: (state, action) => {
      state.createLoading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createLoading = false;
      state.createSuccess = true;
      state.createdProduct = action.payload;
    },
    [createProduct.rejected]: (state, action) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = action.payload || "Couldn't create product";
    },
    [updateProduct.pending]: (state, action) => {
      state.updateLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = true;
      // state.updatedProduct = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = action.payload || "Couldn't update product";
    },
  },
});
export const { productCreateReset, productUpdateReset } = productsSlice.actions;

export default productsSlice.reducer;
