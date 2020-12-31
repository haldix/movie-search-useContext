import axios from 'axios';
import config from '../config';
import {
  MOVIE_NEW_KEYWORDS,
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_SUCCESS,
  MOVIE_SEARCH_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_FAIL,
} from '../constants/movieConstants';

const { API_KEY } = config;

export const getMovie = (keywords) => async (dispatch) => {
  const urlKeywords = keywords
    .split(' ')
    .filter((w) => w !== '')
    .join('+');

  try {
    dispatch({ type: MOVIE_NEW_KEYWORDS, payload: urlKeywords });
    dispatch({ type: MOVIE_SEARCH_REQUEST });

    const url = `https://api.themoviedb.org/3/search/movie?query=${urlKeywords}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;

    const { data } = await axios.get(url);

    dispatch({ type: MOVIE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_SEARCH_FAIL,
      payload: error.message,
    });
  }
};

export const nextPage = (keywords, page) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_SEARCH_REQUEST });

    const url = `https://api.themoviedb.org/3/search/movie?query=${keywords}&page=${page}&api_key=${API_KEY}&language=en-US&include_adult=false`;

    const { data } = await axios.get(url);
    dispatch({ type: MOVIE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_SEARCH_FAIL,
      payload: error.message,
    });
  }
};

export const getMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });
    const url = `https://api.themoviedb.org/3/movie/${id}?&api_key=${API_KEY}&include_adult=false`;

    const { data } = await axios.get(url);

    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
