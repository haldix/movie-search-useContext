import {
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_SUCCESS,
  MOVIE_SEARCH_FAIL,
  MOVIE_NEW_KEYWORDS,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_FAIL,
} from '../constants/movieConstants';

export const movieReducer = (state = { movie: {} }, { type, payload }) => {
  switch (type) {
    case MOVIE_NEW_KEYWORDS:
      return { ...state, keywords: payload };
    case MOVIE_SEARCH_REQUEST:
      return { ...state, loading: true };
    case MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        movies: payload,
      };
    case MOVIE_SEARCH_FAIL:
      return {
        message: payload,
      };
    case MOVIE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        movie: payload,
      };
    case MOVIE_DETAILS_FAIL:
      return {
        message: payload,
      };
    default:
      return state;
  }
};
