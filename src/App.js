import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import NewPassword from "./components/NewPassword";
import ResendEmail from "./components/ResendEmail";
import Signup from "./components/Signup/Signup";
import VerifyEmail from "./components/VerifyEmail";
import LandingPage from "./pages/LandingPage";
import { actionMode, logInUserData } from "./redux/actions/Actions";
import axiosInstance from "./axios/Axios";
import { toast } from "react-toastify";
import LoaderWithBackground from "./components/loader/LoaderWithBackground";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const dispatch = useDispatch();
  const action_Mode = useSelector(state => state.ActionMode.action_Mode);
  const navigator = useNavigate();
  const [isLoading, setLoading] = useState(false);

  // set mode into redux
  useEffect(() => {
    dispatch(actionMode(localStorage.getItem("uber-demo-mode")));
  }, [dispatch]);

  // get login  userdata from redux

  useEffect(() => {
    if (localStorage.getItem("uber-demo-token")) {
      setLoading(true);
      axiosInstance
        .get(`${process.env.REACT_APP_PROFILE_URL}`)
        .then(res => {
          dispatch(logInUserData(res.data));
        })
        .catch(err => {
          if (err.response.data.code === "token_not_valid") {
            toast.error("Your token is expired, please login again");
            setTimeout(() => {
              navigator("/login");
            }, 3000);
          } else {
            toast.error(
              "Something went wrong, please try again or check your internet connection"
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dispatch, navigator]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path={
            action_Mode && action_Mode === "forget-password"
              ? "/forget-password"
              : "/resend-email-code"
          }
          element={<ResendEmail />}
        />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      {/* loading  */}
      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default App;
