import { AnyAction } from "redux";
import { Movie } from "@typings";

if (typeof localStorage !== "undefined") {
  const storedData = localStorage.getItem("listMovies");

  var initialState: { myList: Movie[] } = {
    myList: storedData ? JSON.parse(storedData) : [],
  };
} else {
  var initialState: { myList: Movie[] } = {
    myList: [],
  };
}

// const initialState: { myList: Movie[] } = {
//   myList: [],
// };

export const listReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "ADD_TO_LIST":
      const item = action.payload;

      let isMovieExist: Movie | null = null;
      if (state.myList.length > 0) {
        isMovieExist = state.myList.find((i) => i.id === item.id) || null;
      }

      if (isMovieExist) {
        return {
          ...state,
          myList: state.myList.map((i) =>
            i.id === isMovieExist!.id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          myList: [...state.myList, item],
        };
      }

    case "REMOVE_ADDED_MOVIE":
      return {
        ...state,
        myList: state.myList.filter((i) => i.id !== action.payload.id),
      };

    default:
      return state;
  }
};
