import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BorrowcapApi from "../../api/api";

const initialState = {
  data: {
    borrower: {
      fundedLoans: 0,
      approvedLoans: 0,
      installments: 0,
    },
    investor: {
      investments: 0,
      monthlyInflows: 0,
      avgReturns: 0,
    },
  },
};

export const fetchStats = createAsyncThunk("stats/fetchStats", async (user) => {
  BorrowcapApi.token = user.token;
  const response = await BorrowcapApi.fetchStats(user.id);
  return response;
});

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      const {
        totalRemainingBalance,
        totalInstallment,
        totalAmtApproved,
        investments,
        monthlyInflows,
        avgReturns,
      } = action.payload;
      state.data = {
        borrower: {
          fundedLoans: totalRemainingBalance,
          approvedLoans: totalAmtApproved,
          installments: totalInstallment,
        },
        investor: {
          investments,
          monthlyInflows,
          avgReturns,
        },
      };
    });
  },
});

export default statsSlice.reducer;
