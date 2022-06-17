import React from "react";
import { toast } from "react-toastify";
import LoaderWithBackground from "./loader/LoaderWithBackground";
import axiosInstance from "../axios/Axios";
import { useNavigate } from "react-router-dom";

const RideDetail = props => {
  const { user, isDriver, currentRide, setRideRequestData, setCurrentRide, setRideRequest } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const navigator = useNavigate();

  /**
   * cancel ride
   *
   */

  const cancelRide = async () => {
    let requestid = "";
    if (currentRide[0]) {
      requestid = currentRide[0].id;
    } else {
      requestid = currentRide.id;
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
   * finish ride
   *
   */

  const finishRide = async () => {
    let requestid = "";
    if (currentRide[0]) {
      requestid = currentRide[0].id;
    } else {
      requestid = currentRide.id;
    }
    if (requestid) {
      setIsLoading(true);
      axiosInstance
        .get(`${process.env.REACT_APP_API_BASE_URL}/ride_status/${requestid}/`)
        .then(res => {
          setRideRequestData(null);
          setCurrentRide(null);
          setRideRequest(null);
        })
        .catch(err => {
          toast.error("Something went wrong or check your internet connection!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="ride-detail">
      <div className="ride-detail__user-avatar">{/* <img src={user.avatar} alt={user.email} /> */}</div>
      <p className="ride-detail__user-info">
        {user.email} - {user.phone_number}
      </p>
      <div className="ride-detail__actions">
        <p className="ride-detail__result-label">
          <span>From: </span>
          {currentRide.pickup_label ? currentRide.pickup_label : ""}
        </p>
        <p className="ride-detail__result-label">
          <span>To: </span>
          {currentRide.destination_label ? currentRide.destination_label : ""}
        </p>
        <button className="ride-detail__btn" onClick={() => navigator("/chat")}>
          {isDriver ? "Talk to User" : "Talk to Driver"}
        </button>
        <button className="ride-detail__btn" onClick={cancelRide}>
          Cancel the Ride
        </button>
        {isDriver && (
          <button className="ride-detail__btn" onClick={finishRide}>
            Finish the Ride
          </button>
        )}
      </div>
      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default RideDetail;
