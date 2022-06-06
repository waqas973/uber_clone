import axios from "axios";

// create axios instance with some header content

const axiosInstance = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("uber-demo-token");
    config.headers.Authorization = token ? `Bearer  ${token}` : null;
    return config;
  });
  return instance;
};
export default axiosInstance();
