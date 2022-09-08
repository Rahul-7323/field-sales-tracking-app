import {useEffect, useState} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";
import socketClient from "socket.io-client";
const SERVER = "http://localhost:5000";

import Sidebar from "../components/Sidebar";

import Customer from "../components/Customer";
import Map from "../components/Map";

const socket = socketClient(SERVER);
socket.on("connection", () => {
  console.log("connected to the server");
});

setInterval(() => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log(pos);

    socket.emit("newLocation", {
      agent_id: "6318e597bebdf9b661bfb279",
      position: pos,
    });
  });
}, 15000);

const AgentView = () => {
  const [customers, setCustomers] = useState([]);
  const [coords, setCords] = useState([]);

  const getCurrentPosition = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(pos);
      map.panTo(pos);
    });
  };

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/customer");
      const responseData = await response.json();

      setCustomers(responseData.customers);
      setCords(
        responseData.customers.map((customer) => {
          return {lat: customer.location.lat, lng: customer.location.lng};
        })
      );
    };
    sendRequest();
  }, []);

  const [map, setMap] = useState(/** @type google.maps.GoogleMap **/ (null));

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyD2ObZG89WV4RLEMgn2Mq6Xoerofjt7sGI",
  });

  if (!isLoaded) return <div>Loading..</div>;

  const panToCurrentPos = () => {
    getCurrentPosition();
  };

  const handleClick = (coord) => {
    console.log("spanned");
    map.panTo(coord);
  };

  return (
    <div className="h-screen relative bg-slate-200 lg:p-5 flex flex-col justify-center align-middle">
      <Sidebar title="CUSTOMERS">
        {customers.length != 0 &&
          customers.map((customer) => {
            return <Customer customer={customer} handleClick={handleClick} />;
          })}
      </Sidebar>
      <div className="z-[1] absolute -top-24 lg:top-0 left-0">
        <Map setMap={setMap} coords={coords} />
      </div>
      <div
        className="z-[2] absolute right-3 bottom-1/2 lg:bottom-10 lg:right-20 bg-blue-600 p-3 rounded-xl text-md lg:text-lg text-white font-bold"
        onClick={panToCurrentPos}
      >
        Current Location
      </div>
    </div>
  );
};

export default AgentView;
