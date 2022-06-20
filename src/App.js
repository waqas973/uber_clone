import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import Chat from "./pages/Chat";

const App = () => {
  const dispatch = useDispatch();
  const action_Mode = useSelector(state => state.ActionMode.action_Mode);
  const navigator = useNavigate();
  const [isLoading, setLoading] = useState(true);

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
            toast.error("Something went wrong, please try again or check your internet connection");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes type="guest">
              <LandingPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoutes type="guest">
              <Signup />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/verify-email"
          element={
            <ProtectedRoutes type="guest">
              <VerifyEmail />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoutes type="guest">
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path={action_Mode && action_Mode === "forget-password" ? "/forget-password" : "/resend-email-code"}
          element={
            <ProtectedRoutes type="guest">
              <ResendEmail />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/new-password"
          element={
            <ProtectedRoutes type="guest">
              <NewPassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes type="private">
              <DashboardPage />{" "}
            </ProtectedRoutes>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoutes type="private">
              <Chat />{" "}
            </ProtectedRoutes>
          }
        />
      </Routes>
      {/* loading  */}
      {isLoading && <LoaderWithBackground isBgwhite />}
    </div>
  );
};

export default App;

//  PROTECTED ROUTES
export const ProtectedRoutes = ({ children, type }) => {
  const { IsUserLogIn } = useSelector(({ UserLogin }) => UserLogin);
  let isAuthUser = IsUserLogIn || localStorage.getItem("uber-demo-token");

  if (type === "guest" && isAuthUser) return <Navigate to="/dashboard" />;
  else if (type === "private" && !isAuthUser) return <Navigate to="/login" />;

  return children;
};
