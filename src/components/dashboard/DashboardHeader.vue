<template>
  <v-app-bar flat density="comfortable">
    <v-app-bar-nav-icon variant="text" @click.stop="dashboardRail = !dashboardRail" />

    <v-app-bar-title class="text-button font-weight-bold">
      <router-link class="activeLink" to="/">{{ appName }}</router-link>
    </v-app-bar-title>

    <template v-slot:append>
      <v-row dense align="end" justify="end" v-if="!authStore.isAuthenticated">
        <v-col cols="auto">
          <v-btn variant="text" density="comfortable" to="/login">Login</v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn variant="text" density="comfortable" to="/register">Register</v-btn>
        </v-col>
      </v-row>

      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon="" v-bind="props" size="40">
            <v-avatar color="brown" size="40">
              <span class="text-body-1">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>

              <h3>{{ authStore.user.username }}</h3>

              <p class="mt-1">
                {{ authStore.user.email }}
              </p>

              <v-divider class="my-3"></v-divider>

              <!-- <v-btn variant="text" rounded> Account </v-btn>

              <v-btn variant="text" rounded to="Dashboard"> Dashboard </v-btn>

              <v-divider class="my-3"></v-divider> -->

              <v-btn variant="text" rounded @click="authStore.logout"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
// Store
import { mapStores, mapState, mapWritableState } from "pinia";
import { useAppStore } from "@stores/app";
import { useAuthStore } from "@stores/auth";

export default {
  name: "AppBar",

  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),

  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAppStore, ["appName"]),
    ...mapWritableState(useAppStore, ["dashboardRail"]),
  },
};
</script>

<style scoped></style>
