import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  balance: 0,
  aadhar: null,
  loan: {
    pending: 0,
    purpose: null,
  },
  createdAt: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: (state, action) => {
      state.name = action.payload.name;
      state.aadhar = action.payload.aadhar;
      state.createdAt = action.payload.createdAt;
    },
    withdraw: (state, action) => {
      if (action.payload <= state.balance) {
        state.balance -= action.payload;
      }
    },
    deposit: (state, action) => {
      state.balance += action.payload;
    },
    requestLoan: (state, action) => {
      state.balance += action.payload.amount;
      state.loan.pending += action.payload.amount;
      state.loan.purpose = action.payload.purpose;
    },
    payLoan: (state) => {
      if (state.balance - state.loan.pending >= 0) {
        state.balance -= state.loan.pending;
        state.loan.pending = 0;
        state.loan.purpose = null;
      } else {
        state.loan.pending -= state.balance;
        state.balance = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { createCustomer, withdraw, deposit, requestLoan, payLoan } =
  customerSlice.actions;

export default customerSlice.reducer;
