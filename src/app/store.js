import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from '../features/user/userSlice';
import errorReducer from '../features/error/errorSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
  middleware: [logger],
});
