import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  message: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    isOccurError: (state, action) => {
      const errorMessage = action.payload;

      state.isError = true;
      state.message = errorMessage;
    },
    // is: (state) => {
    //   state.email = null;
    // },
  },
});

export const { isOccurError } = errorSlice.actions;
export default errorSlice.reducer;
