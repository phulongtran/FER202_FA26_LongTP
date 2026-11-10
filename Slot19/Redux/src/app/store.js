
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../redux/counterReducer';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import studentsReducer from '../features/students/studentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
    students: studentsReducer,
  },
});
