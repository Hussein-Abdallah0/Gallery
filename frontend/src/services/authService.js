import axiosBaseUrl from "../utils/axios";

export const loginUser = async (credentials) => {
  try {
    // Fetch IP-based geolocation data
    const locationRes = await fetch("https://ipapi.co/json");
    const locationData = await locationRes.json();

    // Add location to credentials
    const loginData = {
      ...credentials,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };

    const response = await axiosBaseUrl.post("/login", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosBaseUrl.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
