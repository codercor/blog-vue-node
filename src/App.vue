<template>
  <v-app>
    <Navbar v-if="!isRouteAuth" :toggleIsOpen="toggleIsOpen" />

    <v-main app>
      <v-container>
        <v-row>
          <v-col :cols="isRouteAuth ? 12 : 9">
            <div class="mt-10">
              <SideBar :isOpen="isOpen" />
              <router-view />
            </div>
          </v-col>
          <v-col v-if="!isRouteAuth" cols="3"> <RightBar /></v-col>
        </v-row>
      </v-container>
    </v-main>
    <Notification />
  </v-app>
</template>

<script>
import Navbar from "@/components/Common/Navbar";
import SideBar from "@/components/Common/SideBar.vue";
import RightBar from "./components/User/Common/RightBar.vue";
import Notification from "@/components/Common/Notification.vue";
export default {
  name: "App",
  components: {
    Navbar,
    SideBar,
    RightBar,
    Notification,
  },
  computed: {
    isRouteAuth() {
      return this.$route.matched[0].path == "/auth";
    },
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
