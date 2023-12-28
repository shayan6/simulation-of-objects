import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../actions/locationSlice';
import mapReducer from '../actions/mapSlice';
import markersReducer from '../actions/markersSlice';
import addressSlice from '../actions/addressSlice';
import countrySlice from '../actions/countrySlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    address: addressSlice,
    country: countrySlice,
    location: locationReducer,
    markers: markersReducer,
    map: mapReducer,
  },
});

export default store;
