const { default: axios } = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  // "https://prayojon-server.prayojon.com",
  // "https://prayojon-server.prayojon.com",
});

export default axiosInstance;
