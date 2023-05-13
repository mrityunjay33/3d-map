import { useEffect } from "react";

const ThreeD = ({ map }) => {
  useEffect(() => {
    // if map is not available, return
    if (!map.current) return;

    // on map style load, add raster-dem source and set terrain layer with exaggerated height
    map.current.on("style.load", () => {
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 24,
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    });
  }, [map]);

  return null;
};

export default ThreeD;
