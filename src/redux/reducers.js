import { combineReducers } from 'redux';
import { ADD_SQUARE, TOGGLE_SQUARE, UPDATE_SQUARE } from './actions';
import { getRandomAngle, getRandomSpeed } from '../utils'; // Adjust the import path as needed

const squaresReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SQUARE:
      return [...state, action.payload.square];
    case TOGGLE_SQUARE:
      return state.map((square) =>
        square.id === action.payload.id ? { ...square, isActive: !square.isActive } : square
      );
      case UPDATE_SQUARE:
        return state.map((square) => {
          const { lat, lng } = square.position;
      
          if (isNaN(lat) || isNaN(lng)) {
            // Handle invalid or missing coordinates
            return square;
          }
      
          const angle = getRandomAngle();
          const speed = getRandomSpeed(50, 80);
      
          const newPosition = {
            lat: lat + (speed / 3600) * Math.sin(angle),
            lng: lng + (speed / 3600) * Math.cos(angle),
          };
      
          return {
            ...square,
            position: newPosition,
            prevPosition: square.position,
          };
        });
    default:
      return state;
  }
};

// Add reducers for other object types

const objectsReducer = combineReducers({
  squares: squaresReducer,
  // Add other object types here
});

const rootReducer = combineReducers({
  objects: objectsReducer,
});

export default rootReducer;
