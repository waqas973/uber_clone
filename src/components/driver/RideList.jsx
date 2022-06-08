import React from "react";

const RideList = () => {
  const renderRideList = () => {
    // if (rideRequests && rideRequests.length !== 0) {
    //   return rideRequests.map(request => (
    //     <div className="ride-list__result-item" key={request.rideUuid}>
    //       <div className="ride-list__result-icon">
    //         <svg title="LocationMarkerFilled" viewBox="0 0 24 24" className="g2 ec db"><g transform="matrix( 1 0 0 1 2.524993896484375 1.0250244140625 )"><path fillRule="nonzero" clipRule="nonzero" d="M16.175 2.775C12.475 -0.925 6.475 -0.925 2.775 2.775C-0.925 6.475 -0.925 12.575 2.775 16.275L9.475 22.975L16.175 16.175C19.875 12.575 19.875 6.475 16.175 2.775ZM9.475 11.475C8.375 11.475 7.475 10.575 7.475 9.475C7.475 8.375 8.375 7.475 9.475 7.475C10.575 7.475 11.475 8.375 11.475 9.475C11.475 10.575 10.575 11.475 9.475 11.475Z" opacity="1"></path></g></svg>
    //       </div>
    //       <div>
    //         <p className="ride-list__result-label"><span>From: </span>{request.pickup && request.pickup.label ? request.pickup.label : ''}</p>
    //         <p className="ride-list__result-label"><span>To: </span>{request.destination && request.destination.label ? request.destination.label : ''}</p>
    //         <button className="ride-list__accept-btn" onClick={() => acceptRide(request)}>Accept</button>
    //       </div>
    //     </div>
    //   ))
    // } else {
    return <h3 className="empty-message">You do not have any requests</h3>;
    // }
  };

  return (
    <div className="ride-list">
      <div className="ride-list__container">
        <div className="ride-list__title">Ride Requests</div>
        <div></div>
      </div>
      <div className="ride-list__content">{renderRideList()}</div>
    </div>
  );
};

export default RideList;
