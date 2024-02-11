import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import statsReducer from "./features/stats/statsSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    statsState: statsReducer,
  },
});
