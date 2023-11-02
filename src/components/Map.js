import React, { useState, useEffect } from "react";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./constants";

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default function Map(props) {
  const { index, data } = props;

  return (
    <MapContainer
      center={[
        data[index].coordinates[0].longitude,
        data[index].coordinates[0].latitude
      ]}
      zoom={16}
      style={{ height: "90vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></TileLayer>
     {data.map((marker, index) => (
        <div key={index}>
          {marker.coordinates.map((coord, coordIndex) => (
            <Marker
              key={coordIndex}
              position={[coord.latitude, coord.longitude]}
              icon={icon}
            >
              <Popup>{marker.name}
              <br>
              </br>
              Speed: {coord.speed}
              </Popup>
            </Marker>
          ))}
        </div>
      ))}
      <SetViewOnClick
        coords={[
          data[index].coordinates[0].latitude,
          data[index].coordinates[0].longitude
        ]}
      />
    </MapContainer>
  );
}
