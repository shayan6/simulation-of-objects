import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    zoom: 12,
    rotationAngle: 0,
    originLatitude: 59.437,
    originLongitude: 24.7536,
    destinationLatitude: 59.3218031,
    destinationLongitude: 24.5520983,
  },
  reducers: {
    setRotationAngle: (state, action) => {
      state.rotationAngle = action.payload;
    },
    setOriginLatitude: (state, action) => {
      state.originLatitude = action.payload;
    },
    setOriginLongitude: (state, action) => {
      state.originLongitude = action.payload;
    },
    setDestinationLatitude: (state, action) => {
      state.destinationLatitude = action.payload;
    },
    setDestinationLongitude: (state, action) => {
      state.destinationLongitude = action.payload;
    },
  },
});

export const {
  setRotationAngle,
  setOriginLatitude,
  setOriginLongitude,
  setDestinationLatitude,
  setDestinationLongitude,
} = mapSlice.actions;

export default mapSlice.reducer;
