<template>
  <RouterView v-if="profileStore.profile" />
</template>

<script>
// Store
import { useProfileStore } from "@stores";
import { RouterView } from "vue-router";

export default {
  name: "MembersLayout",
  components: { RouterView },
  setup() {
    const profileStore = useProfileStore();

    return { profileStore };
  },

  created() {
    // Get user's profile
    this.profileStore.getProfile();
  },
};
</script>
