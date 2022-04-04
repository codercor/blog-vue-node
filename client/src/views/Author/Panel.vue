<template>
  <div>
    <h1>Panel</h1>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" :exact="true"  elevation="2" raised rounded to="/panel/new">
          New Blog
        </v-btn>
        <v-btn color="primary" :exact="true"   elevation="2" raised rounded to="/panel/"> List Blogs </v-btn>
      </v-col>
      <v-col col="12">
        <router-view />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
  .v-btn--active{
    color: rgb(170, 245, 147) !important
  }
</style>
