import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: localStorage.getItem("userAuth")
    ? JSON.parse(localStorage.getItem("userAuth"))
    : [],
  signupLoading: false,
  signupError: "",
  loginLoading: false,
  loginError: "",
  isLoggedIn: localStorage.getItem("userAuth") ? true : false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    const url = `http://127.0.0.1:5000/api/users`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // let response;
    // try {
    //   response = await axios.post(url, data, config);
    // } catch (err) {
    //   return rejectWithValue(response);
    // }
    // if (response.data) {
    //   console.log(response);
    //   localStorage.setItem("userAuth", JSON.stringify(response.data));
    // } else {
    //   console.log(response);
    //   return rejectWithValue(response.message);
    // }
    try {
      const response = await axios.post(url, data, config);
      localStorage.setItem("userAuth", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const url = `http://127.0.0.1:5000/api/users/login`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const response = await axios.post(url, data, config);

    // if (response.data) {
    //   console.log(response);
    //   localStorage.setItem("userAuth", JSON.stringify(response.data));
    // } else {
    //   console.log(response);
    // }
    // return response.data;
    try {
      const response = await axios.post(url, data, config);
      localStorage.setItem("userAuth", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
    // axios
    //   .post(url, data, config)
    //   .then((response) => {
    //     console.log(response);

    //     localStorage.setItem("userAuth", JSON.stringify(response.data));
    //     return response.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // return rejectWithValue(err.response.data.message);
    //     throw new Error(err.response.data.message);
    //   });
  }
);
// export const registerUser = (data) => async (dispatch) => {
//   const url = `http://127.0.0.1:5000/api/users`;
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const response = await axios.post(url, data, config);
//   console.log(response);
//   return response;
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("userAuth");
      //state = { ...state, userInfo: [], isLoggedIn: false };
      state.isLoggedIn = false;
      state.userInfo = {};
      return state;
    },
    setToInitial(state) {
      state = { ...initialState };
      return state;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.signupLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.signupLoading = false;
      state.signupError =
        action.payload || "You couldn't be registered. Try again.";
      state.userInfo = [];
      state.isLoggedIn = false;
      console.log(action.error);
      console.log(action.payload);
    },
    [loginUser.pending]: (state, action) => {
      state.loginLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loginLoading = false;
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      console.log(state.userInfo);
    },
    [loginUser.rejected]: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload || "You couldn't be logged in.";
      state.userInfo = [];
      state.isLoggedIn = false;
      console.log(state.loginError);
    },
  },
});
export default authSlice.actions;

export const reducer = authSlice.reducer;
