import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleObject } from '../redux/actions';

const Controls = ({ objectType, label }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleObject(objectType));
  };

  return (
    <label>
      <input type="checkbox" onChange={handleToggle} />
      {label}
    </label>
  );
};

export default Controls;
