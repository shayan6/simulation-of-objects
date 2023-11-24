import React from 'react';
import { useSelector } from 'react-redux';
import Object from './Object';

const ObjectList = ({ objectType, objectComponent }) => {
  const objects = useSelector((state) => state.objects[objectType]);

  return (
    <>
      {objects.map((obj) => (
        <Object
          key={obj.id}
          type={objectType}
          id={obj.id}
          position={obj.position}
          isActive={obj.isActive}
          handleClick={obj.handleClick}
          info={obj.info}
        />
      ))}
    </>
  );
};

export default ObjectList;
