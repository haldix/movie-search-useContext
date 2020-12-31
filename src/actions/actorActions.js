import axios from 'axios';
import config from '../config';
import {
  ACTOR_NEW_KEYWORDS,
  ACTOR_SEARCH_REQUEST,
  ACTOR_SEARCH_SUCCESS,
  ACTOR_SEARCH_FAIL,
  ACTOR_DETAILS_REQUEST,
  ACTOR_DETAILS_SUCCESS,
  ACTOR_DETAILS_FAIL,
} from '../constants/actorConstants';

const { API_KEY } = config;

export const getPerson = (keywords) => async (dispatch) => {
  const urlKeywords = keywords
    .split(' ')
    .filter((w) => w !== '')
    .join('+');

  try {
    dispatch({ type: ACTOR_NEW_KEYWORDS, payload: urlKeywords });
    dispatch({ type: ACTOR_SEARCH_REQUEST });
    const url = `https://api.themoviedb.org/3/search/person?query=${urlKeywords}&api_key=${API_KEY}`;

    const { data } = await axios.get(url);

    dispatch({ type: ACTOR_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTOR_SEARCH_FAIL,
      payload: error.message,
    });
  }
};

export const nextPage = (keywords, page) => async (dispatch) => {
  try {
    dispatch({ type: ACTOR_SEARCH_REQUEST });
    const url = `https://api.themoviedb.org/3/search/person?query=${keywords}&page=${page}&api_key=${API_KEY}`;

    const { data } = await axios.get(url);

    dispatch({ type: ACTOR_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTOR_SEARCH_FAIL,
      payload: error.message,
    });
  }
};

export const getActorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTOR_DETAILS_REQUEST });
    const url = `https://api.themoviedb.org/3/person/${id}?&api_key=${API_KEY}`;

    const { data } = await axios.get(url);

    dispatch({ type: ACTOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTOR_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
