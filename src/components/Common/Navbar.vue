<template>
  <v-app-bar app color="purple" dark>
    <div class="d-flex align-center">
      <v-icon @click="toggleIsOpen">mdi-menu</v-icon>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>
    <template v-if="!isAuthenticated">
      <v-btn to="/auth/login" text>
        <span class="mr-2">Login </span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn to="/auth/register" text>
        <span class="mr-2">Register</span>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <v-btn v-else @click="logout" text > <v-icon>mdi-logout</v-icon> </v-btn>
  </v-app-bar>
</template>
<script>
import { mapGetters,mapMutations } from "vuex";
export default {
  props: ["toggleIsOpen"],
  computed: {
    ...mapGetters("author", ["isAuthenticated"]),
  },
  methods:{
    ...mapMutations("author", ["logout"]),
  },
  watch: {
    isAuthenticated(newValue) {
      if (!newValue) {
        this.$router.push("/auth/login");
      }
    }
  }
};
</script>
