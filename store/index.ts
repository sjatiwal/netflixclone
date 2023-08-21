import { Middleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const middleWare: Middleware[] = [thunk];

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWare),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
