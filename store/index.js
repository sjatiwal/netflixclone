import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import thunk from "react-redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

if (typeof localStorage !== "undefined") {
  // Code that uses localStorage
  var initialState = {
    list: {
      myList: localStorage.getItem("listMovies")
        ? JSON.parse(localStorage.getItem("listMovies"))
        : [],
    },
    payments: [],
  };
}

const middleWare = [thunk];
const store = configureStore(
  { reducer: rootReducer },
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
