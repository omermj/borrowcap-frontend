import { createSlice } from "@reduxjs/toolkit";

// Key for storing token in localStorage
export const TOKEN_STORAGE_ID = "borrowcap-token";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user") || null);
};

const initialState = {
  user: getUserFromLocalStorage(),
};

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
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
