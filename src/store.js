// creating store using redux-toolkit.
// Note: it automatically setup thunk middleware and devtool

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
