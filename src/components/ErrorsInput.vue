<template>
  <div v-if="vuelidateErrors && errors && errors.length > 0" class="ma-0">
    <p class="text-error err-message" v-for="error of errors" :key="error.$uid">
      {{ error.$message }}
    </p>
  </div>

  <div v-else>
    <v-input
      v-for="(error, i) in errors"
      :key="i"
      :error-messages="error"
      error
      class="text-error mt-1 text-center errors-input"
    >
    </v-input>
  </div>
</template>

<script>
export default {
  props: ["errors", "vuelidateErrors"],
};
</script>

<style>
.err-message {
  font-size: calc(0.8rem + 0.2vw);
}
</style>
