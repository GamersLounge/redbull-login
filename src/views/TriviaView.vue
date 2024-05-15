<template>
  <div class="h-100">
    <v-card class="pa-6 elevation-0 mx-auto mt-12" rounded="xl" max-width="600">
      <v-card-title>Trivia</v-card-title>

      <v-row class="my-2 mx-0">
        <v-col cols="12 pa-1">
          <v-select
            v-model="selectedGame"
            :items="filteredGames"
            :loading="!gameStore.isGamesLoaded"
            item-title="name"
            item-value="id"
            label="Games"
            return-object
            density="compact"
            variant="outlined"
            rounded="xl"
            hide-details
            clearable
            class="text-h2 game-selection"
          >
            <template #item="{ item, props: { onClick } }">
              <v-list-item @click="onClick">
                <div class="d-flex align-center">
                  <v-img
                    style="max-width: 50px"
                    crossorigin="anonymous"
                    :src="`${$config.baseURL}/${item.raw.logo}`"
                  ></v-img>
                  <v-spacer></v-spacer>

                  <!-- <v-img class="logo" style="max-width: 40px" src="@assets/images/redbull-logo.svg" /> -->
                  <div class="text-h6">
                    {{ item.title }}
                  </div>
                </div>
              </v-list-item>
              <v-divider
                :thickness="1"
                class="border-opacity-100 my-3"
              ></v-divider>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12 pa-1">
          <ErrorsInput
            :errors="v$.selectedGame.$errors"
            :vuelidateErrors="true"
          />
        </v-col>
      </v-row>

      <v-row class="my-2 mx-0">
        <v-col cols="12 pa-1">
          <TextField v-model="v$.uuid.$model" placeholder="UUID" />
        </v-col>

        <v-col cols="12 pa-1">
          <ErrorsInput :errors="v$.uuid.$errors" :vuelidateErrors="true" />
        </v-col>
      </v-row>

      <v-row class="my-2 mx-0">
        <TextField
          :value="selectedUser ? selectedUser.username : ''"
          :readonly="true"
          placeholder="User"
        />
      </v-row>

      <v-row class="my-2 mx-0 align-center">
        <TextField
          :value="userScore"
          :readonly="true"
          placeholder="User Score"
        />

        <InfoButtonSM
          @click="loadUserScore()"
          :value="'load'"
          :isGradient="true"
          :loading="!scoreStore.isScoresLoaded"
        />
      </v-row>

      <v-row class="my-2 mx-0">
        <v-col cols="12" class="pa-0">
          <TextField v-model="score" placeholder="Score" />
        </v-col>

        <!-- <v-col cols="12 ">
          <ErrorsInput :errors="v$.score.$errors" :vuelidateErrors="true" />
        </v-col> -->
      </v-row>

      <v-row class="my-2 mx-0">
        <v-col cols="6" class="pa-1">
          <Button
            :name="'+'"
            @click="saveScore('positive')"
            :loading="!scoreStore.isScoresLoaded"
          />
        </v-col>

        <v-col cols="6" class="pa-1">
          <Button
            :name="'-'"
            @click="saveScore('negative')"
            :loading="!scoreStore.isScoresLoaded"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useGameStore } from "@stores/game.js";
import { useUserStore } from "@stores/user.js";
import { useScoreStore } from "@stores/score.js";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import InfoButtonSM from "@components/buttons/InfoButtonSM.vue";
export default {
  name: "TriviaView",
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },

  validations() {
    return {
      selectedGame: { required },
      uuid: { required },
    };
  },

  components: {
    InfoButtonSM,
  },

  data: () => ({
    selectedGame: null,

    userScore: "",

    uuid: "",
    score: "",
  }),
  computed: {
    ...mapStores(useScoreStore),
    ...mapStores(useGameStore),
    ...mapStores(useUserStore),

    selectedUser() {
      if (!this.uuid) {
        return;
      }
      return this.userStore.users.find((user) => user.uuid == this.uuid);
    },

    filteredGames() {
      return this.gameStore.games.filter((game) => {
        return game.platform == "Trivia";
      });
    },
  },
  methods: {
    async loadUserScore() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.scoreStore
        .getUserScore({
          userId: this.selectedUser.id,
          gameId: this.selectedGame.id,
        })
        .then((res) => {
          this.userScore = res?.score ?? 0;
        });
    },

    async saveScore(scoreType) {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.scoreStore
        .setTriviaScore({
          data: { score: scoreType == "positive" ? this.score : -this.score },
          userId: this.selectedUser.id,
          gameId: this.selectedGame.id,
        })
        .then((res) => {
          this.userScore = res.score;
        });
    },
  },
  created() {
    if (this.gameStore.games.length <= 0) {
      this.gameStore.fetchGames();
    }
    if (this.userStore.users.length <= 0) {
      this.userStore.fetchUsers();
    }
  },
};
</script>

<style scoped>
/* :deep(.table-class thead) {
  background: rgb(var(--v-theme-table-header-bg)) !important;
  border-radius: 20px;
} */

.game-selection {
  max-width: 600px;
}
</style>
