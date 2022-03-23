const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
// instance.interceptors.response.use((config) => {
//   return config;
// });
// instance.interceptors.request.use((config) => {
//   return config;
// });

instance.fetchBlogs = async () => {
  return (await instance.get("/blog")).data;
}

export default instance;
