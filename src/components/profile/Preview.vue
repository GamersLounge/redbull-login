<template>
  <!-- Profile Section -->
  <v-card-title class="mt-4 text-basic-text text-center font-poppins-medium card-title">
    Account Settings
  </v-card-title>

  <v-card class="pa-6 elevation-0 mx-auto" max-width="600">
    <v-img
      crossorigin="anonymous"
      alt="User Avatar"
      height="125"
      :src="getRemoteAsset(profile.avatar) || getLocalAvatar('avatar_0.svg')"
    ></v-img>

    <InfoButtonLG
      class="my-3 elevation-5"
      :value="'User Name: ' + profile.username"
      :textColor="'text-basic-text'"
      :bgColor="'bg-white'"
    />

    <InfoButtonLG
      class="my-3 elevation-5"
      :value="'Name: ' + profile.name"
      :textColor="'text-basic-text'"
      :bgColor="'bg-white'"
    />

    <InfoButtonLG
      class="my-3 elevation-5"
      :value="'Email: ' + profile.email"
      :textColor="'text-basic-text'"
      :bgColor="'bg-white'"
    />

    <!-- v-if="profile.phone" -->
    <InfoButtonLG
      class="my-3 elevation-5"
      :value="'Mobile No.: ' + profile.phone"
      :textColor="'text-basic-text'"
      :bgColor="'bg-white'"
    />
  </v-card>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useProfileStore } from "@stores";

// Helpers
import { getLocalAvatar, getRemoteAsset } from "@helpers/file.js";

// Components
import InfoButtonLG from "@components/buttons/InfoButtonLG.vue";

export default {
  name: "ProfileView",

  components: {
    InfoButtonLG,
  },

  data: () => ({}),

  computed: {
    ...mapStores(useProfileStore),
    profile() {
      return this.profileStore.profile;
    },
  },

  methods: {},

  setup() {
    return { getLocalAvatar, getRemoteAsset };
  },

  created() {},
};
</script>

<style scoped>
.card-title {
  font-size: calc(1.5rem + 0.3vw);
}
</style>
