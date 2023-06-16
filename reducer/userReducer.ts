export const userReducer = (
  state = { user: {} },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state; // Return the current state by default
  }
};
