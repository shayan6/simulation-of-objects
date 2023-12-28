import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the location slice
const initialState = {
  city: '',
  country: '',
  loading: false,
  error: null,
};

// Define the asynchronous action using createAsyncThunk
export const fetchAddress = createAsyncThunk('location/fetchAddress', async ({ latitude, longitude }) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    return response.data.address;
  } catch (error) {
    throw error;
  }
});

// Create a slice for location with reducer and actions
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city || action.payload.town || action.payload.village || action.payload.hamlet;
        state.country = action.payload.country;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default locationSlice.reducer;
