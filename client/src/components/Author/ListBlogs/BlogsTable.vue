<template>
  <v-data-table
    :headers="headers"
    :items="blogs"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card> <EditBlog /></v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-help </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:item.createdAt="{ item }">
      {{ item.createdAt | dateFormat }}
    </template>
    <template v-slot:item.updatedAt="{ item }">
      {{ item.updatedAt | dateFormat }}
    </template>
    <template v-slot:item.content="{ item }">
      <div v-html="item.content.substring(0, 50) + '...'"></div>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import CreateBlog from "../CreateBlog";

export default {
  props: ["blogs"],
  components: { EditBlog:CreateBlog },
  data: () => ({
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Title", value: "title" },
      { text: "Content", value: "content" },
      { text: "Created At", value: "createdAt" },
      { text: "Updated At", value: "updatedAt" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    blogs: [],
    editedIndex: -1,
    itemIdWillDelete: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters("author", ["isEditMode"]),
    dialog:{
      get(){
        return this.isEditMode;
      },
      set(value){
        this.setIsEditMode(value);
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapMutations("author", ["setIsEditMode","setEditedBlog"]),
    ...mapActions("author", ["deleteBlog","getBlogs"]),
    initialize() {},

    editItem(item) {
      console.log(item);
      const {id,title,content,coverImage} = item;
      this.dialog = true;
      this.setEditedBlog({id,title,content,coverImage});
    },

    deleteItem(item) {
      this.itemIdWillDelete = item.id;
      this.dialogDelete = true;
    },

   async deleteItemConfirm() {
      await this.deleteBlog(this.itemIdWillDelete);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.blogs[this.editedIndex], this.editedItem);
      // } else {
      //   this.blogs.push(this.editedItem);
      // }
      // this.close();
    },
  },
  filters: {
    dateFormat: function (value) {
      let date = new Date(value);
      return date.toLocaleString("tr-TR");
    },
  },
};
</script>
