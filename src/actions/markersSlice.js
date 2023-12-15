import { createSlice } from "@reduxjs/toolkit";

const minSpeed = 50;
const maxSpeed = 80;
const speedSQUARE = Math.floor(
  Math.random() * (maxSpeed - minSpeed + 1) + minSpeed
);

const speedCIRCLE = Math.floor(Math.random() * (300 - 110 + 1) + 110);

const markersSlice = createSlice({
  name: "markers",
  initialState: {
    list: [
      {
        color: "#6835b8",
        speed: speedSQUARE,
        icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: #6835b8; border-radius: 2px;"></div>`,
        movement: "greatCircle",
      },
      {
        color: "#439ad3",
        speed: speedCIRCLE,
        icon: `<i class="fas fa-circle fa-2x" style="color: #439ad3;"></i>`,
        movement: "circularPath",
      },
    ],
  },
  reducers: {
    addMarker: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addMarker } = markersSlice.actions;

export default markersSlice.reducer;
