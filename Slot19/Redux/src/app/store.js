
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../redux/counterReducer';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import studentsReducer from '../features/students/studentsSlice';

// Bài 2: Todo List
import todosReducer from '../redux/todos/reducers';

// Bài 3: Users
import userReducer from '../redux/users/userReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
    students: studentsReducer,
    todos: todosReducer,

    // Bài 3
    users: userReducer,
  },
});
