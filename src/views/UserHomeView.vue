<template>
  <v-card
    color="transparent"
    v-if="profile"
    rounded="xl"
    max-width="600"
    class="pa-0 elevation-0 mx-auto"
  >
    <Logo />

    <v-row class="ma-0 pt-6">
      <InfoButtonLG
        class="ma-3"
        :value="'Name: ' + profile.username"
        :textColor="'text-light-blue'"
        :bgColor="'bg-grey'"
      />

      <InfoButtonLG
        class="ma-3"
        :value="'UUID: ' + profile.uuid"
        :textColor="'text-light-blue'"
        :bgColor="'bg-grey'"
      />
      <InfoButtonLG
        class="ma-3"
        :value="'Score: ' + profileStore.totalScore"
        :textColor="'text-light-blue'"
        :bgColor="'bg-grey'"
      />

      <InfoButtonLG
        class="ma-3"
        :value="'Rank: ' + profile.rank"
        :textColor="'text-light-blue'"
        :bgColor="'bg-grey'"
      />

      <InfoButtonLG
        class="ma-3 cursor-pointer"
        :value="'Start Playing'"
        :isGradient="true"
        @click="goToActivations()"
      />
    </v-row>

    <!-- <div class="text-disabled">Games Played</div>
    <div class="font-weight-bold text-high-emphasis">{{ profile.scores.length }}</div> -->
  </v-card>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useProfileStore } from "@stores";
import { useAuthStore } from "@stores/auth.js";

// Helpers
import { getLocalImage, getRemoteAsset } from "@helpers/file.js";
import InfoButtonLG from "@components/buttons/InfoButtonLG.vue";
import Logo from "@components/Logo.vue";

export default {
  name: "UserHomeView",
  components: {
    InfoButtonLG,
    Logo,
  },

  computed: {
    ...mapStores(useAuthStore),
    profile() {
      return this.profileStore.profile;
    },
  },
  methods: {
    goToActivations() {
      this.$router.push({ name: "activations" });
    },
  },
  setup() {
    const profileStore = useProfileStore();

    return { profileStore, getLocalImage, getRemoteAsset };
  },
};
</script>

<style scoped></style>
