
import * as T from '../actionTypes';

const initialState = 'all';

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case T.SET_FILTER:
      return action.payload;

    default:
      return state;
  }
}
