import React from "react";

const RideDetail = props => {
  const { user, isDriver, currentRide } = props;
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
        <button className="ride-detail__btn">{isDriver ? "Talk to User" : "Talk to Driver"}</button>
        <button className="ride-detail__btn">Cancel the Ride</button>
        {isDriver && <button className="ride-detail__btn">Finish the Ride</button>}
      </div>
    </div>
  );
};

export default RideDetail;
