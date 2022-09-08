import {useEffect, useState} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";

import Sidebar from "../components/Sidebar";

import Agent from "../components/Agent";
import Map from "../components/Map";

const SupervisorView = () => {
  const [agents, setAgents] = useState([]);
  const [coords, setCords] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/fieldAgent");
      const responseData = await response.json();

      setAgents(responseData.fieldAgents);
      setCords(
        responseData.fieldAgents.map((agent) => {
          return {lat: agent.location.lat, lng: agent.location.lng};
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

  const handleClick = (coord) => {
    console.log("spanned");
    map.panTo(coord);
  };

  return (
    <div className="h-screen relative bg-slate-200 lg:p-5 flex flex-col justify-center align-middle">
      <Sidebar title="FIELD AGENTS">
        {agents.length != 0 &&
          agents.map((agent) => {
            return <Agent agent={agent} handleClick={handleClick} />;
          })}
      </Sidebar>
      <div className="z-[1] absolute -top-24 lg:top-0 left-0">
        <Map setMap={setMap} coords={coords} />
      </div>
    </div>
  );
};

export default SupervisorView;
