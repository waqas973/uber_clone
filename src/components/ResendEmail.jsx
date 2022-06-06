import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoaderWithBackground from "./loader/LoaderWithBackground";

const ResendEmail = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState("");
  const action_Mode = useSelector(state => state.ActionMode.action_Mode);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  //   submit
  const handleSubmit = e => {
    e.preventDefault();
    if (inputEmail === "") {
      setError("Please enter a email");
    } else {
      setError("");
      setIsLoading(true);

      let url =
        action_Mode === "forget-password"
          ? process.env.REACT_APP_FORGET_PASSWORD_URL
          : process.env.REACT_APP_RESEND_EMAIL_URL;

      axios
        .post(`${process.env.REACT_APP_API_BASE_URL + url}`, {
          email: inputEmail,
        })
        .then(res => {
          if (
            res.data.response === "Email does not exist." ||
            res.data.response === "User already verified."
          ) {
            setError(res.data.response);
          } else {
            setInputEmail("");
            if (action_Mode === "forget-password") {
              navigator("/new-password");
            } else {
              navigator("/verify-email");
            }
          }
        })
        .catch(err => {
          if (err.response.data.email?.[0]) {
            setError(err.response.data.email?.[0]);
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
                <h5 className="card-title text-center">
                  {action_Mode && action_Mode === "forget-password"
                    ? "Forget Password"
                    : "Verify Your Email"}
                </h5>
                <form>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Enter email
                    </label>
                    <input
                      type="text"
                      className={
                        error ? "form-control is-invalid" : "form-control"
                      }
                      id="email"
                      placeholder="Enter email"
                      value={inputEmail}
                      onChange={e => {
                        setInputEmail(e.target.value);
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
                    Submit
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

export default ResendEmail;
