import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import CustomMarker from "./markers/CustomMarker";
import 'leaflet-rotate';
import { originLatitude, originLongitude } from "../actions/markersSlice";

const MapWithPlaces = () => {
  const markers = useSelector((state) => state.markers.list);
  const zoom = useSelector((state) => state.map.zoom);
  const startingTime = Date.now();
  return (
    <>
      <MapContainer
        className="map"
        center={[originLatitude, originLongitude]}
        zoom={zoom}
        rotate={true}
        touchRotate={true}
        rotateControl={{
          closeOnZeroBearing: false
        }}
        bearing={0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            startingTime={startingTime}
            marker={marker}
            speed={parseFloat(marker.speed)}
          />
        ))}
      </MapContainer>
    </>
  );
};

export default MapWithPlaces;
