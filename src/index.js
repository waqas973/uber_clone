import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./scss/main.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import swDev from "./swDev";
import { Provider } from "react-redux";
import Store from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

swDev();
