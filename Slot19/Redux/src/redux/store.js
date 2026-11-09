
import {
  legacy_createStore as createStore,
  combineReducers,
} from 'redux';

import counterReducer from './counterReducer';

// Kết hợp các Reducer
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Khởi tạo Redux Store
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
