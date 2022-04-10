<template>
  <v-container class="blog">
    <template v-if="!blog"> 
      <div style="width:100%;heght:100vh;display:flex;align-items:center;justify-content:center">
       <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
     </div>
    </template>
    <template v-else>
      <div
        class="blog-cover-image mb-5"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      >
        <h1>{{ blog.title }}</h1>
      </div>

      <v-divider />

      <v-card class="mt-5" elevation="19" outlined tile>
        <v-card-title> {{ blog.title }} </v-card-title>
        <v-card-subtitle>
          {{ blogDate }} Tarihinde Orhan tarafından yazıldı.
        </v-card-subtitle>
        <v-card-text v-html="blog.content"> </v-card-text> </v-card
    ></template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { baseURL } from "../../plugins/service";
export default {
   beforeMount() {
     setTimeout(() => {
       this.getBlogById(this.$route.params.id);
     }, 2000);
  },
  mounted() {
    console.log("BLOG HA BU", this.blog);
  },
  methods: {
    ...mapActions("user", ["getBlogById"]),
  },
  computed: {
    ...mapGetters("user", ["blog"]),
    blogDate() {
      let date = new Date(this.blog.createdAt);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
    backgroundImage() {
      return this.blog.coverImage
        ? `${baseURL}/public/${this.blog.coverImage}`
        : "https://picsum.photos/510/300?random";
    },
  },
};
</script>

<style scoped>
@import "~vue2-editor/dist/vue2-editor.css";
/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
.blog-cover-image {
  background-size: cover;
  background-position: center;
  height: 200px;
}
.blog-cover-image h1 {
  color: white;
  font-size: 2.5rem;
  position: relative;
  top: 65%;
  left: 20px;
  backdrop-filter: blur(2px) opacity(0.5) saturate(0.5) brightness(0.5);
  width: fit-content;
  padding: 0 20px;
}
</style>
