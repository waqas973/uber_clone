import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
