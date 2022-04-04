<template>
  <div>
    <v-text-field
      v-model="newBlogTitle"
      label="Başlık"
      style="font-size: 25px"
    />
    <vue-editor v-model="newBlogContent" />
    <v-btn @click="createBlog" color="success" style="margin-top: 10px">
      <v-icon>mdi-check</v-icon>
      Yayınla
    </v-btn>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters, mapMutations,mapActions } from "vuex";
export default {
  components: { VueEditor },
  methods: {
    ...mapMutations("author", ["setNewBlog"]),
    ...mapActions("author", ["createBlog"]),
  },
  computed: {
    ...mapGetters("author", ["newBlog"]),
    newBlogContent: {
      get() {
        return this.newBlog.content;
      },
      set(val) {
        this.setNewBlog({ content: val });
      },
    },
    newBlogTitle: {
      get() {
        return this.newBlog.title;
      },
      set(val) {
        this.setNewBlog({ title: val });
      },
    },
  },
};
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>
