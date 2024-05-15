<template>
  <!-- Add Dialog -->
  <AddUser ref="addUserDialog"></AddUser>
  <UpdateUser ref="updateUserDialog"></UpdateUser>

  <v-data-table-virtual
    :headers="headers"
    :items="userStore.users"
    item-key="name"
    items-per-page="-1"
    hover
    :search="search"
    class="rounded"
    height="600"
    :loading="!userStore.isUsersLoaded"
  >
    <template v-slot:top>
      <v-toolbar rounded color="surface">
        <v-toolbar-title>Users</v-toolbar-title>

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

        <v-btn variant="outlined" color="green" @click="addUser">Add New</v-btn>
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

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editUser(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteOpen(item.id)"> mdi-delete </v-icon>
    </template>

    <template #bottom> </template>
  </v-data-table-virtual>

  <DeleteDialog
    ref="deleteDialog"
    :isLoading="!userStore.isUsersLoaded"
    :getErrors="userErrors"
    @deleteConfirm="deleteConfirm"
  />
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useUserStore } from "@stores/user.js";

// Components
import AddUser from "@components/dashboard/user/AddUser.vue";
import UpdateUser from "@components/dashboard/user/UpdateUser.vue";
import DeleteDialog from "@components/DeleteDialog.vue";

export default {
  name: "UsersView",

  components: {
    AddUser,
    UpdateUser,
    DeleteDialog,
  },

  data: () => ({
    userId: null,
    userErrors: [],

    headers: [
      { title: "ID", value: "id" },
      { title: "UUID", value: "uuid" },
      { title: "User Name", value: "username" },
      { title: "Email", value: "email" },

      { title: "isBlocked", value: "isBlocked" },
      { title: "isVerified", value: "isVerified" },
      { title: "phone", value: "phone" },
      { title: "role", value: "role" },

      { title: "Actions", key: "actions" },
    ],
    search: "",
  }),

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    addUser() {
      this.$refs.addUserDialog.openDialog();
    },
    editUser(user) {
      this.$refs.updateUserDialog.openDialog(user);
    },

    deleteOpen(userId) {
      this.userId = userId;
      this.$refs.deleteDialog.openDialog();
    },
    deleteConfirm() {
      this.userStore
        .deleteUser(this.userId)
        .then((res) => {
          this.$refs.deleteDialog.closeDialog();
          this.userId = null;
        })
        .catch((err) => {
          this.userErrors = [
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
    this.userStore.fetchUsers();
  },
};
</script>
