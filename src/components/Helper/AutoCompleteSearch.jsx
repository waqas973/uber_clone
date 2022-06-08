import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AutoCompleteSearch = ({
  topstyle,
  cityKeyword,
  setSelectedLocation,
  setSelectedPickupLocationCoordinates,
  setSelectedDestinationLocationCoordinates,
  isApiCall,
  setIsApiCall,
}) => {
  const [cityData, setCityData] = useState([]);

  // check if mouse it clicked outside of select location container or not
  const wrapperRef = useRef(null);

  // user selected location function
  const userSelectedLocation = city => {
    let x = city.center[0];
    let y = city.center[1];

    // check if setSelectedPickupLocationCoordinates is pass as a props
    if (setSelectedPickupLocationCoordinates) {
      setSelectedPickupLocationCoordinates({ x, y });
    }

    // check if setSelectedDestinationLocationCoordinates is pass as a props
    if (setSelectedDestinationLocationCoordinates) {
      setSelectedDestinationLocationCoordinates({ x, y });
    }

    setSelectedLocation(city.place_name_en);
    setCityData([]);
    setIsApiCall(false);
  };

  // call API in every keystroke
  useEffect(() => {
    if (cityKeyword && isApiCall) {
      const getdata = async () => {
        axios
          .get(
            `${process.env.REACT_APP_MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${cityKeyword}.json?country=pk&language=en&autocomplete=true&fuzzyMatch=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
          )
          .then(res => {
            setCityData(res.data.features);
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      };
      getdata();
    }
  }, [cityKeyword, isApiCall]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setCityData([]);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div
      className="autoComplete__search"
      style={{ top: topstyle }}
      ref={wrapperRef}
    >
      {cityData.length > 0 && (
        <ul>
          {cityData.map(city => (
            <li key={city.id} onClick={() => userSelectedLocation(city)}>
              {city.place_name_en}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteSearch;
