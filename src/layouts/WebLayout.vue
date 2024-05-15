<template>
  <v-app id="app">
    <AppSidebar
      v-if="
        authStore.isAuthenticated &&
        !authStore.isAdministrator &&
        !authStore.isGameAdmin &&
        !authStore.isScoreAdmin
      "
    ></AppSidebar>

    <AppBar></AppBar>

    <v-main>
      <!-- <v-container> -->
      <RouterView />
      <!-- </v-container> -->
    </v-main>

    <!-- <AppFooter></AppFooter> -->
  </v-app>
</template>

<script>
// Router
import { RouterView } from "vue-router";

// Store
import { mapActions } from "pinia";
import { useAuthStore, useProfileStore, useGameStore } from "@stores";

// Components
import AppBar from "@components/AppBar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
// import AppFooter from "@components/AppFooter.vue";

export default {
  name: "WebLayout",

  components: { RouterView, AppBar, AppSidebar },

  setup() {
    const authStore = useAuthStore();
    const profileStore = useProfileStore();

    return { authStore, profileStore };
  },

  methods: {
    ...mapActions(useGameStore, ["fetchGames"]),
  },

  async created() {
    // Attempt to authenticate user
    // Fetch user's profile
    // await this.profileStore.getProfile();
    // // Fetch all games
    // await this.fetchGames();
  },
};
</script>
