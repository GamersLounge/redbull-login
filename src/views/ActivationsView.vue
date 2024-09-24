<template>
  <div>
    <Logo />

    <v-row class="ma-0 pt-5">
      <!-- <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider> -->
      <v-container fluid class="py-2">
        <v-card
          color="transparent"
          class="elevation-0 ma-auto d-flex align-center justify-center"
          max-width="500"
        >
          <v-btn-toggle v-model="selectedPlatform" class="align-center">
            <v-btn
              v-for="platform in filteredPlatforms"
              :key="platform"
              class="game-selection-btns no-uppercase text-light-blue"
              :class="{
                'active-selection-btn': selectedPlatform === platform,
              }"
              :value="platform"
              size="small"
              variant="outlined"
              rounded="xl"
            >
              {{ platform }}
            </v-btn>
          </v-btn-toggle>

          <v-spacer></v-spacer>

          <v-icon class="view-icon" v-if="viewType == 'list'" @click="viewType = 'grid'">
            mdi-view-list
          </v-icon>
          <v-icon class="view-icon" v-if="viewType == 'grid'" @click="viewType = 'list'">
            mdi-view-grid
          </v-icon>
        </v-card>
      </v-container>
      <!-- <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider> -->
    </v-row>

    <v-container class="py-0">
      <v-slide-y-transition mode="out-in">
        <v-row class="ma-0" v-if="viewType == 'list'">
          <v-col
            v-for="game in filteredGames"
            :key="game.name"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
            class="pt-2 pb-1"
          >
            <v-card color="transparent" class="elevation-0">
              <v-img
                class="game-image"
                :src="`${$config.baseURL}/${game.image}`"
                crossorigin="anonymous"
                height="200px"
                cover
              >
                <v-card-title
                  v-if="game.queue"
                  class="img-text-overlay font-poppins-medium d-flex align-center justify-center h-100"
                >
                  Ticket ID: {{ game.queue.number }}
                </v-card-title>
              </v-img>

              <v-card-actions class="d-flex pa-0 pt-2">
                <InfoButtonSM
                  :value="'Apply'"
                  :isGradient="true"
                  @click="applyQueue(game.id)"
                  :loading="!queueStore.isQueuesLoaded"
                  :disabled="(game.queue && game.queue.isFinished == false) || !game.isQueueable"
                />

                <InfoButtonSM
                  class="description-btn"
                  :value="'Description'"
                  @click="
                    dialog = true;
                    gameDialog = game;
                  "
                  :textColor="'text-black'"
                />

                <v-spacer></v-spacer>

                <div class="queue text-basic-text">Queue: {{ game.slot }}</div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <div v-else>
          <v-row
            class="mx-0 my-3 align-center justify-center"
            v-for="game in filteredGames"
            :key="game.name"
          >
            <v-img
              class="game-image-list"
              :aspect-ratio="1"
              :src="`${$config.baseURL}/${game.logo}`"
              crossorigin="anonymous"
              rounded="lg"
              contain
            >
            </v-img>

            <InfoButtonSM
              class="mx-2"
              :value="game.queue ? game.queue.number : 'Apply'"
              :isGradient="true"
              @click="applyQueue(game.id)"
              :loading="!queueStore.isQueuesLoaded"
              :disabled="(game.queue && game.queue.isFinished == false) || !game.isQueueable"
            />

            <InfoButtonSM
              class="mx-1 description-btn"
              @click="
                dialog = true;
                gameDialog = game;
              "
              :value="'Description'"
              :textColor="'text-light-blue'"
            />

            <div class="queue-list mx-1 text-basic-text">Queue: {{ game.slot }}</div>
          </v-row>
        </div>
      </v-slide-y-transition>
    </v-container>

    <v-dialog v-model="dialog" width="400" class="custom-dialog">
      <v-card max-width="400" height="auto" rounded="lg" class="px-4 py-7">
        <v-row class="ma-0 align-center">
          <v-img
            class="game-image-list"
            :src="`${$config.baseURL}/${gameDialog.logo}`"
            crossorigin="anonymous"
            rounded="lg"
            contain
          >
          </v-img>

          <div class="text-basic-text font-title text-h5 px-2">
            {{ gameDialog ? gameDialog.name : "" }}
          </div>

          <v-spacer></v-spacer>

          <v-btn class="dialog-close-icon mt--4 text-white bg-black" @click="dialog = false">
            x
          </v-btn>
        </v-row>

        <v-row class="mx-0 my-3 text-basic-text dialog-description">
          <div v-html="gameDialog ? gameDialog.description : ''"></div>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useGameStore } from "@stores/game.js";
import { useQueueStore } from "@stores/queue.js";
import { useAuthStore } from "@stores/auth.js";

import Logo from "@components/Logo.vue";
import InfoButtonSM from "@components/buttons/InfoButtonSM.vue";

export default {
  name: "ActivationsView",

  components: {
    InfoButtonSM,
    Logo,
  },
  data: () => ({
    selectedPlatform: null,
    viewType: "list",

    dialog: false,
    gameDialog: {},

    userSlots: [],

    gamesTest: {},
  }),
  computed: {
    ...mapStores(useQueueStore),
    ...mapStores(useGameStore),
    ...mapStores(useAuthStore),

    mappedGames() {
      const filteredGames = this.gameStore.games.filter(
        (game) => game.platform !== "Trivia" && game.platform !== "Quest"
      );

      const enrichedGames = filteredGames.map((game) => {
        let slot = this.authStore.userSlots.find((slot) => slot.gameId === game.id);
        slot = slot?.slot ?? "000";
        // slot = "00".slice(-2 - slot.length) + slot;
        slot = slot.toString().padStart(3, "0");

        let queue = this.authStore.userQueues.find(
          (queue) => queue.gameId === game.id && queue.isFinished == false
        );
        return { ...game, slot, queue };
      });
      return enrichedGames;
    },

    filteredGames() {
      if (!this.selectedPlatform) {
        return this.mappedGames;
      }
      return this.mappedGames.filter((game) => {
        return game.platform === this.selectedPlatform;
      });
    },

    filteredPlatforms() {
      return this.gameStore.platforms.filter((platform) => {
        return platform != "Trivia" && platform != "Quest";
      });
    },
  },
  methods: {
    applyQueue(gameId) {
      this.queueStore
        .createQueue({
          gameId: gameId,
        })
        .then((res) => {
          this.authStore.getUserSlots(this.authStore.user.id);
          this.authStore.userQueues.push(res);
        });
    },
  },

  created() {
    this.gameStore.fetchGames();
    if (this.authStore.userSlots.length <= 0) {
      this.authStore.getUserSlots(this.authStore.user.id);
    }
    if (this.authStore.userQueues.length <= 0) {
      this.authStore.getUserQueues();
    }

    // console.log(`${this.$config.baseURL}/uploads`);
  },
};
</script>

<style scoped>
.game-image {
  border: solid 1px rgb(var(--v-theme-light-blue));
  border-radius: 13px;
}
.img-text-overlay {
  background: rgba(var(--v-theme-dark-blue), 0.8) !important;
  color: rgb(var(--v-theme-white));
}
.game-image-list {
  height: 50px;
  max-width: calc(40px + 1vw);
}

.queue {
  font-size: calc(0.8rem + 0.3vw);
}

.queue-list {
  font-size: calc(0.7rem + 0.3vw);
}

.game-selection-btns {
  font-size: calc(0.9rem + 0.3vw);
  border: solid 1px rgb(var(--v-theme-light-blue)) !important;
  padding: 0px 13px;
  margin: 0px 4px;
  height: 36px !important;
}
.active-selection-btn {
  background: rgb(var(--v-theme-black)) !important;
  color: rgb(var(--v-theme-white)) !important;
  border: unset !important;
}
.view-icon {
  font-size: 2rem;
  color: rgb(var(--v-theme-light-black));
}

.description-btn {
  border: solid 1px rgba(var(--v-theme-light-blue));
}

.custom-dialog {
  background: rgba(var(--v-theme-light-blue), 0.7) !important;
}
.dialog-close-icon {
  border-radius: 15px;
  padding: 0;
  width: 26px !important;
  min-width: unset;
  height: 26px !important;
  margin-top: -30px;
}
.dialog-description {
  min-height: 200px;
}
</style>
