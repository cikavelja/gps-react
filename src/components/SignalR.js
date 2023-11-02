import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import tileLayer from '../util/tileLayer';
import '../css/TrackingMap.css';

const SignalR = () => {
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState([52.22977, 21.01178]);

  const connectWithAccessToken = () => {
    if (accessToken) {
      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`https://gps-api-7.azurewebsites.net/graphql/gpshub?access_token=${accessToken}`)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      hubConnection.on("NewPossition", (user, position) => {
        console.log(`${user} sent: ${JSON.stringify(position)}`);
        if (markers.length === 0) {
          // If it's the first message, set the map center
         ;
          setMapCenter(mapCenter[position.latitude, position.longitude]);
        }

        // Add the new position as a marker
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            lat: position.latitude,
            lng: position.longitude,
            title: user,
          },
        ]);
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
    }
  };

  const sendMessage = async () => {
    setMapCenter([43.3261186885924, 21.900331663762504]);
  };

  useEffect(() => {
    // Whenever the mapCenter changes, trigger a re-render
  }, [mapCenter]);

  const Recenter = ({lat,lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}
  return (  
    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <div className="container">
          <div className="mb-3">
            <input
              type="text"
              id="accessTokenInput"
              className="form-control"
              placeholder="Enter Access Token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={connectWithAccessToken}
          >
            Connect with Access Token
          </button>
          <div className="mb-3">
            <input
              type="text"
              id="messageInput"
              className="form-control"
              placeholder="Enter a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={sendMessage}>
            Send Message
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignalR;
