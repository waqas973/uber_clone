import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import LoaderWithBackground from "../components/loader/LoaderWithBackground";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionMode, logInUserData } from "../redux/actions/Actions";

const LoginModal = ({ showModal, setShowModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const btnStyle = {
    border: "none",
    outline: "none",
    boxShadow: "none",
    background: "transparent",
    color: "skyblue",
  };

  // close modal
  const closeModal = () => {
    reset({
      email: "",
      password: "",
    });
    setShowModal(false);
  };

  // handle submit data to api
  const onSubmit = data => {
    setIsLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_LOGIN_URL
        }`,
        data
      )
      .then(res => {
        localStorage.setItem("uber-demo-token", res.data.access);
        dispatch(logInUserData(res.data));
        reset({
          email: "",
          password: "",
        });
        setShowModal(false);
      })
      .catch(err => {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error("Something went wrong or No user found");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   handle navigate
  const handleNavigate = mode => {
    localStorage.setItem("uber-demo-mode", mode);
    dispatch(actionMode(mode));
    navigator(`/${mode}`);
  };

  return (
    <div
      className={`signupModal  modal fade ${showModal && "show"}`}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      style={showModal ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Login for uber
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>

          <div className="modal-body">
            {/* form  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* first name  */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.email,
                  })}
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email.message}</p>
                )}
              </div>
              {/* password  */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Enter password
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.password,
                  })}
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {/* forget password  */}
                <div className=" text-end">
                  <button
                    type="button"
                    style={btnStyle}
                    onClick={() => handleNavigate("forget-password")}
                  >
                    forget password?
                  </button>
                </div>

                {errors.password && (
                  <p className="invalid-feedback"> {errors.password.message}</p>
                )}
              </div>
              <div className="mb-4 text-end">
                <button type="submit" className="btnn btnn__submit">
                  Submit
                </button>
              </div>
            </form>
            <div style={{ position: "relative" }} className="my-4">
              <hr />
              <h4
                className="text-dark text-center"
                style={{
                  position: "absolute",
                  top: "-1rem",
                  left: "46%",
                  background: "white",
                  zIndex: "1",
                  padding: "0.1rem 0.2rem",
                }}
              >
                or
              </h4>
            </div>
            <div className="text-center">
              <button
                type="button"
                style={btnStyle}
                onClick={() => handleNavigate("resend-email-code")}
              >
                Verify Email
              </button>
            </div>

            {/* form end  */}
          </div>
        </div>
      </div>
      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default LoginModal;
