import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoaderWithBackground from "./loader/LoaderWithBackground";

const VerifyEmail = () => {
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //   submit
  const handleSubmit = e => {
    e.preventDefault();
    if (inputCode === "") {
      setError("Please enter a code");
    } else {
      setError("");
      setIsLoading(true);
      axios
        .post(
          `${
            process.env.REACT_APP_API_BASE_URL +
            process.env.REACT_APP_VERIFY_EMAIL_URL
          }`,
          {
            code: inputCode,
          }
        )
        .then(res => {
          toast.success("Email verified successfully");
          setInputCode("");
          setTimeout(() => {
            navigator("/login");
          }, 1000);
        })
        .catch(err => {
          if (err.response.data.code?.[0]) {
            setError("Invalid code");
          } else if (err.response.data.response) {
            setError("Invalid code");
          } else {
            setError("Something went wrong");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <main className="verify-email">
      <div className="container">
        <div className="row ">
          {/* col-6  */}
          <div className="col-12 col-lg-6 mx-auto">
            <div className="card   shadow-lg">
              {/* card-body  */}
              <div className="card-body">
                <h5 className="card-title">
                  An email verification code is send to your email please verify
                  your account before login
                </h5>
                <form>
                  <div className="mb-4">
                    <label htmlFor="enter_code" className="form-label">
                      Enter Code
                    </label>
                    <input
                      type="text"
                      className={
                        error ? "form-control is-invalid" : "form-control"
                      }
                      id="enter_code"
                      placeholder="Enter code"
                      value={inputCode}
                      onChange={e => {
                        setInputCode(e.target.value);
                        setError("");
                      }}
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="btnn btnn__submit"
                    onClick={handleSubmit}
                  >
                    verify email
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* toast container  */}
      <ToastContainer />
      {isLoading && <LoaderWithBackground />}
    </main>
  );
};

export default VerifyEmail;
