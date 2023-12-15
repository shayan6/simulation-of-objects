import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../actions/mapSlice';
import markersReducer from '../actions/markersSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    markers: markersReducer,
    map: mapReducer,
  },
});

export default store;
