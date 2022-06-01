import React, { useState } from "react";
import { FaSignal, FaCar } from "react-icons/fa";
import { MdGpsFixed } from "react-icons/md";

const Banner = () => {
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <header className="hero hero__top">
      <div className="hero-container"></div>
      {/* card  */}
      <div className="card-wrapper  ">
        <div className="card">
          {/* card header */}
          <div className="card-header d-flex justify-content-between align-items-center text-center  px-5 ">
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
                <p className="my-4">
                  Drive on the platform with the largest network of active
                  riders.
                </p>
                <button className="btnn btnn__signup">sign up for drive</button>
              </div>
            ) : (
              <div className="rider__container">
                <h2>Get in the driver’s seat and get paid</h2>
                <form className="py-4">
                  <div className="form__control--wrapper d-flex justify-content-between align-items-center mb-2">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter pickup location"
                    />
                    <MdGpsFixed
                      className="icon"
                      title="My current location"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="form__control--wrapper mb-2">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter destination"
                    />
                  </div>
                  <button className="btnn btnn__request">request now</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
