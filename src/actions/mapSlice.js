import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    zoom: 12,
  },
  reducers: {
    setZoom: (state, action) => {
      state.zoom = action.zoom;
    },
  },
});

export const {
  setZoom,
} = mapSlice.actions;

export default mapSlice.reducer;
