<template>
  <v-container fluid mt-16>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card :loading="isLoading ? 'error' : false" class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Giriş Yap</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="username"
                label="Kullanıcı adı"
                autocomplete="off"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                id="password"
                name="password"
                label="Şifre"
                v-model="password"
                :type="isShowPassword ? 'text' : 'password'"
                :append-icon="isShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Giriş</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import service from "../../plugins/service.js";
import { authMixin,notificationMixin } from "@/mixins";
export default {
  name: "Login",
  mixins: [authMixin,notificationMixin],
  methods: {
    login() {
      const { username, password } = this;
      this.isLoading = true;
      service.auth
        .login({ username, password })
        .then((data) => {
          this.loginByData(data);
        })
        .catch((err) => {
          this.setNotification({
            type: "error",
            text: "Hatalı giriş",
            timeout: 5000,
          });
        });
    },
  },
};
</script>

<style></style>
