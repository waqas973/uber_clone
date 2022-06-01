import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SignupModal from "../../Modal/SignupModal";

const Signup = () => {
  const navigator = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const handleClick = mode => {
    setShowModal(true);
    setMode(mode);
  };
  return (
    <main className="signupFor">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="d-flex justify-content-center align-items-center  wrapper"
              onClick={() => handleClick("drive")}
            >
              <h2>Sign up to drive</h2>
              <BsArrowRight className="icon arrow__icon" />
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="d-flex justify-content-center align-items-center  wrapper"
              onClick={() => handleClick("rider")}
            >
              <h2>Create a rider account</h2>
              <BsArrowRight className="icon arrow__icon" />
            </div>
          </div>
        </div>
        {/* go back  */}
        <div className="text-center" style={{ marginTop: "7rem" }}>
          <button className="btnn go__back" onClick={() => navigator("/")}>
            Go Back
          </button>
        </div>
      </div>

      <SignupModal
        showModal={showModal}
        setShowModal={setShowModal}
        mode={mode}
      />
    </main>
  );
};

export default Signup;
