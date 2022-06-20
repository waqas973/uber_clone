import React, { useEffect, useRef, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderWithBackground from "./loader/LoaderWithBackground";
import { MdGpsFixed } from "react-icons/md";
import { useSelector } from "react-redux";
import ubermoto from "../images/uber-vehicles/Uber_Moto_Orange.webp";
import uberauto from "../images/uber-vehicles/uberauto.png";
import ubermini from "../images/uber-vehicles/ubermini.webp";
import jsonData from "../data.json";
import axiosInstance from "../axios/Axios";

const AddressPicker = props => {
  const [isFrom, setIsFrom] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const provider = useRef();
  const searchRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedTo,
    setSelectedTo,
    selectedFrom,
    setSelectedFrom,
    driverResult,
    setDriverResult,
    selectedPointDistance,
    setRideRequestData,
    rideRequestData,
    setCurrentRide,
  } = props;
  const { pickupLocation, destinationLocaiton } = useSelector(({ SelectedLocation }) => SelectedLocation);
  const { user_detail } = useSelector(({ UserLogin }) => UserLogin.userData);
  const { uberauto_price, ubermoto_price, ubermini_price } = jsonData;

  // /**
  //  * handle input changed to get pick up location or destination.
  //  */
  const onInputChanged = e => {
    setDriverResult(null);
    const input = e.target.value;
    provider.current.search({ query: input }).then(results => {
      setSearchResults(() => results);
    });
  };

  /**
   * init provider.
   */
  const initProvider = () => {
    provider.current = new OpenStreetMapProvider({
      params: {
        "accept-language": "en",
        countrycodes: "pk",
      },
    });
  };

  /**
   *
   *  selectedLocation
   */

  const onLocationSelected = selectedLocation => {
    if (selectedLocation && selectedLocation.label && selectedLocation.x && selectedLocation.y) {
      if (isFrom) {
        // set pick up location.
        setSelectedFrom(() => selectedLocation);
        setIsFrom(() => false);
      } else {
        // set destination.
        setSelectedTo(() => selectedLocation);
        setIsFrom(() => true);
      }
      // clear search result.
      setSearchResults(() => []);
      // reset input value.
      searchRef.current.value = "";
    }
  };

  // get current location
  const getUserCurrentLocation = async () => {
    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          axios
            .get(
              `${process.env.REACT_APP_MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?country=pk&language=en&limit=1&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
            )
            .then(res => {
              const selectedLocation = {
                label: res.data.features[0].place_name,
                x: res.data.features[0].center[0],
                y: res.data.features[0].center[1],
              };
              setIsFrom(false);
              setSelectedFrom(() => selectedLocation);
            })
            .catch(() => {
              toast.error("Something went wrong");
            })
            .finally(() => {
              setIsLoading(false);
            });
        },
        function (error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      );
    } else {
      toast.error("Your device does not support geolocation.");
    }
  };

  /**
   * request ride
   */
  const requestRide = async driverid => {
    if (
      selectedFrom &&
      selectedFrom.label &&
      selectedFrom.x &&
      selectedFrom.y &&
      selectedTo &&
      selectedTo.label &&
      selectedTo.x &&
      selectedTo.y
    ) {
      setIsLoading(true);
      const data = {
        destination_label: selectedTo.label,
        pickup_label: selectedFrom.label,
        destination_coordinates: `${selectedTo.x}, ${selectedTo.y}`,
        pickup_coordinates: `${selectedFrom.x}, ${selectedFrom.y}`,
        status: "0",
        requester: user_detail.id,
        deriver: driverid,
      };
      axiosInstance
        .post(`${process.env.REACT_APP_API_BASE_URL}/rider_request/`, JSON.stringify(data))
        .then(res => {
          setRideRequestData(res.data.response);
        })
        .catch(err => {
          toast.error("Something went wrong or check your internet connection!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  /**
   * cancel ride
   *
   */

  const cancelRide = async () => {
    let requestid = "";
    if (rideRequestData[0]) {
      requestid = rideRequestData[0].id;
    } else {
      requestid = rideRequestData.id;
    }
    if (requestid) {
      setIsLoading(true);
      const data = { request_id: requestid, status: "0" };
      axiosInstance
        .post(`${process.env.REACT_APP_API_BASE_URL}/cancel_accept_ride/`, JSON.stringify(data))
        .then(res => {
          setRideRequestData(null);
          setCurrentRide(null);
        })
        .catch(err => {
          toast.error("Something went wrong or check your internet connection!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  /**
   * check vehicle type and set icon and title
   *
   */
  const vehicleType = (type, driverid) => {
    let title = "";
    let icon = "";
    let price = 0;

    switch (type) {
      case "ubermini":
        title = "Uber Mini";
        icon = ubermini;
        price = ubermini_price.price_per_km * parseInt(selectedPointDistance);
        break;
      case "ubermoto":
        title = "Uber Moto";
        icon = ubermoto;
        price = ubermoto_price.price_per_km * parseInt(selectedPointDistance);

        break;
      case "uberauto":
        title = "Uber Auto";
        icon = uberauto;
        price = uberauto_price.price_per_km * parseInt(selectedPointDistance);
        break;
      default:
        title = "Uber Auto";
        icon = uberauto;
        price = uberauto_price.price_per_km * parseInt(selectedPointDistance);
    }

    return (
      <>
        <img src={icon} alt="uber moto" />
        <div className="w-100" style={{ marginLeft: "1rem" }}>
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="vehicle__title">{title}</h5>
            <p>Rs {price.toFixed(2)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="desc">easy and afforable</p>
            <button className="btnn" onClick={() => requestRide(driverid)}>
              request{" "}
            </button>
          </div>
        </div>
      </>
    );
  };

  // call initProvider(); on mount
  useEffect(() => {
    initProvider();
  }, []);

  //  if user select a location. from landing page already  then run useEffect
  useEffect(() => {
    if (pickupLocation && destinationLocaiton) {
      setSelectedFrom(() => pickupLocation);
      setSelectedTo(() => destinationLocaiton);
    }
  }, [pickupLocation, destinationLocaiton]);

  if (rideRequestData && user_detail.account_type === "rider") {
    return (
      <div className="ride-list">
        <div className="ride-list__wrapper" style={{ width: "100%" }}>
          <div className="ride-list__title">Ride Request Submitted</div>
          <div style={{ height: "1px", backgroundColor: "black" }}></div>
        </div>
        <div className="ride-list__content">
          <h3 className="ride-message">Wait for the driver to accept your ride request. </h3>
          <div className="px-4">
            <button className="btnn btnn__cancel" style={{ marginLeft: "auto" }} onClick={cancelRide}>
              cancel ride
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="address">
      <div className="address__title">
        <div className="address__title-container">
          <p className="address__title-from" onClick={() => setIsFrom(true)}>
            {selectedFrom && selectedFrom.label ? selectedFrom.label : "Pickup location ?"}
          </p>
          <p className="address__title-to" onClick={() => setIsFrom(false)}>
            {selectedTo && selectedTo.label ? selectedTo.label : "Destination ?"}
          </p>
        </div>
      </div>
      <div className="search position-relative">
        <input
          className="search__input"
          type="text"
          placeholder={isFrom ? "Add a pickup location" : "Enter your destination"}
          onChange={onInputChanged}
          ref={searchRef}
        />
        {isFrom && (
          <MdGpsFixed
            className="icon"
            title="My current location"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "30px",
              right: "20px",
            }}
            onClick={getUserCurrentLocation}
          />
        )}
        {/* search location result  */}
        <div className="search__result">
          {searchResults &&
            searchResults.length !== 0 &&
            searchResults.map((result, index) => (
              <div className="search__result-item" key={index} onClick={() => onLocationSelected(result)}>
                <div className="search__result-icon">
                  <svg title="LocationMarkerFilled" viewBox="0 0 24 24" className="g2 ec db">
                    <g transform="matrix( 1 0 0 1 2.524993896484375 1.0250244140625 )">
                      <path
                        fillRule="nonzero"
                        clipRule="nonzero"
                        d="M16.175 2.775C12.475 -0.925 6.475 -0.925 2.775 2.775C-0.925 6.475 -0.925 12.575 2.775 16.275L9.475 22.975L16.175 16.175C19.875 12.575 19.875 6.475 16.175 2.775ZM9.475 11.475C8.375 11.475 7.475 10.575 7.475 9.475C7.475 8.375 8.375 7.475 9.475 7.475C10.575 7.475 11.475 8.375 11.475 9.475C11.475 10.575 10.575 11.475 9.475 11.475Z"
                        opacity="1"
                      ></path>
                    </g>
                  </svg>
                </div>
                <p className="search__result-label">{result.label}</p>
              </div>
            ))}
        </div>

        {/* avaialble vehicles result */}

        <div className="vehicle__result">
          {driverResult !== null && driverResult.length === 0 ? (
            <p>No available rides found please select different locations</p>
          ) : (
            driverResult !== null &&
            driverResult.map(result => (
              <div className="single__vehicle" key={result.id}>
                {vehicleType(result.vehicle, result.id)}
              </div>
            ))
          )}
        </div>
      </div>

      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default AddressPicker;
