import { createSlice } from "@reduxjs/toolkit";

const markersSlice = createSlice({
  name: "markers",
  initialState: {
    list: [
      {
        color: "teal",
        speed: 100000,
        icon: `<i class="fas fa-plane" style="color: teal; font-size: 20px;"></i>`,
        movement: "greatCircle",
      },
    ],
  },
  reducers: {
    addMarker: (state, action) => {
      state.list.push(action.payload);
    },
    removeMarker: (state, action) => {
      state.list = state.list.filter((marker, index) => index !== action.payload);
    },
    updateMarker: (state, action) => {
      const { index, updatedMarker } = action.payload;
      state.list[index] = updatedMarker;
    },
  },
});

export const { addMarker, removeMarker, updateMarker } = markersSlice.actions;

export default markersSlice.reducer;
