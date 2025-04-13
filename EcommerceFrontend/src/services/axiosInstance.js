import axios from "axios";

// Create an axios instance with a custom configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", // for local development
  headers: {
    "Content-Type": "application/json", // Default header, if needed
    // 'Authorization': `Bearer ${yourAuthToken}`, // You can add authorization headers if needed
  },
});

export default axiosInstance;
