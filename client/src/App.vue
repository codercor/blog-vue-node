<template>
  <v-app>
    <Navbar :toggleIsOpen="toggleIsOpen" />

    <v-main app>
      <v-container>
        <v-row>
          <v-col cols="9">
            <div class="mt-10">
              <SideBar :isOpen="isOpen" />
              <router-view />
            </div>
          </v-col>
          <v-col cols="3"> <RightBar /></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Common/Navbar";
import SideBar from "@/components/Common/SideBar.vue";
import RightBar from "./components/User/Common/RightBar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    SideBar,
    RightBar,
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
