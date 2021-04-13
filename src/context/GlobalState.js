import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State
const initialState = {
  transactions: [],
  user: null,
};

// Create context

export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  function listTransactions(transactions) {
    dispatch({
      type: "GET_TRANSACTIONS_LIST",
      payload: transactions,
    });
  }

  function login(user) {
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        user: state.user,
        listTransactions,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
