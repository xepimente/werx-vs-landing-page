import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_HTTPCOMMON,
  headers: {
    "Content-type": "application/json",
    "voter": localStorage.getItem("voter"), // Initial auth token retrieval
  },
  withCredentials: true,
});

// Interceptor to update auth header before each request
http.interceptors.request.use(
  function (config) {
    const authToken = localStorage.getItem("voter");
    if (authToken) {
      config.headers["voter"] = authToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
