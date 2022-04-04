<template>
  <v-container>
      <h1> List Blogs </h1>
      <BlogsTable :blogs="blogs"/>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import BlogsTable from '../../../components/Author/ListBlogs/BlogsTable.vue'
export default {
  components: { BlogsTable },
  beforeMount(){
    this.getBlogs()
  },
  updated(){
     console.log(this.blogs);
  },
  methods:{
    ...mapActions("author",['getBlogs'])
  },
  computed:{
    ...mapGetters("author",['blogs'])
  }
}
</script>

<style>

</style>