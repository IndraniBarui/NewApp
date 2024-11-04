import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://192.168.1.5:8000/auth",

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Handle error in fetching token if necessary
      console.error("Failed to retrieve token from AsyncStorage", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
