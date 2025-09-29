import axios from "axios";
import https from "https";

const axiosServices = axios.create();

// Set the httpsAgent for the axios instance for SSL related issue resolved
if (process.env.NODE_ENV === "development") {
  // This configuration disables SSL certificate validation.
  // In production, consider validating SSL certificates.
  axiosServices.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
}

// Interceptor for successful responses
axiosServices.interceptors.response.use(
  response => response.data,
  error => {
    // Interceptor for errors
    // You can customize error handling here
    // For example, you might want to check for specific HTTP status codes and handle them differently
    return Promise.reject((error.response && error.response.data) || "Wrong Services");
  }
);

export default axiosServices;
