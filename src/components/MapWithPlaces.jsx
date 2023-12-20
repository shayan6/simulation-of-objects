import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import CustomMarker from "./markers/CustomMarker";
import 'leaflet-rotate';

const MapWithPlaces = () => {
  const markers = useSelector((state) => state.markers.list);
  const zoom = useSelector((state) => state.map.zoom);
  const originLatitude = useSelector((state) => state.map.originLatitude);
  const originLongitude = useSelector((state) => state.map.originLongitude);
  const origin = { lat: originLatitude, lng: originLongitude };
  const startingTime = Date.now();
  return (
    <>
      <MapContainer
        center={[originLatitude, originLongitude]}
        zoom={zoom}
        style={{
          height: "100vh",
          width: "100vw",
        }}
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
        {markers.map((marker, index) => (
          <CustomMarker
            key={index}
            startingTime={startingTime}
            origin={origin}
            marker={marker}
            speed={parseFloat(marker.speed)}
          />
        ))}
      </MapContainer>
    </>
  );
};

export default MapWithPlaces;
