<template>
  <v-dialog v-model="dialog" persistent max-width="600" scrim="transparent">
    <v-card class="pa-2">
      <v-card-title class="text-h6">Confirm Action</v-card-title>
      <v-card-text> Are you sure you want to proceed? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Cancel</v-btn>
        <v-btn :class="btnColor ? btnColor : ''" @click="confirm" :loading="isLoading">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["isLoading", "getErrors"],
  data: () => ({
    dialog: false,
    btnColor: null,
  }),

  methods: {
    openDialog(btnColor) {
      this.dialog = true;
      this.btnColor = btnColor ?? null;
    },
    closeDialog() {
      this.dialog = false;
    },

    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style></style>
