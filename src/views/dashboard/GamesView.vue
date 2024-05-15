<template>
  <!-- Add Dialog -->
  <AddGame ref="addGameDialog"></AddGame>
  <UpdateGame ref="updateGameDialog"></UpdateGame>

  <v-data-table
    :headers="headers"
    :items="gameStore.games"
    item-key="name"
    items-per-page="-1"
    hover
    :search="search"
    class="rounded"
  >
    <template v-slot:top>
      <v-toolbar rounded color="surface">
        <v-toolbar-title>Games</v-toolbar-title>

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

        <v-btn variant="outlined" color="green" @click="addGame">Add New</v-btn>
      </v-toolbar>
    </template>

    <!-- Logo -->
    <template v-slot:[`item.logo`]="{ value }">
      <v-img
        :src="`${$config.baseURL}/${value}`"
        class="my-2"
        crossorigin="anonymous"
        width="50px"
        aspect-ratio="1"
        cover
        rounded
      >
      </v-img>
    </template>

    <!-- Image -->
    <template v-slot:[`item.image`]="{ value }">
      <v-img
        :src="`${$config.baseURL}/${value}`"
        class="my-2"
        crossorigin="anonymous"
        aspect-ratio="1"
        width="50px"
        cover
        rounded
      >
      </v-img>
    </template>

    <!-- Is Queueable -->
    <template v-slot:[`item.isQueueable`]="{ value }">
      <v-chip
        class="text-uppercase text-caption"
        :color="value ? 'green' : 'red'"
        :text="`${value}`"
      >
      </v-chip>
    </template>

    <!-- Is Active -->
    <template v-slot:[`item.isActive`]="{ value }">
      <v-chip
        class="text-uppercase text-caption"
        :color="value ? 'green' : 'red'"
        :text="`${value}`"
      >
      </v-chip>
    </template>

    <!-- Is Double -->
    <template v-slot:[`item.isDoubled`]="{ value }">
      <v-chip
        class="text-uppercase text-caption"
        :color="value ? 'green' : 'red'"
        :text="`${value}`"
      >
      </v-chip>
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
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteOpen(item.id)"> mdi-delete </v-icon>
    </template>

    <template #bottom> </template>
  </v-data-table>

  <DeleteDialog
    ref="deleteDialog"
    :isLoading="!gameStore.isGamesLoaded"
    :getErrors="gameErrors"
    @deleteConfirm="deleteConfirm"
  />
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useGameStore } from "@stores/game.js";

// Components
import AddGame from "@components/dashboard/game/AddGame.vue";
import UpdateGame from "@components/dashboard/game/UpdateGame.vue";
import DeleteDialog from "@components/DeleteDialog.vue";

export default {
  name: "GamesView",

  components: {
    AddGame,
    UpdateGame,
    DeleteDialog,
  },

  data: () => ({
    gameId: null,
    gameErrors: [],

    headers: [
      { title: "ID", value: "id" },
      { title: "Name", value: "name" },
      { title: "Short Name", value: "shortName" },
      { title: "Platform", value: "platform" },
      { title: "Description", value: "description" },
      { title: "Win Points", value: "winPoints" },
      { title: "Lose Points", value: "losePoints" },
      { title: "Logo", value: "logo" },
      { title: "Image", value: "image" },
      { title: "Queueable", value: "isQueueable" },
      { title: "Active", value: "isActive" },
      { title: "Double", value: "isDoubled" },
      { title: "Created", value: "createdAt" },
      { title: "Updated", value: "updatedAt" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    search: "",
  }),

  computed: {
    ...mapStores(useGameStore),
    // ...mapState(useGameStore, ["games"])
  },

  methods: {
    // ...mapActions(useGameStore, ["deleteGame"]),

    addGame() {
      this.$refs.addGameDialog.openDialog();
    },
    editItem(game) {
      this.$refs.updateGameDialog.openDialog(game);
    },

    deleteOpen(gameId) {
      this.gameId = gameId;
      this.$refs.deleteDialog.openDialog();
    },
    deleteConfirm() {
      this.gameStore
        .deleteGame(this.gameId)
        .then((res) => {
          this.$refs.deleteDialog.closeDialog();
          this.gameId = null;
        })
        .catch((err) => {
          this.gameErrors = [
            err.data.validation.body?.message ??
              err.data.validation.params.message,
          ];
        });
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
    this.gameStore.fetchGames();
    // setTimeout(() => {
    //   // const rawObject = {...this.games};
    //   const rawObject = JSON.parse(JSON.stringify(this.gameStore.games));
    //   console.log(rawObject);
    // }, 500);
  },
};
</script>
