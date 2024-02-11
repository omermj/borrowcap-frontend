import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BorrowcapApi from "../../api/api";

// Key for storing token in localStorage
export const TOKEN_STORAGE_ID = "borrowcap-token";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user") || null);
};

const initialState = {
  user: getUserFromLocalStorage(),
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (user) => {
    BorrowcapApi.token = user.token;
    const response = await BorrowcapApi.getCurrentUser(user.username);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.token };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(TOKEN_STORAGE_ID, user.token);
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem(TOKEN_STORAGE_ID);
    },
    updateStatistics: (state, action) => {
      const user = { ...action.payload.user, token: state.user.token };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    updateAccountBalance: (state, action) => {
      state.user.accountBalance = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    });
  },
});

export const { loginUser, logoutUser, updateStatistics, updateAccountBalance } =
  userSlice.actions;
export default userSlice.reducer;
