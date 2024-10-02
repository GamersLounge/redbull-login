<template>
  <div>
    <RouterView v-if="profileStore.profile" />

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" timeout="10000" top right color="success">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
// Store
import { useProfileStore } from "@stores";
import { RouterView } from "vue-router";
import { message } from "@/config/socket";
import { ref, watch } from "vue";

export default {
  name: "MembersLayout",
  components: { RouterView },
  setup() {
    const profileStore = useProfileStore();

    // Snackbar state
    const snackbar = ref(false);
    const snackbarMessage = ref("");

    // Watch the message and show snackbar when it changes
    watch(message, (newMessage) => {
      if (newMessage) {
        snackbarMessage.value = newMessage.value;
        snackbar.value = true; // Show snackbar
      }
    });

    return { profileStore, message, snackbar, snackbarMessage };
  },

  created() {
    // Get user's profile
    this.profileStore.getProfile();
  },
};
</script>
