<template>
  <AdministratorHomeView v-if="authStore.isAdministrator" />

  <AdminHomeView v-else-if="authStore.isGameAdmin || authStore.isScoreAdmin" />

  <TriviaView v-else-if="authStore.isTriviaAdmin" />

  <UserHomeView v-else />
</template>

<script>
// Store
import { useAuthStore, useProfileStore } from "@/stores/index.js";

// Components
import AdministratorHomeView from "@/views/AdministratorHomeView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";
import TriviaView from "@/views/TriviaView.vue";
import UserHomeView from "@/views/UserHomeView.vue";

export default {
  name: "HomeView",

  components: {
    AdministratorHomeView,
    AdminHomeView,
    TriviaView,
    UserHomeView,
  },

  setup() {
    const authStore = useAuthStore();
    const profileStore = useProfileStore();

    return { authStore, profileStore };
  },
};
</script>
