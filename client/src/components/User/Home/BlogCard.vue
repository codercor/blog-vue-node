<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="backgroundImage" height="200px"></v-img>

    <v-card-title>
      {{ blog.title }}
    </v-card-title>

    <v-card-subtitle
      v-html="blog.content.substring(0, 35) + '...'"
    ></v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text :to="'/blog/' + blog.id">
        Devamını Oku
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>

    <!-- <router-link to="/blog/">Link </router-link> -->
  </v-card>
</template>

<script>
import { baseURL } from "../../../plugins/service";
export default {
  props: ["blog"],
  data: () => ({
    show: false,
  }),
  computed: {
    backgroundImage() {
      return this.blog.coverImage
        ? `${baseURL}/public/${this.blog.coverImage}`
        : "https://picsum.photos/510/300?random";
    },
  },
};
</script>

<style scoped>
p {
  display: inline-block !important;
}
</style>
