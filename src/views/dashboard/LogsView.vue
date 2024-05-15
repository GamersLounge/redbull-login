<template>
  <v-data-table-virtual
    :headers="headers"
    :items="logStore.logs"
    item-key="name"
    items-per-page="-1"
    hover
    :search="search"
    class="rounded"
    height="600"
    :loading="!logStore.isLogsLoaded"
  >
    <template v-slot:top>
      <v-toolbar rounded color="surface">
        <v-toolbar-title>Logs</v-toolbar-title>

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
      </v-toolbar>
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

    <!-- Created At -->
    <template v-slot:[`item.createdAt`]="{ value }">
      {{ formatDate(value) }}
    </template>

    <!-- Updated At -->
    <template v-slot:[`item.updatedAt`]="{ value }">
      {{ formatDate(value) }}
    </template>

    <template #bottom> </template>
  </v-data-table-virtual>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useLogStore } from "@stores/log.js";

export default {
  name: "LogsView",

  components: {},

  data: () => ({
    logErrors: [],

    headers: [
      { title: "ID", value: "id" },
      { title: "Actor", value: "actor" },
      { title: "User", value: "user" },

      { title: "Game", value: "game" },
      { title: "Previous Score", value: "previousScore" },
      { title: "Current Score", value: "currentScore" },
      { title: "Created At", value: "createdAt" },
      { title: "Updated At", value: "updatedAt" },
    ],
    search: "",
  }),

  computed: {
    ...mapStores(useLogStore),
  },

  methods: {
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
    this.logStore.fetchLogs();
  },
};
</script>
