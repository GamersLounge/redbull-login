<template>
  <div>
    <Logo />

    <v-card max-width="600" class="mx-auto px-4 py-5 elevation-0">
      <v-slide-y-transition mode="out-in">
        <v-expansion-panels>
          <v-expansion-panel v-for="game in filteredGames" :key="game.id" :title="game.name">
            <v-expansion-panel-text>
              <div v-html="game.description"></div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useGameStore } from "@stores/game.js";
import { useAuthStore } from "@stores/auth.js";

import Logo from "@components/Logo.vue";
import InfoButtonSM from "@components/buttons/InfoButtonSM.vue";

export default {
  name: "QuestsView",

  components: {
    InfoButtonSM,
    Logo,
  },
  data: () => ({
    dialog: false,

    userSlots: [],

    // gamesTest: [
    //   {
    //     id: 1,
    //     name: "name",
    //     description:
    //       "Lorem <a href='https://www.google.com/' target='_blank' >lolo</a> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   },
    //   {
    //     id: 2,
    //     name: "name2",
    //     description:
    //       "Lorem <a href='https://www.google.com/' target='_blank' >link link</a> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   },
    //   {
    //     id: 3,
    //     name: "name3",
    //     description:
    //       "Lorem <a href='https://www.google.com/' target='_blank' >link link</a> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   },
    // ],
  }),
  computed: {
    ...mapStores(useGameStore),
    ...mapStores(useAuthStore),

    filteredGames() {
      return this.gameStore.games.filter((game) => game.platform == "Quest");
    },
  },
  methods: {},

  created() {
    this.gameStore.fetchGames();
  },
};
</script>

<style scoped>
:deep(a) {
  color: rgb(var(--v-theme-light-blue));
}
</style>
