<template>
  <div>
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col v-for="(blog, i) in blogs" :key="i" cols="6">
            <BlogCard :blog="blog"
          /></v-col>
        </v-row>
      </v-col>
      <v-col cols="3"> <RightBar /></v-col>
    </v-row>
  </div>
</template>

<script>
import RightBar from "../../components/User/Common/RightBar.vue";
import BlogCard from "../../components/User/Home/BlogCard.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.getBlogs();
  },
  name: "Home",
  components: {
    RightBar,
    BlogCard,
  },
  methods: {
    ...mapActions("user", ["getBlogs"]),
  },
  computed: {
    ...mapGetters("user", ["blogs"]),
  },
};
</script>
