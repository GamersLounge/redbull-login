<template>
  <v-navigation-drawer v-model="appStore.drawer" border="0" temporary class="drawer">
    <v-list nav class="px-6">
      <p class="font-poppins-medium drawer-title py-5">Main Menu</p>

      <!-- prepend-icon="mdi-account" -->
      <v-list-item v-if="authStore.isUser" :to="{ name: 'home' }" exact class="font-poppins-light">
        User Info
      </v-list-item>

      <v-list-item
        v-if="authStore.isUser"
        :to="{ name: 'activations' }"
        exact
        class="font-poppins-light"
      >
        Activations
      </v-list-item>

      <v-list-item
        v-if="authStore.isUser"
        :to="{ name: 'quests' }"
        exact
        class="font-poppins-light"
      >
        Quests
      </v-list-item>

      <!-- prepend-icon="mdi-tray-full" -->
      <v-list-item
        v-if="authStore.isGameAdmin || authStore.isScoreAdmin || authStore.isTriviaAdmin"
        :to="{ name: 'queues' }"
        exact
        class="font-poppins-light"
      >
        Queues
      </v-list-item>

      <v-list-item
        v-if="authStore.isTriviaAdmin"
        :to="{ name: 'trivia' }"
        exact
        class="font-poppins-light"
      >
        Trivia
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Store
import { useAppStore, useAuthStore } from "@stores";

export default {
  name: "AppSidebar",

  setup() {
    const appStore = useAppStore();
    const authStore = useAuthStore();

    return { appStore, authStore };
  },
};
</script>

<style scoped>
.drawer {
  background: linear-gradient(
    to bottom,
    rgb(var(--v-theme-dark-blue)) 1%,
    rgb(var(--v-theme-light-blue)) 99%
  );
  color: rgb(var(--v-theme-white));
}
.drawer-title {
  font-size: calc(1.2rem + 0.2vw);
}
</style>
