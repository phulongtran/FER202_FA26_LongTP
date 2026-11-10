
import { combineReducers } from 'redux';

import todosReducer from './todosReducer';
import filterReducer from './filterReducer';

const todoReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
});

export default todoReducer;
