<template>
  <v-btn
    class="mt-2 pa-5 custom-btn text-white"
    type="submit"
    variant="elevated"
    block
    v-bind="$attrs"
  >
    {{ name }}
  </v-btn>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style scoped>
.custom-btn {
  font-size: calc(0.8rem + 0.5vw);
  border-radius: 10px;
  padding: 30px !important;
  letter-spacing: normal;
  background: linear-gradient(
    to right,
    rgb(var(--v-theme-dark-blue)) 10%,
    rgb(var(--v-theme-light-blue)) 90%
  );
}
</style>
