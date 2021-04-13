export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS_LIST":
      return {
        ...state,
        transactions: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
