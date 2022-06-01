import React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const SignupModal = ({ showModal, setShowModal, mode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeModal = () => {
    reset({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
    setShowModal(false);
  };

  const onSubmit = data => {
    reset({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
    setShowModal(false);
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
              Signup for uber
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
              <div className="mb-4">
                <label htmlFor="first_name" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.firstName,
                  })}
                  id="first_name"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="invalid-feedback">{errors.firstName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.lastName,
                  })}
                  id="last_name"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="invalid-feedback">{errors.lastName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="phone_number" className="form-label">
                  Enter your phone number
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.phoneNumber,
                  })}
                  id="phone_number"
                  placeholder="phone number"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="invalid-feedback">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Enter your email
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.email,
                  })}
                  id="email"
                  placeholder="Email"
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
              {mode === "drive" && (
                <div className="mb-4">
                  <label htmlFor="city" className="form-label">
                    Enter your city
                  </label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.city,
                    })}
                    id="city"
                    placeholder="City you'll be drive in"
                    {...register("city", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                  {errors.city && (
                    <p className="invalid-feedback">{errors.city.message}</p>
                  )}
                </div>
              )}
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
                {errors.password && (
                  <p className="invalid-feedback">{errors.password.message}</p>
                )}
              </div>
              <div className="mb-4 text-end">
                <button type="submit" className="btnn btnn__submit">
                  Submit
                </button>
              </div>
            </form>
            {/* form end  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
