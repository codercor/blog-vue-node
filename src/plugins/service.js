const axios = require("axios");

const router = require("../router");
const store = require("../store");

export const baseURL = "http://localhost:3000";
const instance = axios.create({
  baseURL,
});

//request;
instance.interceptors.request.use((config) => {
  //config bizim istek datamız ve biz onu return edince uygulamadan çıkıp isteği gönderecek
  //bu süreçte üzerinde oynama yapabiliriz.
  config.headers["access-token"] = localStorage.getItem("accessToken") || "";
  config.headers["refresh-token"] = localStorage.getItem("refreshToken") || "";
  console.log("İstek ", config);
  return config;
});

// response
instance.interceptors.response.use(
  (config) => {
    console.log("Cevap ", config);
    return config;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status == 401) {
      console.log("401");
      axios.default
        .get(`${baseURL}/auth/check`, {
          headers: {
            "access-token": localStorage.getItem("accessToken"),
            "refresh-token": localStorage.getItem("refreshToken"),
          },
        })
        .then((response) => {
          console.log("check'den dönen response", response);
          if (response.data.refreshed) {
            console.log("işte refresh edililiyor");
            console.log(response.data);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            store.default.commit("author/setIsAuthenticated", true);
            router.default.go();
          }
        })
        .catch((error) => {
          console.log("check'den dönen error", error.response);
          console.log(error);
          if (error.response.data.toLogin) router.default.push("/auth/login");
          store.default.commit("author/setIsAuthenticated", false);
        });
    }
  }
);

instance.fetchBlogs = async ({page,limit}) => {
  let url = "/blog";
  page = page || 1;
  limit = limit || 10;
  url += `?page=${page}&limit=${limit}`;
  return (await instance.get(url)).data;
};

instance.fetchBlogById = async (id) => {
  return (await instance.get(`/blog/${id}`)).data;
};

//auth services
instance.auth = {};
instance.auth.login = async (loginData) => {
  return (await instance.post("/auth/login", loginData)).data;
};

instance.auth.register = async (registerData) => {
  return (await instance.post("/auth/register", registerData)).data;
};

//author services
instance.panel = {};
instance.panel.fetchMyBlogs = async () => {
  return (await instance.get("/panel/myBlogs")).data;
};
instance.panel.createBlog = async (blog) => {
  //upload coverimage
  const formData = new FormData();
  formData.append("image", blog.coverImage);
  const coverImageFileName = (await instance.post("/panel/uploadImage", formData)).data.file
  //console.log("coverImageFileName", coverImageFileName);
  blog.coverImage = coverImageFileName;
  return (await instance.post("/panel/createBlog", blog)).data;
};
instance.panel.updateBlog = async (blog) => {
  const { id, title, content,coverImage } = blog;
  const formData = new FormData();
  formData.append("image", coverImage);
  const coverImageFileName = (await instance.post("/panel/uploadImage", formData)).data.file
  blog = { title, content,coverImage:coverImageFileName };
  return (await instance.put(`/panel/blog/${id}`, blog)).data;
};

instance.panel.deleteBlog = async (id) => {
  return (await instance.delete(`/panel/blog/${id}`)).data;
}

export default instance;
