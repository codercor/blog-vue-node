const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
//response
// instance.interceptors.response.use((config) => {
//   return config;
// });
//request
instance.interceptors.request.use((config) => {
  //config bizim istek datamız ve biz onu return edince uygulamadan çıkıp isteği gönderecek
  //bu süreçte üzerinde oynama yapabiliriz.
  config.headers["access-token"] = localStorage.getItem("accessToken") || "";
  config.headers["refresh-token"] = localStorage.getItem("refreshToken") || "";
  console.log("İstek ",config);
  return config;
});

instance.fetchBlogs = async () => {
  return (await instance.get("/blog")).data;
}

instance.fetchBlogById = async (id) => {
  return (await instance.get(`/blog/${id}`)).data;
}


//auth services
instance.auth={};
instance.auth.login = async (loginData) => {
  return (await instance.post("/auth/login", loginData)).data;
}

instance.auth.register = async (registerData) => {
  return (await instance.post("/auth/register", registerData)).data;
}

//author services
instance.panel={};
instance.panel.fetchMyBlogs = async () => {
  return (await instance.get("/panel/myBlogs")).data;
}


export default instance;
