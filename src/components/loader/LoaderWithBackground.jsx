import React from "react";

const LoaderWithBackground = ({ isBgwhite }) => {
  return (
    <div
      id="cover-spin"
      style={isBgwhite ? { backgroundColor: "white" } : { backgroundColor: "rgba(255, 255, 255, 0.7)" }}
    ></div>
  );
};

export default LoaderWithBackground;
