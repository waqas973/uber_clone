import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSignal, FaCar } from "react-icons/fa";
import { MdGpsFixed } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSelectedLocations } from "../../redux/actions/Actions";
import AutoCompleteSearch from "../Helper/AutoCompleteSearch";
import LoaderWithBackground from "../loader/LoaderWithBackground";

const Banner = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [pickupKeyword, setPickupKeyword] = useState("");
  const [destinationKeyword, setDestinationKeyword] = useState("");
  const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
  const [selectedPickupLocationCoordinates, setSelectedPickupLocationCoordinates] = useState("");
  const [selectedDestinationLocationCoordinates, setSelectedDestinationLocationCoordinates] = useState("");
  const [isPickApiCall, setIsPickApiCall] = useState(false);
  const [isDestinationApiCall, setIsDestinationApiCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { IsUserLogIn } = useSelector(({ UserLogin }) => UserLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestRideHander = () => {
    if (!selectedPickupLocation || !selectedDestinationLocation) {
      toast.error("Please select pickup and destination location from dropdown list");
      return;
    }
    // navigate("/ride/request");
    let pickupLocationData = {
      label: selectedPickupLocation,
      x: selectedPickupLocationCoordinates.x,
      y: selectedPickupLocationCoordinates.y,
    };
    let destinationLocationData = {
      label: selectedDestinationLocation,
      x: selectedDestinationLocationCoordinates.x,
      y: selectedDestinationLocationCoordinates.y,
    };

    dispatch(userSelectedLocations({ pickupLocationData, destinationLocationData }));
    if (IsUserLogIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
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
              setPickupKeyword(res.data.features[0].place_name);
              setSelectedPickupLocation(res.data.features[0].place_name);
              const x = res.data.features[0].center[0];
              const y = res.data.features[0].center[1];
              setSelectedPickupLocationCoordinates({ x, y });
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

  // if user has selected location then set setCityKeyword
  useEffect(() => {
    setPickupKeyword(selectedPickupLocation);
  }, [selectedPickupLocation]);

  useEffect(() => {
    setDestinationKeyword(selectedDestinationLocation);
  }, [selectedDestinationLocation]);

  return (
    <header className="hero hero__top">
      <div className="hero-container"></div>
      {/* card  */}
      <div className="card-wrapper  ">
        <div className="card">
          {/* card header */}
          <div className="card-header d-flex justify-content-between align-items-center text-center  ">
            <div
              style={{ cursor: "pointer" }}
              className={`px-2 ${activeMenu === 0 && "isActive"}`}
              onClick={() => setActiveMenu(0)}
            >
              <FaSignal className="icon" /> <p>Drive</p>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className={`px-2 ${activeMenu === 1 && "isActive"}`}
              onClick={() => setActiveMenu(1)}
            >
              <FaCar className="icon" /> <p>Ride</p>
            </div>
          </div>

          {/* card body  */}
          <div className="card-body">
            {activeMenu === 0 ? (
              <div className="driver__container">
                <h2>Get in the driver’s seat and get paid</h2>
                <p className="my-4">Drive on the platform with the largest network of active riders.</p>
                <button className="btnn btnn__signup" onClick={() => navigate("/signup")}>
                  sign up for drive
                </button>
              </div>
            ) : (
              <div className="rider__container">
                <h2>Get in the driver’s seat and get paid</h2>
                <form className="py-4">
                  <div className="form__control--wrapper d-flex justify-content-between align-items-center mb-2 position-relative">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter pickup location"
                      value={pickupKeyword}
                      autoComplete="off"
                      onChange={e => {
                        setPickupKeyword(e.target.value);
                        setSelectedPickupLocation("");
                        setSelectedPickupLocationCoordinates("");
                        setIsPickApiCall(true);
                      }}
                    />
                    <MdGpsFixed
                      className="icon"
                      title="My current location"
                      style={{ cursor: "pointer" }}
                      onClick={getUserCurrentLocation}
                    />
                    {/* auto complete  */}
                    <AutoCompleteSearch
                      topstyle="100%"
                      cityKeyword={pickupKeyword}
                      setSelectedLocation={setSelectedPickupLocation}
                      setSelectedPickupLocationCoordinates={setSelectedPickupLocationCoordinates}
                      isApiCall={isPickApiCall}
                      setIsApiCall={setIsPickApiCall}
                    />
                  </div>
                  <div className="form__control--wrapper mb-2 position-relative">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter destination"
                      value={destinationKeyword}
                      autoComplete="off"
                      onChange={e => {
                        setDestinationKeyword(e.target.value);
                        setSelectedDestinationLocation("");
                        setSelectedDestinationLocationCoordinates("");
                        setIsDestinationApiCall(true);
                      }}
                    />
                    {/* auto complete  */}
                    <AutoCompleteSearch
                      topstyle="100%"
                      cityKeyword={destinationKeyword}
                      setSelectedLocation={setSelectedDestinationLocation}
                      setSelectedDestinationLocationCoordinates={setSelectedDestinationLocationCoordinates}
                      isApiCall={isDestinationApiCall}
                      setIsApiCall={setIsDestinationApiCall}
                    />
                  </div>
                  <button type="button" className="btnn btnn__request" onClick={requestRideHander}>
                    request now
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* loading  */}
      {isLoading && <LoaderWithBackground />}
    </header>
  );
};

export default Banner;
