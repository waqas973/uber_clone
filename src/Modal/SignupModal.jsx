import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import AutoCompleteCities from "../components/Helper/AutoCompleteCities";
import JsonData from "../data.json";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderWithBackground from "../components/loader/LoaderWithBackground";
import { useNavigate } from "react-router-dom";

const SignupModal = ({ showModal, setShowModal, mode }) => {
  const [cityKeyword, setCityKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isApiCall, setIsApiCall] = useState(false);
  const { vehicle_type } = JsonData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [cityError, setCityError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  // close modal
  const closeModal = () => {
    reset({
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      vehicle: "",
      partner_photo: "",
      vehicle_registration_book: "",
      driving_licence_front_side: "",
    });
    setCityKeyword("");
    setSelectedLocation("");
    setShowModal(false);
  };

  // handle submit data to api
  const onSubmit = data => {
    setCityError(false);

    if (mode === "drive") {
      if (selectedLocation) {
        let account_type = "drive_and_deliver";
        const postingData = { ...data, account_type, city: selectedLocation };
        submitFormData(postingData);
      } else {
        setCityError(true);
      }
    } else {
      let account_type = "rider";

      const postingData = { ...data, account_type };

      submitFormData(postingData);
    }
  };

  /**
   * submit form data
   */

  const submitFormData = data => {
    setIsLoading(true);

    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key !== "partner_photo" && key !== "vehicle_registration_book" && key !== "driving_licence_front_side") {
          formData.append(key, data[key]);
        }
      }
    }

    if (data.partner_photo[0]) {
      formData.append("partner_photo", data.partner_photo[0]);
    }

    if (data.vehicle_registration_book?.[0]) {
      formData.append("vehicle_registration_book", data?.vehicle_registration_book?.[0]);
    }

    if (data.driving_licence_front_side?.[0]) {
      formData.append("driving_licence_front_side", data?.driving_licence_front_side?.[0]);
    }

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_SIGNUP_URL} `, formData)
      .then(res => {
        reset({
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          password: "",
          vehicle: "",
          partner_photo: "",
          vehicle_registration_book: "",
          driving_licence_front_side: "",
        });
        setCityKeyword("");
        setSelectedLocation("");
        setIsLoading(false);
        setShowModal(false);
        navigator("/verify-email");
      })
      .catch(err => {
        setIsLoading(false);
        if (err.response.data.email.length > 0) {
          toast.error(err.response.data.email[0]);
        } else {
          toast.error("Something went wrong try later!");
        }
      });
  };

  // if user has selected location then set setCityKeyword
  useEffect(() => {
    setCityKeyword(selectedLocation);
  }, [selectedLocation]);

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
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>

          <div className="modal-body">
            {/* form  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* first name  */}
              <div className="mb-4">
                <label htmlFor="first_name" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.first_name,
                  })}
                  id="first_name"
                  placeholder="First Name"
                  {...register("first_name", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.first_name && <p className="invalid-feedback">{errors.first_name.message}</p>}
              </div>
              {/* last name  */}
              <div className="mb-4">
                <label htmlFor="last_name" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.last_name,
                  })}
                  id="last_name"
                  placeholder="Last Name"
                  {...register("last_name", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.last_name && <p className="invalid-feedback">{errors.last_name.message}</p>}
              </div>

              {/* email  */}
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
                {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
              </div>
              {/* phone number */}
              <div className="mb-4">
                <label htmlFor="phone_number" className="form-label">
                  Enter your phone number
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.phone_number,
                  })}
                  id="phone_number"
                  placeholder="phone number"
                  {...register("phone_number", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.phone_number && <p className="invalid-feedback">{errors.phone_number.message}</p>}
              </div>
              {/* profile picture */}
              <div className="mb-4">
                <label htmlFor="partner_photo" className="form-label">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="partner_photo"
                  className={classNames("form-control", {
                    "is-invalid": errors.partner_photo,
                  })}
                  {...register("partner_photo", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.partner_photo && <p className="invalid-feedback">{errors.partner_photo.message}</p>}
              </div>
              {/*  user is driver  */}
              {mode === "drive" && (
                <>
                  {/* city  */}
                  <div className="mb-4 position-relative">
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
                      value={cityKeyword}
                      autoComplete="off"
                      onChange={e => {
                        setCityKeyword(e.target.value);
                        setSelectedLocation("");
                        setIsApiCall(true);
                        setCityError(false);
                      }}
                    />

                    <AutoCompleteCities
                      topstyle="100%"
                      cityKeyword={cityKeyword}
                      setSelectedLocation={setSelectedLocation}
                      isApiCall={isApiCall}
                      setIsApiCall={setIsApiCall}
                    />
                    {cityError && <p className="error__clr">Please select city from the suggestion list</p>}
                  </div>
                  {/* vehicle type  */}
                  <div className="mb-4">
                    <label htmlFor="vehicle" className="form-label">
                      Vehicle Type
                    </label>
                    <select
                      className={classNames("form-select", {
                        "is-invalid": errors.vehicle,
                      })}
                      {...register("vehicle", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    >
                      {vehicle_type.map(v => (
                        <option key={v.id} value={v.value}>
                          {v.text}
                        </option>
                      ))}
                    </select>
                    {errors.vehicle && <p className="invalid-feedback">{errors.vehicle.message}</p>}
                  </div>
                  {/* vehicle registration book  */}
                  <div className="mb-4">
                    <label htmlFor="vehicle_registration_book" className="form-label">
                      Vehicle Registration Book Image
                    </label>
                    <input
                      className={classNames("form-control", {
                        "is-invalid": errors.vehicle_registration_book,
                      })}
                      type="file"
                      id="vehicle_registration_book"
                      {...register("vehicle_registration_book", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors.vehicle_registration_book && (
                      <p className="invalid-feedback">{errors.vehicle_registration_book.message}</p>
                    )}
                  </div>
                  {/* driving license image  */}
                  <div className="mb-4">
                    <label htmlFor="driving_licence_front_side" className="form-label">
                      Driving Licence Image ( front side )
                    </label>
                    <input
                      className={classNames("form-control", {
                        "is-invalid": errors.driving_licence_front_side,
                      })}
                      type="file"
                      id="driving_licence_front_side"
                      {...register("driving_licence_front_side", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors.driving_licence_front_side && (
                      <p className="invalid-feedback">{errors.driving_licence_front_side.message}</p>
                    )}
                  </div>
                </>
              )}
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
                    pattern: {
                      value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
                      message:
                        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                    },
                  })}
                />
                {errors.password && <p className="invalid-feedback"> {errors.password.message}</p>}
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
      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default SignupModal;
