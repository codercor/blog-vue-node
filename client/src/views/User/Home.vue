<template>
  <div>
    <v-row>
      <v-col v-for="(blog, i) in blogs" :key="i" cols="6">
        <BlogCard :blog="blog"
      /></v-col>
      <v-col cols="10" class="pagination-buttons">
        <v-pagination
          v-model="page"
          :length="22"
          :total-visible="7"
        ></v-pagination>
      </v-col>
      <v-col cols="2" >
        <v-select  v-model="selectedPerPage" :items="perPage" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BlogCard from "../../components/User/Home/BlogCard.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      page: 1,
      // perPage: [1, 3, 5, 10, 15, 20, 50],
      //selectedPerPage: 10,
    };
  },
  mounted() {
    this.getBlogs({
      page: this.page,
      limit: this.selectedPerPage,
    });
  },
  name: "Home",
  components: {
    BlogCard,
  },
  methods: {
    ...mapActions("user", ["getBlogs"]),
  },
  computed: {
    ...mapGetters("user", ["blogs"]),
    ...mapGetters("user",["perPage"]),
    ...mapGetters("user",["selectedPerPage"]),

  },
  watch: {
    page() {
      this.getBlogs({
        page: this.page,
        limit: this.selectedPerPage,
      });
    },
    selectedPerPage() {
      this.getBlogs({
        page: this.page,
        limit: this.selectedPerPage,
      });
    },
  },
};
</script>

<style scoped>
  .pagination-buttons{
    display:flex;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
</style>
