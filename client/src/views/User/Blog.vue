<template>
  <v-container class="blog">
    <div class="blog-cover-image mb-5">
      <h1>{{blog.title}} </h1>
    </div>
    
    <v-divider />

    <v-card class="mt-5" elevation="19" outlined tile>
      <v-card-title> {{blog.title}} </v-card-title>
      <v-card-subtitle> {{ blogDate }} Tarihinde Orhan tarafından yazıldı. </v-card-subtitle>
      <v-card-text>
        {{ blog.content }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  beforeMount() {
    this.getBlogById(this.$route.params.id);
  },
  methods:{
    ...mapActions("user", ["getBlogById"]),
   
  },
  computed:{
    ...mapGetters("user", ["blog"]),
    blogDate(){
      let date = new Date(this.blog.createdAt);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
  }
};
</script>

<style scoped>
.blog-cover-image {
  background-image: url("https://picsum.photos/510/300?random");
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
