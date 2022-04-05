<template>
  <div>
    <CreateBlog/>
  </div>
</template>

<script>
import CreateBlog from '@/components/Author/CreateBlog'
import { mapMutations } from 'vuex'
export default {
  beforeMount(){
    this.setIsEditMode(false);
    this.setEditedBlog({
      title: '',
      content: '',
      id:null
    })
  },
  methods:{
    ...mapMutations('author',['setEditedBlog','setIsEditMode'])
  },
  components: { CreateBlog },
}
</script>

<style>

</style>