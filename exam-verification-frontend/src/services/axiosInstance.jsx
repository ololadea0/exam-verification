import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   if (config.data instanceof FormData) {
//     delete config.headers["Content-Type"];
//   }
//   return config;
// });
axiosInstance.interceptors.request.use((config) => {
  console.log(
    "API REQUEST:",
    config.method?.toUpperCase(),
    config.url,
    "withCredentials:",
    config.withCredentials,
  );

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default axiosInstance;
