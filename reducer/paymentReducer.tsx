export const newPaymentReducer = (
  state = { payment: {} },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "CREATE_PAYMENT_SUCCESS":
      return {
        payment: action.payload,
      };
    default:
      return state;
  }
};
