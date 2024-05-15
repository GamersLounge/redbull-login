<template>
  <v-text-field
    class="custom-text-btn"
    :model-value="modelValue"
    @update:model-value="handleInput"
    filled
    dense
    outlined
    hide-details="auto"
    @focus="$event.target.select()"
    v-bind="$attrs"
    variant="outlined"
    density="compact"
    bg-color="white"
    color="primary"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: ["modelValue"], // Accepting modelValue as a prop instead of value
  emits: ["update:modelValue"], // Explicitly defining emitted events
  methods: {
    handleInput(value) {
      this.$emit("update:modelValue", value); // Emitting value on input
    },
  },
};
</script>

<style>
.custom-text-btn input {
  font-family: "Poppins-Regular";
  font-size: calc(1rem + 0.3vw);
  border-radius: 20px;
  color: rgb(var(--v-theme-basic-text)) !important;
  padding: 12px 20px;
}
.custom-text-btn .v-field {
  border-radius: 14px;
}
</style>
