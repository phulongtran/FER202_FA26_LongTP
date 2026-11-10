
import { configureStore } from '@reduxjs/toolkit';

// Bài 1: Redux thuần
import counterReducer from '../redux/counterReducer';

// Bài 4: Redux Toolkit
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
