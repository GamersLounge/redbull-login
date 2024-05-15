<template>
  <v-data-table-virtual
    :headers="headers"
    :items="scoreStore.scores"
    :search="search"
    item-key="name"
    items-per-page="-1"
    hover
    class="rounded"
    height="600"
    :loading="!scoreStore.isScoresLoaded"
  >
    <template v-slot:top>
      <v-toolbar rounded color="surface">
        <v-toolbar-title>Scores</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          placeholder="Search"
          v-model="search"
          density="compact"
          variant="solo-filled"
          flat
          hide-details
        ></v-text-field>

        <v-divider vertical inset class="mx-4"></v-divider>

        <v-btn
          variant="outlined"
          color="green"
          @click="scoreStore.fetchScores"
          :loading="!scoreStore.isScoresLoaded"
        >
          Refresh
        </v-btn>
      </v-toolbar>
    </template>

    <!-- Created At -->
    <template v-slot:[`item.createdAt`]="{ value }">
      {{ formatDate(value) }}
    </template>

    <!-- Updated At -->
    <template v-slot:[`item.updatedAt`]="{ value }">
      {{ formatDate(value) }}
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editScore(item)">
        mdi-pencil
      </v-icon>
    </template>

    <template #bottom> </template>
  </v-data-table-virtual>

  <ScoreDialog ref="setScoreDialog"></ScoreDialog>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useScoreStore } from "@stores/score.js";
import { useGameStore } from "@stores/game.js";
import { useUserStore } from "@stores/user.js";

import ScoreDialog from "@components/dashboard/score/ScoreDialog.vue";

export default {
  name: "ScoresView",
  components: {
    ScoreDialog,
  },
  data: () => ({
    search: "",
    headers: [
      { title: "User", value: "user.username" },
      { title: "Game", value: "game.name" },
      { title: "Score", value: "score" },

      { title: "Created", value: "createdAt" },
      { title: "Updated", value: "updatedAt" },
      { title: "Actions", key: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapStores(useScoreStore),
    ...mapStores(useGameStore),
    ...mapStores(useUserStore),

    mappedScores() {
      const enrichedUserGames = this.scoreStore.queues.map((score) => {
        const game = this.gameStore.games.find(
          (game) => game.id === score.gameId
        );
        const user = this.userStore.users.find(
          (user) => user.id === score.userId
        );
        return { ...score, user, game };
      });
      return enrichedUserGames;
    },
  },
  methods: {
    editScore(score) {
      this.$refs.setScoreDialog.openDialog(score);
    },

    formatDate(date) {
      return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(new Date(date))
        .split(", ")
        .join(" - ");
    },
  },
  created() {
    if (this.scoreStore.scores.length <= 0) {
      this.scoreStore.fetchScores();
    }
    if (this.gameStore.games.length <= 0) {
      this.gameStore.fetchGames();
    }
    if (this.userStore.users.length <= 0) {
      this.userStore.fetchUsers();
    }
  },
};
</script>

<style scoped></style>
