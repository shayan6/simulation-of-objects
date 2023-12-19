import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import CustomMarker from "./markers/CustomMarker";

const MapWithPlaces = () => {
  const markers = useSelector((state) => state.markers.list);
  const zoom = useSelector((state) => state.map.zoom);
  const rotationAngle = useSelector((state) => state.map.rotationAngle);
  const originLatitude = useSelector((state) => state.map.originLatitude);
  const originLongitude = useSelector((state) => state.map.originLongitude);
  const destinationLatitude = useSelector(
    (state) => state.map.destinationLatitude
  );
  const destinationLongitude = useSelector(
    (state) => state.map.destinationLongitude
  );

  const origin = { lat: originLatitude, lng: originLongitude };
  const destination = { lat: destinationLatitude, lng: destinationLongitude };
  const startingTime = Date.now();
  return (
    <div style={{ transform: `rotate(${rotationAngle}deg)` }} >
      <MapContainer
        center={[originLatitude, originLongitude]}
        zoom={zoom}
        style={{
          height: "100vh",
          width: "100vw",
        }}
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
            destination={destination}
            marker={marker}
            speed={parseFloat(marker.speed)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapWithPlaces;
