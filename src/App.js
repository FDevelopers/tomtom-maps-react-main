import "./App.css";

import * as React from "react";
import { useState, useEffect, useRef } from "react";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const MAX_ZOOM = 17;

function App() {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(-70.6870491511941);
  const [mapLatitude, setMapLatitude] = useState(19.468557004525515);
  const [mapZoom, setMapZoom] = useState(14);
  const [map, setMap] = useState({});

  useEffect(() => {
    let map = tt.map({
      key: "cWyOruajYc67Vd8BOGfvSYQECKrLOAVG",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    setMap(map);
    const marker = new tt.Marker().setLngLat([-70.69449183, 19.47543933]).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div className="App">
      <div className="navbar">SantiaGo  </div>
      <div ref={mapElement} className="mapDiv" />
    </div>
  );
}

export default App;
