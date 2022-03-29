<template>
  <v-container>
      <h1> List Blogs </h1>
      <v-list>
        <v-list-item v-for="blog in blogs" :key="blog.id" > 
        <v-list-item-title> {{blog.title}}  </v-list-item-title>
         </v-list-item>
      </v-list>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  beforeMount(){
    this.getBlogs()
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