import { combineReducers } from 'redux';
import { actorReducer } from './actorReducer';
import { movieReducer } from './movieReducer';

export default combineReducers({
  actorData: actorReducer,
  movieData: movieReducer,
});
