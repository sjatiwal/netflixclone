import { combineReducers } from "redux";
import { userReducer } from "@reducer/userReducer";
import { listReducer } from "@reducer/listReducer";
import { newPaymentReducer } from "@reducer/paymentReducer";

const rootReducer = combineReducers({
  users: userReducer,
  list: listReducer,
  payments: newPaymentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
