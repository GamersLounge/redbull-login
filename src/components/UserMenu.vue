<template>
  <v-menu rounded v-if="authStore.isAuthenticated && $route.name != 'profile'">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="40" icon="">
        <v-avatar>
          <v-img
            crossorigin="anonymous"
            alt="User Avatar"
            :src="getRemoteAsset(authStore.user.avatar) || getLocalAvatar('avatar_0.svg')"
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>

    <v-card min-width="220px" class="bg-black text-white pa-3 user-menu-card">
      <!-- Navigation -->
      <div class="text-start">
        <v-btn
          v-if="authStore.isAdministrator"
          variant="text"
          rounded
          to="dashboard"
          class="menu-text"
        >
          Dashboard
        </v-btn>
      </div>

      <div class="text-start" v-if="authStore.isUser">
        <v-btn variant="text" rounded to="profile" class="menu-text"> ACCOUNT SETTINGS </v-btn>
      </div>

      <!-- <v-divider class="my-3"></v-divider> -->
      <!-- Theme -->
      <!-- <div class="text-center">
          <v-switch
            v-model="darkMode"
            class="d-inline-flex w-auto"
            density="compact"
            color="primary"
            hide-details
            prepend-icon="mdi-white-balance-sunny"
            append-icon="mdi-weather-night"
            @click.stop
          />
        </div> -->
      <!-- <v-divider class="my-3"></v-divider> -->

      <!-- Logout -->
      <div class="text-start">
        <v-btn variant="text" rounded @click="authStore.logout" class="menu-text"> LOGOUT </v-btn>
      </div>
    </v-card>
  </v-menu>

  <div v-else-if="$route.name == 'profile'" class="px-2 text-h6">
    <v-icon v-if="!isEditing" class="cursor-pointer text-black" @click="isEditing = true">
      mdi-pencil
    </v-icon>
    <v-icon v-if="isEditing" class="cursor-pointer text-black" @click="isEditing = false">
      mdi-close
    </v-icon>
  </div>
</template>

<script>
// Store
import { mapStores, mapWritableState } from "pinia";
import { useAppStore, useAuthStore, useProfileStore } from "@stores";

// Helpers
import { getLocalAvatar, getRemoteAsset } from "@helpers/file.js";

export default {
  name: "UserMenu",

  computed: {
    ...mapWritableState(useProfileStore, ["isEditing"]),
    ...mapStores(useAppStore, useAuthStore),

    darkMode: {
      get() {
        return this.appStore.darkMode;
      },

      set(state) {
        return this.appStore.setDarkMode(this.$vuetify, state);
      },
    },
  },

  setup() {
    return { getLocalAvatar, getRemoteAsset };
  },
};
</script>

<style scoped>
.user-menu-card {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 7% 100%, 0 79%);
}
.menu-text {
  font-size: calc(0.8rem + 0.3vw);
}
</style>
