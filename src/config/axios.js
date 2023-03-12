const { default: axios } = require("axios");

const axiosInstance = axios.create({
      baseURL: "http://prayo-server.ghoroya.com",
});

export default axiosInstance;