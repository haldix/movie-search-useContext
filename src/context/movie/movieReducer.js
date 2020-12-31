import {
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_SUCCESS,
  MOVIE_SEARCH_FAIL,
  MOVIE_NEW_KEYWORDS,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_FAIL,
} from '../../types/movieTypes';

const movieReducer = (state, { type, payload }) => {
  switch (type) {
    case MOVIE_NEW_KEYWORDS:
      return { ...state, keywords: payload };
    case MOVIE_SEARCH_REQUEST:
      return { ...state, loading: true };
    case MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
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

export default movieReducer;
