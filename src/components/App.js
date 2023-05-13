import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import GLTF from "./GLTF";
import ThreeD from "./ThreeD";
import ShowLLZ from "./ShowLLZ";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.97627);
  const [lat, setLat] = useState(40.75155);
  const [zoom, setZoom] = useState(15.4);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,
      pitch: 64.9,
      bearing: 172.5,
      antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  },[map]);

  return (
    <div>
      <ThreeD map={map} />
      <GLTF map={map} />
      <ShowLLZ lng={lng} lat={lat} zoom={zoom} />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default App;
