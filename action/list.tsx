import { Movie } from "@typings";
import { RootState } from "@store";
export const addMovieToList =
  (movie: Movie) =>
  async (
    dispatch: (arg0: { type: string; payload: any }) => void,
    getState: () => RootState
  ) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${
        movie?.media_type === "tv" ? "tv" : "movie"
      }/${movie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    );

    const data = await response.json();

    dispatch({
      type: "ADD_TO_LIST",
      payload: {
        data: data,
        id: data.id,
        adult: data.adult,
        genre_ids: data?.genre_ids,
        name: data.belongs_to_collection?.name,
        backdrop_path: data.backdrop_path,
        media_type: data?.media_type,
        original_language: data.original_language,
        original_title: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        poster_path: data.poster_path,
        release_date: data.release_date,
        title: data.title,
        video: data.video,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
      },
    });
    const listMovies = getState().list.myList || [];
    return localStorage.setItem("listMovies", JSON.stringify(listMovies));
  };

export const removeMovieFromList =
  (movie: Movie) =>
  async (
    dispatch: (arg0: { type: string; payload: Movie }) => void,
    getState: () => {
      list: { myList: {} };
    }
  ) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: movie,
    });
    return localStorage.setItem(
      "listMovies",
      JSON.stringify(getState().list.myList)
    );
  };
