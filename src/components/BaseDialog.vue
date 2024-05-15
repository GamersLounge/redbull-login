<template>

  <v-dialog v-model="dialog" persistent scrim="transparent" max-width="460">

    <v-card elevation="4" :title="title" :text="body">

      <v-card-actions>

        <v-spacer />

        <v-btn color="primary" @click="dialog = false">
          {{ cancelText }}
        </v-btn>

        <v-btn color="primary" @click="$emit('confirm')">
          {{ confirmText }}
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>

export default {
  name: "BaseDialog",

  props: {
    modelValue: { type: Boolean },
    title: { type: String, required: true },
    body: { type: String, required: true },
    cancelText: { type: String, default: "No" },
    confirmText: { type: String, default: "Yes" },
  },

  emits: ["update:modelValue", "confirm"],

  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },

      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};

</script>
