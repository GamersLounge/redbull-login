<template>
  <v-navigation-drawer
    v-model="drawer"
    border="0"
    :rail="dashboardRail"
    permanent
    color="dark-background"
  >
    <v-list nav color="primary">
      <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="Users"
        :to="{ name: 'dashboard.users' }"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-gamepad-variant-outline"
        title="Games"
        :to="{ name: 'dashboard.games' }"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-tray-full"
        title="Scores"
        :to="{ name: 'dashboard.scores' }"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-tray-full"
        title="Logs"
        :to="{ name: 'dashboard.logs' }"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-tray-full"
        title="Trivia"
        :to="{ name: 'dashboard.trivia' }"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Store
import { mapState, mapWritableState } from "pinia";
import { useAppStore } from "@stores/app";
import { useAuthStore } from "@stores/auth.js";

// Assets

export default {
  name: "DashboardSidebar",

  data: () => ({
    drawer: true,
  }),

  computed: {
    ...mapWritableState(useAppStore, ["dashboardRail"]),
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>
