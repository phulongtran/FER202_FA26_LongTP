
import { configureStore } from '@reduxjs/toolkit';


import counterReducer from '../redux/counterReducer';


export const store = configureStore({
  reducer: {
    counter: counterReducer,

 
  },
});
