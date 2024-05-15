<template>
  <v-app id="app" class="bg-game-admin-bg">
    <DashboardHeader></DashboardHeader>

    <DashboardSidebar></DashboardSidebar>

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// Store
import { mapState } from "pinia";
import { useAppStore } from "@/stores/app.js";

// Components
import { RouterView } from "vue-router";
import DashboardHeader from "@components/dashboard/DashboardHeader.vue";
import DashboardSidebar from "@components/dashboard/DashboardSidebar.vue";

export default {
  name: "DashboardLayout",

  components: {
    RouterView,
    DashboardHeader,
    DashboardSidebar,
  },

  computed: {},
};
</script>

<style scoped></style>
