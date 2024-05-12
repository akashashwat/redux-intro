// store using only redux

import { combineReducers, createStore } from "redux";

import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/account/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// console.log(store.getState());

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a car" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// store.dispatch(deposit(700));
// console.log(store.getState());
// store.dispatch(withdraw(200));
// console.log(store.getState());
// store.dispatch(requestLoan(1000));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

// store.dispatch(createCustomer("Shubham Patel", "IND167482"));
// console.log(store.getState());
// store.dispatch(updateName("Michael Jackson"));
// console.log(store.getState());
// store.dispatch(deposit(300));
// console.log(store.getState());
