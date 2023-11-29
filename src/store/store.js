import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../actions/mapSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export default store;
