import React from "react";

const ShowLLZ = ({ lng, lat, zoom }) => {
  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </>
  );
};

export default ShowLLZ;
