import {useState} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";

import Agent from "./components/Agent";
import Map from "./components/Map";

const coords = [
  {lat: 48.8584, lng: 2.2945},
  {lat: 34, lng: 76},
  {lat: 24, lng: 12},
  {lat: 74, lng: 90},
  {lat: 14, lng: 23},
  {lat: 34, lng: 13},
];

const App = () => {
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
    <div className="h-screen relative bg-slate-200 p-5 flex flex-col justify-center align-middle">
      <div
        className="z-[2] rounded-3xl h-[80%] w-[25rem] flex flex-col absolute top-[6rem] 
      left-[3rem] bg-white overflow-auto"
      >
        {coords.map((coord) => {
          return (
            <Agent lat={coord.lat} lng={coord.lng} handleClick={handleClick} />
          );
        })}
      </div>
      <div className="z-[1] absolute top-0 left-0">
        <Map setMap={setMap} coords={coords} />
      </div>
    </div>
  );
};

export default App;
