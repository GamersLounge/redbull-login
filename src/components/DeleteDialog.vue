<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600"
    scrim="transparent"
  >
    <v-toolbar dense flat class="">
      <v-toolbar-title class="text-body-2 font-weight-bold">
        Delete Confirmation
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="bg-grey">
      <div class="mb-2 text-center">
        <v-input
          v-for="(error, i) in getErrors"
          :key="i"
          :error-messages="error"
          error
        >
        </v-input>

        <slot name="errors"></slot>
      </div>

      Are You Sure ?.
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn text class="body-2 font-weight-bold" @click="closeDialog">
          Cancel
        </v-btn>
        <v-btn
          color="error"
          class="body-2 font-weight-bold"
          variant="outlined"
          @click="Delete"
          :loading="isLoading"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-dialog>
</template>

<script>
export default {
  props: ["isLoading", "getErrors"],
  data: () => ({
    dialog: false,
  }),

  methods: {
    Delete() {
      this.$emit("deleteConfirm");
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
