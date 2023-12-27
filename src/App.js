import "./App.css";

import * as React from "react";
import { useState, useEffect, useRef } from "react";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";

const MAX_ZOOM = 17;

function App() {
  const mapElement = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const [mapLongitude, setMapLongitude] = useState(19.449825312197184);
  const [mapLatitude, setMapLatitude] = useState(-70.68639189195603);
  const [mapZoom, setMapZoom] = useState(12);

  const gpsUpdate = () => {
    axios
      .get("http://3.144.25.219:3001/api/terminal", {
        params: {
          idTerminal: 1,
        },
      })
      .then(function (response) {
        if (response.data.results.length > 0) {
          setMapLatitude(response.data.results[0].latitud);
          setMapLongitude(response.data.results[0].longitud);
        } else {
          console.log(response.data.results.length);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onMarkerClick = () => {
    alert('Jeje')
  }

  setInterval(gpsUpdate, 2000);

  useEffect(() => {
    map.current = tt.map({
      key: "cWyOruajYc67Vd8BOGfvSYQECKrLOAVG",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });

    marker.current = new tt.Marker()
      .setLngLat([mapLongitude, mapLatitude])
      .addTo(map.current)
      .on("click", onMarkerClick);

    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (marker.current && map.current) {
      map.current.setCenter([mapLongitude, mapLatitude]);
      marker.current.setLngLat([mapLongitude, mapLatitude]);
    }
  }, [mapLatitude, mapLongitude]);

  return (
    <div className="App">
      <div className="navbar">SantiaGo </div>
      <div ref={mapElement} className="mapDiv" />
    </div>
  );
}

export default App;
