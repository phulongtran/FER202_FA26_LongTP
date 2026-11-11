
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import uiReducer from './features/ui/uiSlice';
import todosReducer from './features/todos/todosSlice';
export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      ui: uiReducer,
      todos: todosReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
