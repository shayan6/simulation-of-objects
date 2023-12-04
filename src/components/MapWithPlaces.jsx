import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SquareMarker from "./markers/SquareMarker";
import CircleMarker from "./markers/CircleMarker";
import TriangleMarker from "./markers/TriangleMarker";
import MapRotation from "./MapRotation";
import { useSelector } from "react-redux";
import CustomMarker from "./markers/CustomMarker";

const MapWithPlaces = () => {
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
    <>
      <MapContainer
        center={[originLatitude, originLongitude]}
        zoom={zoom}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <MapRotation
          zoom={zoom}
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
        <CustomMarker
          startingTime={startingTime}
          origin={origin}
          destination={destination}
          color={'black'}
          speed={100_000}
        />
      </MapContainer>
    </>
  );
};

export default MapWithPlaces;
