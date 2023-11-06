import React, { useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import Map from './Map';
import * as signalR from "@microsoft/signalr";
import { Link } from 'react-router-dom';


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
    <section>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">Admin</Link>
              </li>
              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle show" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My targets</a>
                <div class="dropdown-menu show" data-bs-popper="static">
                {
                    data?.length ? (
                      data.map(({ name }, idx) => (
                        <a class="dropdown-item" href="#" onClick={() => setIndex(idx)} key={idx}>{`Go to ${name}`}</a>
                        ))
                    ) : (
                      <p>No users online</p>
                    )
                  }

                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>

      <div className='container mt-5'>

        <div className="container-fluid">

          <div className="row no-gutters justify-content-center align-items-center" >
            <div className="col">
              <h1 className="display-5 fw-bold"></h1>
              {
                data?.length ? (
                  <Map data={data} index={index} />
                ) : (
                  <p>No data available</p>
                )
              }


            </div>
          </div>
        </div>
      </div>
    </section>



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

