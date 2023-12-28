import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 function from the uuid library

const minSpeed = 50;
const maxSpeed = 80;
const speedSQUARE = Math.floor(
  Math.random() * (maxSpeed - minSpeed + 1) + minSpeed
);

const speedCIRCLE = Math.floor(Math.random() * (300 - 110 + 1) + 110);

const speedTRIANGLE = Math.floor(Math.random() * 500 + 1700); // Random speed between 1700 and 2200 km/h

export const destinationLatitude = 59.3218031;
export const destinationLongitude = 24.5520983;

export const originLatitude = 59.437;
export const originLongitude = 24.7536;

const markersSlice = createSlice({
  name: "markers",
  initialState: {
    list: [
      {
        id: uuidv4(),
        color: "#6835b8",
        speed: speedSQUARE,
        icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: #6835b8; border-radius: 2px;"></div>`,
        movement: "greatCircle",
        originCountry: 'Estonia',
        destinationCountry: 'Estonia',
        destinationLatitude,
        destinationLongitude,
        originLatitude,
        originLongitude,
      },
      {
        id: uuidv4(),
        color: "#439ad3",
        speed: speedCIRCLE,
        icon: `<i class="fas fa-circle fa-2x" style="color: #439ad3;"></i>`,
        movement: "circularPath",
        originCountry: 'Estonia',
        destinationCountry: 'Estonia',
        destinationLatitude,
        destinationLongitude,
        originLatitude,
        originLongitude,
      },
      {
        id: uuidv4(),
        color: "#dc1d65",
        speed: speedTRIANGLE,
        icon: `<i class="fas fa-play fa-2x" style="color: #dc1d65;"></i>`,
        movement: "greatCircle",
        originCountry: 'Estonia',
        destinationCountry: 'Estonia',
        destinationLatitude,
        destinationLongitude,
        originLatitude,
        originLongitude,
      },
    ],
  },
  reducers: {
    addMarker: (state, action) => {
      const newMarker = { id: uuidv4(), ...action.payload }; // Use uuidv4() to generate a unique ID
      state.list.push(newMarker);
    },
    deleteMarker: (state, action) => {
      const markerIndex = state.list.findIndex(marker => marker.id === action.payload.id);
      if (markerIndex !== -1) {
        state.list.splice(markerIndex, 1);
      }
    },
    editMarker: (state, action) => {
      const { id, updatedMarker } = action.payload;
      const markerIndex = state.list.findIndex(marker => marker.id === id);
      if (markerIndex !== -1) {
        state.list[markerIndex] = { ...state.list[markerIndex], ...updatedMarker };
      }
    },
  },
});

export const { addMarker } = markersSlice.actions;

export default markersSlice.reducer;
