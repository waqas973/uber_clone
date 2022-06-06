import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoaderWithBackground from "./loader/LoaderWithBackground";

const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigator = useNavigate();

  // handle submit data to api
  const onSubmit = data => {
    setIsLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_API_BASE_URL +
          process.env.REACT_APP_NEW_PASSWORD_URL
        }`,
        data
      )
      .then(res => {
        reset({
          token: "",
          password: "",
        });
        toast.success("Password changed successfully");

        setTimeout(() => {
          navigator("/login");
        }, 2000);
      })
      .catch(err => {
        if (err.response.data.detail) {
          toast.error("Incorrect token or token has been expired!");
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                  A token is send to your email please check your email
                </h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* first name  */}
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
                      placeholder="Enter your password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="invalid-feedback">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  {/* password  */}
                  <div className="mb-4">
                    <label htmlFor="token" className="form-label">
                      Enter Token
                    </label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.token,
                      })}
                      id="token"
                      placeholder="Enter token"
                      {...register("token", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />

                    {errors.token && (
                      <p className="invalid-feedback">
                        {" "}
                        {errors.token.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 text-end">
                    <button type="submit" className="btnn btnn__submit">
                      Submit
                    </button>
                  </div>
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

export default NewPassword;
