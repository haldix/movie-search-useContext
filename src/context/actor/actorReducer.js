import {
  ACTOR_SEARCH_REQUEST,
  ACTOR_SEARCH_SUCCESS,
  ACTOR_SEARCH_FAIL,
  ACTOR_NEW_KEYWORDS,
  ACTOR_DETAILS_REQUEST,
  ACTOR_DETAILS_SUCCESS,
  ACTOR_DETAILS_FAIL,
} from '../../types/actorTypes';

const actorReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTOR_NEW_KEYWORDS:
      return { ...state, keywords: payload };
    case ACTOR_SEARCH_REQUEST:
      return { ...state, loading: true };
    case ACTOR_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        person: payload,
      };
    case ACTOR_SEARCH_FAIL:
      return {
        message: payload,
      };
    case ACTOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ACTOR_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        actor: payload,
      };
    case ACTOR_DETAILS_FAIL:
      return {
        message: payload,
      };
    default:
      return state;
  }
};

export default actorReducer;
