const { default: axios } = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  // "http://localhost:9000",
  // "http://localhost:9000",
});

export default axiosInstance;
