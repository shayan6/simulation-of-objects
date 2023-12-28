import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
};

export const fetchLatLngFromCountry = createAsyncThunk(
  'location/fetchLatLngFromCountry',
  async (countryName) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&country=${encodeURIComponent(countryName)}`
      );
      const data = response.data[0];
      return { latitude: parseFloat(data.lat), longitude: parseFloat(data.lon) };
    } catch (error) {
      throw error;
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatLngFromCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatLngFromCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
      })
      .addCase(fetchLatLngFromCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
