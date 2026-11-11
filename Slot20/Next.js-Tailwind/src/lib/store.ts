import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import uiReducer from './features/ui/uiSlice';
import todosReducer from './features/todos/todosSlice';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      ui: uiReducer,
      todos: todosReducer,
      products: productsReducer,
      cart: cartReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
