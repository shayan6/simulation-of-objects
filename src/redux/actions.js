// src/redux/actions.js

export const ADD_SQUARE = 'ADD_SQUARE';
export const TOGGLE_SQUARE = 'TOGGLE_SQUARE';
export const UPDATE_SQUARE = 'UPDATE_SQUARE';

export const ADD_CIRCLE = 'ADD_CIRCLE';
export const TOGGLE_CIRCLE = 'TOGGLE_CIRCLE';
export const UPDATE_CIRCLE = 'UPDATE_CIRCLE';

export const ADD_TRIANGLE = 'ADD_TRIANGLE';
export const TOGGLE_TRIANGLE = 'TOGGLE_TRIANGLE';
export const UPDATE_TRIANGLE = 'UPDATE_TRIANGLE';

// Add a common toggle action
export const TOGGLE_OBJECT = 'TOGGLE_OBJECT';

export const addSquare = (square) => ({ type: ADD_SQUARE, payload: { square } });
export const toggleSquare = (id) => ({ type: TOGGLE_SQUARE, payload: { id } });
export const updateSquare = () => ({ type: UPDATE_SQUARE });

export const addCircle = (circle) => ({ type: ADD_CIRCLE, payload: { circle } });
export const toggleCircle = (id) => ({ type: TOGGLE_CIRCLE, payload: { id } });
export const updateCircle = () => ({ type: UPDATE_CIRCLE });

export const addTriangle = (triangle) => ({ type: ADD_TRIANGLE, payload: { triangle } });
export const toggleTriangle = (id) => ({ type: TOGGLE_TRIANGLE, payload: { id } });
export const updateTriangle = () => ({ type: UPDATE_TRIANGLE });

export const toggleObject = (objectType, id) => ({ type: TOGGLE_OBJECT, payload: { objectType, id } });
