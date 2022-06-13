import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
// import leaflet
import L from "leaflet";
import { useSelector } from "react-redux";
import AddressPicker from "../components/Rider/AddressPicker";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../axios/Axios";
import RideList from "../components/driver/RideList";
import LoaderWithBackground from "../components/loader/LoaderWithBackground";
require("leaflet-routing-machine");

const style = { width: "100%", zIndex: "2" };

const DashboardPage = () => {
  const [selectedTo, setSelectedTo] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [driverResult, setDriverResult] = useState(null);
  const [selectedPointDistance, setSelectedPointDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const map = useRef();
  const routeControl = useRef();
  const {
    IsUserLogIn,
    userData: { user_detail },
  } = useSelector(({ UserLogin }) => UserLogin);

  /**
   * init leaflet map.
   */
  const initMap = () => {
    map.current = L.map("map", {
      center: [31.582045, 74.329376],
      zoom: 13,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  };

  /**
   * init route control.
   */
  const initRouteControl = () => {
    routeControl.current = L.Routing.control({
      show: true,
      fitSelectedRoutes: true,
      plan: false,
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: "0.7",
            weight: 6,
          },
        ],
      },

      router: L.Routing.mapbox(`${process.env.REACT_APP_MAPBOX_TOKEN}`),
    })
      .addTo(map.current)
      .getPlan();
  };

  /**
   *
   *  render sidebar
   *
   */
  const renderSidebar = () => {
    const currentRide = null;
    const isUser = IsUserLogIn === true && user_detail.account_type === "rider";
    if (isUser && !currentRide) {
      return (
        <AddressPicker
          selectedTo={selectedTo}
          setSelectedTo={setSelectedTo}
          selectedFrom={selectedFrom}
          setSelectedFrom={setSelectedFrom}
          driverResult={driverResult}
          setDriverResult={setDriverResult}
          selectedPointDistance={selectedPointDistance}
        />
      );
    }
    //   if (isUser && currentRide) {
    //     return <RideDetail user={currentRide.driver} isDriver={false} currentRide={currentRide} />
    //   }
    if (!isUser && !currentRide) {
      return <RideList />;
    }
    //   if (!isUser && currentRide) {
    //     return <RideDetail user={currentRide.requestor} isDriver={true} currentRide={currentRide} />
    //   }
  };

  /**
   * check a route should be drawed, or not.
   * @param {*} selectedFrom
   * @param {*} selectedTo
   */
  const shouldRouteDrawed = (selectedFrom, selectedTo) => {
    return (
      selectedFrom &&
      selectedTo &&
      selectedFrom.label &&
      selectedTo.label &&
      selectedFrom.x &&
      selectedTo.x &&
      selectedFrom.y &&
      selectedTo.y
    );
  };

  /**
   * draw route on map.
   */
  const drawRoute = useCallback((from, to) => {
    if (shouldRouteDrawed(from, to) && routeControl && routeControl.current) {
      setIsLoading(true);
      const fromLatLng = new L.LatLng(from.y, from.x);
      const toLatLng = new L.LatLng(to.y, to.x);
      routeControl.current.setWaypoints([fromLatLng, toLatLng]);
      let distance = fromLatLng.distanceTo(toLatLng) / 1000;

      let pick = from.label;
      let destination = to.label;

      axiosInstance
        .post(`${process.env.REACT_APP_API_BASE_URL}/pick_drop/`, { pick, destination })
        .then(res => {
          setDriverResult(res.data.drivers);
          setSelectedPointDistance(distance.toFixed(2));
        })
        .catch(err => {
          toast.error("Something went wrong, please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  //   run function on component mount
  useEffect(() => {
    initMap();
    initRouteControl();
  }, []);

  useEffect(() => {
    if (shouldRouteDrawed(selectedFrom, selectedTo)) {
      drawRoute(selectedFrom, selectedTo);
    }
  }, [selectedFrom, selectedTo, drawRoute]);

  return (
    <Layout>
      <main>
        <div id="map" style={style} />
        {renderSidebar()}
      </main>
      <ToastContainer />
      {isLoading && <LoaderWithBackground />}
    </Layout>
  );
};

export default DashboardPage;
