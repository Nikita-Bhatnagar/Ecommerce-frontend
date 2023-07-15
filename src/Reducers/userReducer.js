import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userList: [],
  user: {},
  loading: false,
  error: "",
  deleteSuccess: false,
  deleteLoading: false,
  editSuccess: false,
  editLoading: false,
  editError: "",
};

export const getAllUsers = createAsyncThunk("users/get", async () => {
  const url = `http://127.0.0.1:5000/api/users`;
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

export const getUserById = createAsyncThunk("user/get", async (id) => {
  const url = `http://127.0.0.1:5000/api/users/${id}`;
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

export const deleteUser = createAsyncThunk("user/delete", async (id) => {
  const url = `http://127.0.0.1:5000/api/users/${id}`;
  const token = JSON.parse(localStorage.getItem("userAuth")).token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(url, config);
  console.log(response);
  return response.data;
});

export const updateUser = createAsyncThunk("user/delete", async (user) => {
  const url = `http://127.0.0.1:5000/api/users/${user._id}`;
  const token = JSON.parse(localStorage.getItem("userAuth")).token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(url, user, config);
  console.log(response);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userListReset(state, action) {
      state.loading = false;
      state.error = "";
      state.userList = [];
      return state;
    },
    editReset(state, action) {
      state.editLoading = false;
      state.editError = "";
      state.user = {};
      state.editSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.userList = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },
    [getUserById.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUserById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },
    [deleteUser.pending]: (state, action) => {
      state.deleteLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
    },
    [updateUser.pending]: (state, action) => {
      state.editLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.editSuccess = true;
      //state.user = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.editLoading = false;
      state.editSuccess = false;
    },
  },
});

export const reducer = userSlice.reducer;
export default userSlice.actions;
