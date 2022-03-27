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

instance.fetchBlogById = async (id) => {
  return (await instance.get(`/blog/${id}`)).data;
}

instance.login = async (loginData) => {
  return (await instance.post("/auth/login", loginData)).data;
}

instance.register = async (registerData) => {
  return (await instance.post("/auth/register", registerData)).data;
}

export default instance;
