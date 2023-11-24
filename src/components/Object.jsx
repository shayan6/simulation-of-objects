import React from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';

const Object = ({ type, id, position, isActive, handleClick, info }) => (
  <div>
    <Marker position={position} eventHandlers={{ click: handleClick }}>
      <Popup>
        <div>
          <p>Object Type: {type}</p>
          <p>ID: {id}</p>
          <p>{info}</p>
        </div>
      </Popup>
    </Marker>
    {isActive && <Polyline positions={[position, position]} color="red" weight={3} opacity={0.7} />}
  </div>
);

export default Object;
