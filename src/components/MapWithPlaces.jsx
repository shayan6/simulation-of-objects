import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SquareMarker from "./markers/SquareMarker";
import CircleMarker from "./markers/CircleMarker";
import TriangleMarker from "./markers/TriangleMarker";
import MapRotation from "./MapRotation";
import { useSelector } from "react-redux";

const MapWithPlaces = () => {
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
    <div>
      <MapContainer
        center={[originLatitude, originLongitude]}
        zoom={12}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <MapRotation
          rotationAngle={rotationAngle}
          originLatitude={originLatitude}
          originLongitude={originLongitude}
          destinationLatitude={destinationLatitude}
          destinationLongitude={destinationLongitude}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <SquareMarker
          startingTime={startingTime}
          origin={origin}
          destination={destination}
        />
        <CircleMarker
          startingTime={startingTime}
          origin={origin}
          destination={destination}
        />
        <TriangleMarker
          startingTime={startingTime}
          origin={origin}
          destination={destination}
        />
      </MapContainer>
    </div>
  );
};

export default MapWithPlaces;
