<template>
  <div class="h-100">
    <v-container>
      <v-row class="ma-0 px-2 mb-2">
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
            <v-divider :thickness="1" class="border-opacity-100 my-3"></v-divider>
          </template>
        </v-select>
      </v-row>

      <!-- bg-transparent -->
      <v-data-table
        class="table-class pa-5 font-title text-h6"
        :headers="headers"
        :items="filteredQueues"
        :search="search"
        hide-default-footer
        :items-per-page="-1"
        :loading="!queueStore.isQueuesLoaded"
      >
        <template v-slot:top>
          <v-toolbar rounded color="surface">
            <v-toolbar-title>Queues</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                  :loading="!queueStore.isQueuesLoaded"
                  @click="queueStore.fetchQueues()"
                >
                  <v-icon color="grey-lighten-1"> mdi-refresh </v-icon>
                </v-btn>
              </template>
              <span>Refresh Queues</span>
            </v-tooltip>

            <v-text-field
              placeholder="Search"
              v-model="search"
              density="compact"
              variant="solo-filled"
              flat
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex justify-space-evenly font-title">
            <InfoButtonSM
              v-if="authStore.isGameAdmin"
              class="mx-1"
              :class="item.isPlaying == true ? 'bg-red' : 'true'"
              @click="queTriggerCall(item)"
              :value="'Call'"
              :isGradient="item.isPlaying == true ? false : true"
              :loading="!queueStore.isQueuesLoaded"
            />

            <InfoButtonSM
              v-if="authStore.isGameAdmin"
              class="mx-1"
              @click="queTriggerEnter(item)"
              :value="'Enter'"
              :isGradient="true"
              :loading="!queueStore.isQueuesLoaded"
            />

            <InfoButtonSM
              class="mx-1"
              @click="queTriggerPlaying(item)"
              :value="'Playing'"
              :isGradient="true"
              :loading="!queueStore.isQueuesLoaded"
            />

            <InfoButtonSM
              class="mx-1 bg-green"
              @click="actionDialogOpen(item, 'bg-green', setWinScore)"
              :value="'Win'"
              :loading="!queueStore.isQueuesLoaded"
            />

            <InfoButtonSM
              class="mx-1 bg-red"
              @click="actionDialogOpen(item, 'bg-red', setLoseScore)"
              :value="'Lose'"
              :loading="!queueStore.isQueuesLoaded"
            />

            <InfoButtonSM
              v-if="authStore.isGameAdmin"
              class="mx-1 bg-light-blue"
              @click="actionDialogOpen(item, 'bg-light-blue', setFinishedQueue)"
              :value="'Delete'"
              :loading="!queueStore.isQueuesLoaded"
            />
            <!-- <v-btn
              color="table-header-bg mx-2 "
              size="large"
              rounded="xl"
              :loading="!queueStore.isQueuesLoaded"
              @click="setWinScore(item)"
            >
              Win
            </v-btn> -->
          </div>
        </template>

        <template #bottom> </template>
      </v-data-table>
    </v-container>

    <ActionDialog
      ref="actionDialog"
      @confirm="buttonActionConfirm"
      :isLoading="!queueStore.isQueuesLoaded"
    />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useGameStore, useQueueStore, useUserStore, useAuthStore } from "@stores/index.js";

import InfoButtonSM from "@components/buttons/InfoButtonSM.vue";
import ActionDialog from "@components/ActionDialog.vue";
export default {
  name: "QueuesView",
  components: {
    InfoButtonSM,
    ActionDialog,
  },
  data: () => ({
    selectedGame: null,
    search: "",

    buttonAction: null,
  }),
  computed: {
    ...mapStores(useQueueStore),
    ...mapStores(useGameStore),
    ...mapStores(useUserStore),
    ...mapStores(useAuthStore),

    headers() {
      let headers = [
        {
          key: "id",
          title: "ID",
          align: "center",
          sortable: false,
        },
        { align: "center", key: "user.username", title: "User Name" },
        { align: "center", key: "game.name", title: "Game" },
        { align: "center", key: "number", title: "Ticket Number" },
      ];
      if (this.authStore.isGameAdmin) {
        headers = [...headers, ...[{ title: "Created", value: "createdAt" }]];
      }
      headers = [...headers, ...[{ align: "center", key: "actions", title: "Actions" }]];
      return headers;
    },

    mappedQueues() {
      const enrichedUserGames = this.queueStore.queues.map((queue) => {
        const game = this.gameStore.games.find((game) => game.id === queue.gameId);
        const user = this.userStore.users.find((user) => user.id === queue.userId);
        return { ...queue, user, game };
      });
      return enrichedUserGames;
    },

    filteredQueues() {
      if (!this.selectedGame) {
        return this.mappedQueues.filter((queue) => {
          return (
            queue.isFinished === false &&
            queue?.game?.platform !== "Trivia" &&
            queue?.game?.platform !== "Quest"
          );
        });
      }
      return this.mappedQueues.filter((queue) => {
        return queue.gameId === this.selectedGame.id && queue.isFinished === false;
      });
    },

    filteredGames() {
      return this.gameStore.games.filter((game) => {
        return game.platform != "Trivia" && game.platform != "Quest";
      });
    },
  },
  methods: {
    queTriggerCall(queue) {
      this.queueStore
        .queTriggerCall({
          queueId: queue.id,
        })
        .then((res) => {
          this.queueStore.fetchQueues();
        });
    },
    queTriggerEnter(queue) {
      this.queueStore
        .queTriggerEnter({
          queueId: queue.id,
        })
        .then((res) => {
          this.queueStore.fetchQueues();
        });
    },

    queTriggerPlaying(queue) {
      this.queueStore
        .updateQueue({
          data: { isPlaying: true },
          queueId: queue.id,
        })
        .then((res) => {
          this.queueStore.fetchQueues();
        });
    },

    async setWinScore(queue) {
      await this.queueStore
        .setWinScore({
          userId: queue.userId,
          gameId: queue.gameId,
        })
        .then((res) => {
          this.setFinishedQueue(queue);
        });
    },
    async setLoseScore(queue) {
      await this.queueStore
        .setLoseScore({
          userId: queue.userId,
          gameId: queue.gameId,
        })
        .then((res) => {
          this.setFinishedQueue(queue);
        });
    },

    async setFinishedQueue(queue) {
      await this.queueStore
        .updateQueue({
          data: { isFinished: true },
          queueId: queue.id,
        })
        .then((res) => {
          this.queueStore.fetchQueues();
        });
    },

    actionDialogOpen(queue, color, action) {
      this.selectedQueue = queue;
      this.buttonAction = action;
      this.$refs.actionDialog.openDialog(color);
    },
    async buttonActionConfirm() {
      await this.buttonAction(this.selectedQueue);
      this.$refs.actionDialog.closeDialog();
    },
  },
  created() {
    this.queueStore.fetchQueues();
    if (this.gameStore.games.length <= 0) {
      this.gameStore.fetchGames();
    }
    if (this.gameStore.games.length <= 0) {
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
