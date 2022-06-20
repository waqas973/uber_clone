import React, { useRef, useState } from "react";

import jsonData from "../../data.json";

const AutoCompleteCities = ({
  topstyle,
  cityKeyword,
  setSelectedLocation,
  setSelectedPickupLocationCoordinates,
  setSelectedDestinationLocationCoordinates,
  isApiCall,
  setIsApiCall,
}) => {
  const { cities_data } = jsonData;
  const [cityData, setCityData] = useState(cities_data);

  // check if mouse it clicked outside of select location container or not
  const wrapperRef = useRef(null);

  // user selected location function
  const userSelectedLocation = city => {
    let x = city.lat;
    let y = city.lng;

    // check if setSelectedPickupLocationCoordinates is pass as a props
    if (setSelectedPickupLocationCoordinates) {
      setSelectedPickupLocationCoordinates({ x, y });
    }

    // check if setSelectedDestinationLocationCoordinates is pass as a props
    if (setSelectedDestinationLocationCoordinates) {
      setSelectedDestinationLocationCoordinates({ x, y });
    }

    setSelectedLocation(city.name);
    setIsApiCall(false);
  };

  return (
    <div
      className="autoComplete__search"
      style={{
        top: topstyle,
        maxHeight: "13rem",
        overflowX: "hidden",
        overflowY: "auto",
        display: `${cityKeyword && isApiCall ? "block" : "none"}`,
      }}
      ref={wrapperRef}
    >
      {cityData.length > 0 && (
        <ul style={{ padding: `${cityKeyword && (!isApiCall || cityData.length === 0) && "0rem"}` }}>
          {cityData
            .filter(city => city.name.toLowerCase().includes(cityKeyword.toLowerCase()))
            .map(city => (
              <li key={city.lat} onClick={() => userSelectedLocation(city)}>
                {city.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteCities;
