import React, { useReducer } from 'react';
import ActorContext from './actorContext';
import axios from 'axios';
import config from '../../config';
import ActorReducer from './actorReducer';
import {
  ACTOR_NEW_KEYWORDS,
  ACTOR_SEARCH_REQUEST,
  ACTOR_SEARCH_SUCCESS,
  ACTOR_SEARCH_FAIL,
  ACTOR_DETAILS_REQUEST,
  ACTOR_DETAILS_SUCCESS,
  ACTOR_DETAILS_FAIL,
} from '../../types/actorTypes';

const ActorState = (props) => {
  const initialState = {
    keywords: '',
    loading: false,
    person: { results: [] },
    actor: {},
    message: '',
  };

  const [state, dispatch] = useReducer(ActorReducer, initialState);

  const { API_KEY } = config;

  // Fetch person from TMDB API search
  const getPerson = async (keywords) => {
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

  // Fetch next page of person search data
  const personNextPage = async (keywords, page) => {
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

  // Fetch details on an actor
  const getActorDetails = async (id) => {
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

  return (
    <ActorContext.Provider
      value={{
        keywords: state.keywords,
        person: state.person,
        loading: state.loading,
        actor: state.actor,
        message: state.message,
        getPerson,
        personNextPage,
        getActorDetails,
      }}
    >
      {props.children}
    </ActorContext.Provider>
  );
};

export default ActorState;
