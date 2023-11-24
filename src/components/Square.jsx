import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomSpeed, getRandomAngle } from '../utils';
import { addSquare, toggleSquare, updateSquare } from '../redux/actions';
import ObjectList from './ObjectList';

const Square = ({ initialPosition }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = Date.now(); // Use a unique ID for each object
    dispatch(addSquare({ id, position: initialPosition }));
  }, [dispatch, initialPosition]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      dispatch(updateSquare());
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [dispatch]);

  return <ObjectList objectType="squares" />;
};

export default Square;
