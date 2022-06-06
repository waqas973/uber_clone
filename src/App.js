import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import NewPassword from "./components/NewPassword";
import ResendEmail from "./components/ResendEmail";
import Signup from "./components/Signup/Signup";
import VerifyEmail from "./components/VerifyEmail";
import LandingPage from "./pages/LandingPage";
import { actionMode } from "./redux/actions/Actions";

const App = () => {
  const dispatch = useDispatch();
  const action_Mode = useSelector(state => state.ActionMode.action_Mode);

  // set mode into redux
  useEffect(() => {
    dispatch(actionMode(localStorage.getItem("uber-demo-mode")));
  }, [dispatch]);

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
      </Routes>
    </div>
  );
};

export default App;
