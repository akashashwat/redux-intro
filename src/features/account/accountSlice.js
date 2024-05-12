// createSlice function gives three benefits,
// 1st it automatically creates action creaters from reducers
// 2nd it makes writing our reducers function more easier we dont have to use switch case, also default case is automatically handled.
// 3rd we can mutate state inside reducers (most imp use and biggest advantage of using redux toolkit), behind the scene it uses library called immer which will convert our logic to immutable logic.

import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      //mutating logic
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      // after prepration we return new payload as object and this new object will be the payload in the reducer.
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.balance += state.loan;
        state.loanPurpose = action.payload.purpose;
      },
    },

    //before prepration it accept only one argument.
    // requestLoan(state, action) {
    //   if (state.loan > 0) return;

    //   state.loan = action.payload.amount;
    //   state.balance += state.loan;
    //   state.loanPurpose = action.payload.purpose;
    // },

    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

//by default automatically created action creators only accepts one argument, that becomes action.payload, so to fix this problem we have to prepare the data, before it reaches the reducer.
// console.log(requestLoan("1000", "buy a car"));

// now we want our thunks back to get functionality of converting currency. so to create thunk in redux toolkit we can use createAsyncThunk that redux toolkit provides us, but using this is a lot of extra work, so easier solution is using action creator function. as we know redux and redux toolkit is compatible with each other. so we will use old action creator of deposit, and we will not export new deposit action creator.

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // function for thunk
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);

    const convertedCurrency = data.rates.USD;

    dispatch({ type: "account/deposit", payload: convertedCurrency });
  };
}

/*
// reducer function
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      // later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

// action creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // function for thunk
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);

    const convertedCurrency = data.rates.USD;

    dispatch({ type: "account/deposit", payload: convertedCurrency });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: "buy a car" },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
