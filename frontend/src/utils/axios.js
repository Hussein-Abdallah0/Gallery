import axios from "axios";

//using sessionStorage since localStorage is shared between windows
const token = sessionStorage.getItem("token");

const BaseURL = "http://127.0.0.1:8000";
const Endpoint = "/api/v1";

const axiosBaseUrl = axios.create({
  baseURL: `${BaseURL}${Endpoint}`,

  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosBaseUrl;
