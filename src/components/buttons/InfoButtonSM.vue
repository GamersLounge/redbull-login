<template>
  <!-- v-if="isBtn" -->
  <v-btn
    class="custom-info-btn font-poppins-regular text-center no-uppercase"
    variant="outlined"
    rounded="xl"
    :class="{
      'text-white': !textColor,
      [textColor]: textColor,
      'gradient-bg': isGradient,
    }"
  >
    {{ value }}
  </v-btn>
  <!-- <div
    v-else
    class="custom-info-btn text-center"
    :class="textColor ? textColor : 'text-white'"
  >
    {{ value }}
  </div> -->
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: "",
    },
    isGradient: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.custom-info-btn {
  font-size: calc(0.8rem + 0.2vw);
  padding: 0px 14px;
  border: none;
}

.gradient-bg {
  background: linear-gradient(
    to right,
    rgb(var(--v-theme-dark-blue)) 10%,
    rgb(var(--v-theme-light-blue)) 90%
  );
}
</style>
