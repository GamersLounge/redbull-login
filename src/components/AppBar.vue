<template>
  <v-app-bar color="transparent" :absolute="true" app flat density="comfortable">
    <!-- absolute -->
    <v-app-bar-nav-icon
      v-if="
        authStore.isAuthenticated &&
        !authStore.isAdministrator &&
        !authStore.isGameAdmin &&
        !authStore.isScoreAdmin
      "
      variant="text"
      @click.stop="appStore.drawer = !appStore.drawer"
      class="text-primary"
      density="compact"
    />

    <img
      v-if="authStore.isGameAdmin || authStore.isScoreAdmin || authStore.isTriviaAdmin"
      class="app-bar-logo cursor-pointer"
      alt="Your Logo"
      src="@assets/images/redbull-logo.svg"
      @click="$router.push('/')"
    />

    <!-- <v-app-bar-title class="text-button font-weight-bold">
      <router-link class="activeLink" to="/">{{ appStore.appName }}</router-link>
    </v-app-bar-title> -->

    <template v-slot:append>
      <h3 v-if="authStore.isAuthenticated && authStore.isUser" class="px-1 text-light-blue">
        Rank {{ profileStore?.profile?.rank ?? "-" }}
        <!-- {{ authStore.user.username }} -->
      </h3>

      <h3 v-if="authStore.isAuthenticated && authStore.isUser" class="px-4 text-light-blue">
        Score: {{ profileStore.totalScore }}
      </h3>

      <!-- User Authentication -->
      <v-row dense align="end" justify="end" v-if="!authStore.isAuthenticated">
        <v-col cols="auto">
          <v-btn variant="text" density="comfortable" to="/login"> Login </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn variant="text" density="comfortable" to="/register"> Register </v-btn>
        </v-col>
      </v-row>

      <!-- User Dropdown Menu -->
      <UserMenu />
    </template>
  </v-app-bar>
</template>

<script>
// Store
import { useAppStore, useAuthStore, useProfileStore } from "@stores";

// Components
import UserMenu from "@components/UserMenu.vue";

export default {
  name: "AppBar",

  components: { UserMenu },

  data: () => ({}),
  setup() {
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const profileStore = useProfileStore();

    return { appStore, authStore, profileStore };
  },
};
</script>

<style scoped>
.app-bar-logo {
  max-width: 50px;
  margin: 0px 30px;
}
</style>
