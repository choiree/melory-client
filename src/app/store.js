import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import musicReducer from '../features/music/musicSlice';
import errorReducer from '../features/error/errorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    error: errorReducer,
    music: musicReducer,
  },
  middleware: [logger],
});
