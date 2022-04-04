<template>
  <v-snackbar v-model="notification.seen" :color="notification.type" >
    {{ notification.text }}

    <template v-slot:action="{ attrs }">
      <v-btn v-if="notification.link" color="white" text v-bind="attrs" @click="openLink">
        Link
      </v-btn>
      <v-btn  color="white" text v-bind="attrs" @click="closeNotification">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["notification"]),
  },
  methods:{
    ...mapMutations(["closeNotification"]),
    openLink(){
      window.open(this.notification.link, "_blank");
    }
  }
};
</script>

<style></style>
