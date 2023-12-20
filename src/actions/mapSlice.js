import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    zoom: 12,
    originLatitude: 59.437,
    originLongitude: 24.7536,
  },
  reducers: {
    setOriginLatitude: (state, action) => {
      state.originLatitude = action.payload;
    },
    setOriginLongitude: (state, action) => {
      state.originLongitude = action.payload;
    },
  },
});

export const {
  setOriginLatitude,
  setOriginLongitude,
} = mapSlice.actions;

export default mapSlice.reducer;
