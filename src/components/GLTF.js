import { useEffect } from "react";
import { Threebox } from "threebox-plugin";

// Helper function to initialize Threebox
const initThreebox = (map) => {
  // If Threebox has not been initialized yet, create a new instance
  if (!window.tb) {
    window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
      defaultLights: true,
    });
  }
};

const GLTF = ({ map }) => {
  useEffect(() => {
    // Make sure the map has been loaded before initializing Threebox
    if (!map.current) return;

    // Initialize Threebox
    initThreebox(map.current);

    // When the map's style has finished loading, add the 3D model
    map.current.on("style.load", () => {
      const scale = 3.2;
      const options = {
        obj: "https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf",
        type: "gltf",
        scale: { x: scale, y: scale, z: 3.7 },
        units: "meters",
        rotation: { x: 90, y: -90, z: 0 },
      };

      // Load the 3D model and add it to the Threebox scene
      window.tb.loadObj(options, (model) => {
        model.setCoords([-73.976799, 40.754145, 200]);
        model.setRotation({ x: 0, y: 0, z: 241 });
        window.tb.add(model);
      });

      // Add a custom layer to the map that renders the Threebox scene
      map.current.addLayer({
        id: "custom-threebox-model",
        type: "custom",
        renderingMode: "3d",
        render: function () {
          window.tb.update();
        },
      });
    });
  }, [map]);

  return null;
};

export default GLTF;