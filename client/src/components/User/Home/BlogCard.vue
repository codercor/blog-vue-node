<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="blog.coverImage || 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'"
      height="200px"
    ></v-img>

    <v-card-title>
     {{blog.title}}
    </v-card-title>

    <v-card-subtitle>
      {{blog.content.substring(0, 35)}}...
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text      
        @click="goBlogDetails"
      >
        Devamını Oku
      </v-btn>

      
      

      <v-spacer></v-spacer>
    </v-card-actions>

    <!-- <router-link to="/blog/">Link </router-link> -->

  </v-card>
</template>

<script>
  export default {
    props:["blog"],
    data: () => ({
      show: false,
    }),
    methods:{
      goBlogDetails(){
        this.$router.push("/blog/"+ this.blog.id)
      }
    }
  }
</script>

<style>

</style>