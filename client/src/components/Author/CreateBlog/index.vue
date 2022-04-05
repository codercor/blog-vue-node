<template>
  <div>
    <v-text-field
      v-model="title"
      label="Başlık"
      style="font-size: 25px"
    />
    <div class="img-preview" >
      <input ref="imageInput" @change="imageSelect" type="file" style="display:none" />
      <img :src="previewImg" alt="">
      <v-btn icon @click="openSelectImage" > <v-icon color="purple">mdi-image</v-icon> </v-btn>
    </div>
    <vue-editor v-model="content" />
    <v-btn v-if="!isEditMode" @click="createBlog" color="success" style="margin-top: 10px">
      <v-icon>mdi-check</v-icon>
      Publish
    </v-btn>
    <v-btn v-else @click="updateBlog" color="success" style="margin-top: 10px">
      <v-icon>mdi-check</v-icon>
      Update
    </v-btn>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters, mapMutations,mapActions } from "vuex";
export default {
  components: { VueEditor },
  data(){
    return {
      selectedImage:null,
      previewImg:null
    }
  },
  methods: {
    ...mapMutations("author", ["setNewBlog","setEditedBlog"]),
    ...mapActions("author", ["createBlog","updateBlog"]),
    openSelectImage(){
      this.$refs.imageInput.click();
    },
    imageSelect(){
      console.log("Dosya seçildi !");
      this.selectedImage = this.$refs.imageInput.files[0];
      console.log(this.selectedImage);
      this.previewImg = URL.createObjectURL(this.selectedImage); 
      console.log(this.previewImg);
    }
  },
  computed: {
    title:{
      get(){
        return this.isEditMode ? this.editedTitle: this.newBlogTitle;
      },
      set(val){
        this.isEditMode ? this.editedTitle = val : this.newBlogTitle = val;
      }
    },
    content:{
      get(){
        return this.isEditMode ? this.editedContent : this.newBlogContent;
      },
      set(val){
        this.isEditMode ? this.editedContent = val : this.newBlogContent = val;
      }
    },
    ...mapGetters("author", ["newBlog","isEditMode","editedBlog"]),
    newBlogContent: {
      get() {
        return this.newBlog.content;
      },
      set(val) {
        this.setNewBlog({ content: val,title:this.newBlog.title });
      },
    },
    newBlogTitle: {
      get() {
        return this.newBlog.title;
      },
      set(val) {
        this.setNewBlog({ title: val, content: this.newBlog.content });
      },
    },
    editedContent:{
      get(){
        return this.editedBlog.content;
      },
      set(val){
        this.setEditedBlog({...this.editedBlog,content:val});
      }
    },
    editedTitle:{
      get(){
        return this.editedBlog.title;
      },
      set(val){
        this.setEditedBlog({title:val,content:this.editedBlog.content,id:this.editedBlog.id});
      }
    }
  },
};
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
.img-preview{
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
}
.img-preview img{
  height: 100%;
}
.img-preview button{
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
}
</style>
