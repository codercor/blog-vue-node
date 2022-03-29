import { mapMutations } from "vuex";
const authMixin = {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      isShowPassword: false,
    };
  },
  methods: {
    ...mapMutations("author", ["setUserData"]),
    loginByData(data) {
      this.isLoading = false;
      console.log(data);
      this.setNotification({
        type: "success",
        text: `Hoşgeldin ${data.user.name}`,
        timeout: 3000,
      });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      this.setUserData({ user: data.user, isAuthenticated: true });
      this.$router.push("/panel");
    },
    showPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
  },
};
export default authMixin;
