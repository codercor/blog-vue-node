const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
//'http://localhost:3000/blog/1'

instance.interceptors.response.use((config) => {
  return config;
});
instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
