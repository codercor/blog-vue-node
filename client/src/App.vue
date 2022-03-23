<template>
  <v-app>
    <Navbar :toggleIsOpen="toggleIsOpen" />

    <v-main>
      <div class="mt-10">
        <SideBar :isOpen="isOpen" />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Common/Navbar";
import SideBar from "@/components/Common/SideBar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    SideBar,
  },
  data: () => ({
    isOpen: false,
  }),
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
