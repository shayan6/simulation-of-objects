import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import SquareMarker from "./markers/SquareMarker";
import CircleMarker from "./markers/CircleMarker";
import TriangleMarker from "./markers/TriangleMarker";
import CustomMarker from "./markers/CustomMarker";
import MapRotation from "./MapRotation";

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
    </>
  );
};

export default MapWithPlaces;
