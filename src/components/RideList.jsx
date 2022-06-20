import React from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios/Axios";
import LoaderWithBackground from "./loader/LoaderWithBackground";

const RideList = props => {
  const { rideRequest, setCurrentRide, setRideRequestData } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  // /**
  //  * accept ride
  //  */
  const acceptRide = async requestid => {
    if (requestid) {
      setIsLoading(true);
      const data = { request_id: requestid, status: "1" };
      axiosInstance
        .post(`${process.env.REACT_APP_API_BASE_URL}/cancel_accept_ride/`, JSON.stringify(data))
        .then(res => {
          setRideRequestData(null);
          localStorage.setItem("uber-demo-accepted-ride", JSON.stringify(res.data.response));
          setCurrentRide(res.data.response);
        })
        .catch(err => {
          toast.error("Something went wrong or check your internet connection!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const renderRideList = () => {
    if (rideRequest && rideRequest.length !== 0) {
      return rideRequest.map(request => (
        <div className="ride-list__result-item" key={request.id}>
          <div className="ride-list__result-icon">
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
          <div>
            <p className="ride-list__result-label">
              <span>From: </span>
              {request.pickup_label ? request.pickup_label : ""}
            </p>
            <p className="ride-list__result-label">
              <span>To: </span>
              {request.destination_label ? request.destination_label : ""}
            </p>
            <button className="ride-list__accept-btn" onClick={() => acceptRide(request.id)}>
              Accept
            </button>
          </div>
        </div>
      ));
    } else {
      return <h3 className="empty-message">You do not have any requests</h3>;
    }
  };

  return (
    <div className="ride-list">
      <div className="ride-list__container">
        <div className="ride-list__title">Ride Requests</div>
        <div></div>
      </div>
      <div className="ride-list__content">{renderRideList()}</div>
      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default RideList;
