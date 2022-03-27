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

    <v-btn
      to="/auth/login"
      text
    >
      <span class="mr-2">Login</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
     <v-btn
      to="/auth/register"
      text
    >
      <span class="mr-2">Register</span>
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
    props:["toggleIsOpen"]
}
</script>