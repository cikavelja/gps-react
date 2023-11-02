import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, CircleMarker, Popup, Polyline, Polygon, Rectangle, useMapEvent, useMap, useMapEvents, Marker } from 'react-leaflet';
import useAuth from "../hooks/useAuth";
import Map from './Map';
import * as signalR from "@microsoft/signalr";

import '../css/TrackingMap.css';

const TrackingMap = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(data, null, 2));
  const [accessToken, setAccessToken] = useState("");
  const { auth } = useAuth();
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");


  const handleRefreshMap = (index) => {
    setIndex(index);
    refreshMap(jsonInput, setData, setIndex);
  };
  const connectWithAccessToken = () => {
    //debugger;
    const hubConnection = new signalR.HubConnectionBuilder()
      //.withUrl(`http://localhost:5157/gpshub?access_token=${auth.accessToken}`)
      .withUrl(`https://gps-api-7.azurewebsites.net/gpshub?access_token=${auth.accessToken}`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    hubConnection.on("NewPossition", (user, position) => {
      console.log(`${user} sent: ${JSON.stringify(position)}`);


      // Find the index of the item with the same name
      let selectedIndex = -1;
      if (data) {
        selectedIndex = data.findIndex(item => item.name.toLowerCase() === position.user.email);
      };

      if (selectedIndex !== -1) {
        // If an item with the same name exists, add new latitude, longitude, and speed to it
        const newCoordinates = {
          latitude: position.latitude,
          longitude: position.longitude,
          speed: position.speed,
        };

        data[selectedIndex].coordinates.push(newCoordinates);
      } else {
        // If the item doesn't exist, create a new item
        const newEntry = {
          name: position.user.email,
          coordinates: [
            {
              latitude: position.latitude,
              longitude: position.longitude,
              speed: position.speed,
            },
          ],
        };
        //setIndex
        data.push(newEntry);
      }

      console.log(data);
      refreshMap(JSON.stringify(data), setData, setIndex);
    });

    hubConnection
      .start()
      .then(() => {
        console.log("SignalR Connected.");
        setConnection(hubConnection);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(connectWithAccessToken, 5000);
      });
  };
  useEffect(() => {
    connectWithAccessToken();
  }, []);

  return (

      <div className="container-fluid">
        <div className="row no-gutters justify-content-center align-items-center" >
          <div className="col-6 bg-success">
            <div className="container py-5 text-center">
              <h1 className="display-5 fw-bold"></h1>
              {
                data?.length ? (
                  <Map data={data} index={index} />
                ) : (
                  <p>No data available</p>
                )
              }
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" >

              {
                data?.length ? (
                  data.map(({ name }, idx) => (
                    <button type="button" className="btn btn-secondary" onClick={() => setIndex(idx)} key={idx}>{`Go to ${name}`}</button>

                    ))
                ) : (
                  <p>No data available</p>
                )
              }
                    </div>
                  </div>

            </div>
          </div>
        </div>
      </div>



  );
};

export default TrackingMap;
function refreshMap(jsonInput, setData, setIndex) {
  try {
    //debugger;
    const parsedData = JSON.parse(jsonInput);
    setData(parsedData);
    //setIndex(0);
  } catch (error) {
    alert('Invalid JSON data. Please enter valid JSON.');
  }
}

