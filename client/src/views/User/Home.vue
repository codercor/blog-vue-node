<template>
  <div>
    <v-row>
      <v-col v-for="(blog, i) in blogs" :key="i" cols="6">
        <BlogCard :blog="blog"
      /></v-col>
      <v-col cols="10" class="pagination-buttons">
        <v-pagination
          v-model="page"
          :length="blogsMeta.pageCount"
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

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
 
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
    ...mapMutations("user",["setPage","setSelectedPerPage"])
  },
  computed: {
    ...mapGetters("user", ["blogs","perPage","blogsMeta"]),
    page:{
      get() {
        return this.$store.state.user.page;
      },
      set(val) {
       this.setPage(val);
      }
    },
    selectedPerPage:{
      get() {
        return this.$store.state.user.selectedPerPage;
      },
      set(val) {
        this.setSelectedPerPage(val);
      }
    }
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
