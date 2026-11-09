
import {
  INCREMENT,
  DECREMENT,
  INCREMENT_BY_AMOUNT,
  RESET,
} from './counterActions';

// State ban đầu
const initialState = {
  value: 0,
};

// Reducer
export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };

    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };

    case INCREMENT_BY_AMOUNT:
      return {
        ...state,
        value: state.value + action.payload,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
