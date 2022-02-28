import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveLoginUser: (state, action) => {
      const email = action.payload;

      state.email = email;
    },
    logoutUser: (state) => {
      state.email = null;
    },
  },
});

export const { saveLoginUser, logoutUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
