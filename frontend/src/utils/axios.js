import axios from "axios";

const BaseURL = "http://127.0.0.1:8000";
const Endpoint = "/api/v1";

const axiosBaseUrl = axios.create({
  baseURL: `${BaseURL}${Endpoint}`,
  headers: {
    "Content-Type": "application/json",
  },
});

//added this since an axios instance is being created when the application starts and the axios then takes a null token
axiosBaseUrl.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBaseUrl;
