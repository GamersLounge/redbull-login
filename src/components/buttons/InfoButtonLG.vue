<template>
  <div
    class="custom-info-btn text-center font-poppins-medium w-100"
    :class="{
      'text-white': !textColor,
      [textColor]: textColor,
      'gradient-bg': isGradient,
      [bgColor]: bgColor,
    }"
  >
    <!-- 'btn-grey-bg': !isGradient,
    textColor1: textColor1  -->
    {{ value }}
  </div>
</template>

<script>
export default {
  props: ["value", "textColor", "isGradient", "bgColor"],
};
</script>

<style scoped>
.custom-info-btn {
  font-size: calc(1rem + 0.3vw);
  border-radius: 14px;
  padding: 21px;
}
.gradient-bg {
  background: linear-gradient(
    to right,
    rgb(var(--v-theme-dark-blue)) 10%,
    rgb(var(--v-theme-light-blue)) 90%
  );
}
</style>
