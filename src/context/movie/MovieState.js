import React, { useReducer } from 'react';
import axios from 'axios';
import config from '../../config';
import MovieContext from './movieContext';
import MovieReducer from './movieReducer';
import {
  MOVIE_NEW_KEYWORDS,
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_SUCCESS,
  MOVIE_SEARCH_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_FAIL,
} from '../../types/movieTypes';

const MovieState = (props) => {
  const initialState = {
    keywords: '',
    loading: false,
    movies: { results: [] },
    message: '',
    movie: {},
  };

  const [state, dispatch] = useReducer(MovieReducer, initialState);

  const { API_KEY } = config;

  // Fetch movie data from TMDB API search
  const getMovie = async (keywords) => {
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

  // Fetch next page of movie data search
  const movieNextPage = async (keywords, page) => {
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

  // Fetch details on a movie
  const getMovieDetails = async (id) => {
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

  return (
    <MovieContext.Provider
      value={{
        keywords: state.keywords,
        loading: state.loading,
        movies: state.movies,
        message: state.message,
        movie: state.movie,
        getMovie,
        movieNextPage,
        getMovieDetails,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
