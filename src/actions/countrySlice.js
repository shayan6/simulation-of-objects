import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const COUNTRY_API_URL = 'https://restcountries.com/v3.1/all';

export const getAllCountries = async () => {
  try {
    const response = await axios.get(COUNTRY_API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllCountries = createAsyncThunk('country/fetchAllCountries', async () => {
  try {
    const countries = await getAllCountries();
    return countries;
  } catch (error) {
    throw error;
  }
});

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countrySlice.reducer;
