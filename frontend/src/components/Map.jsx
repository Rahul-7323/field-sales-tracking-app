import {useState} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";

const Map = ({setMap, coords, agentPos}) => {
  return (
    <GoogleMap
      zoom={15}
      center={{lat: 44, lng: -80}}
      mapContainerStyle={{
        width: "100vw",
        height: "100vh",
      }}
      onLoad={(map) => setMap(map)}
    >
      {coords.map((coord) => {
        return <MarkerF position={coord} />;
      })}

      {agentPos && <MarkerF position={agentPos} />}
    </GoogleMap>
  );
};

export default Map;
