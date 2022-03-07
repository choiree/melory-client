import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uri: '',
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    playCurrentTrack: (state, action) => {
      const musicUri = action.payload;

      state.uri = musicUri;
    },
    removeTrack: (state) => {
      state.uri = null;
    },
  },
});

export const { playCurrentTrack, removeTrack } = musicSlice.actions;

export const selectUser = (state) => state.music;

export default musicSlice.reducer;
