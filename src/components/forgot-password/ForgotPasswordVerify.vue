<template>
  <v-card
    class="py-8 px-2 text-center mx-auto elevation-0"
    max-width="500"
    width="100%"
  >
    <v-row class="ma-0 justify-space-between">
      <v-btn
        color="primary"
        size="small"
        text="Back"
        variant="tonal"
        @click="goToPreviousStep()"
      ></v-btn>
    </v-row>

    <ErrorsInput :errors="verificationErrors" />

    <h3 class="text-h6 mb-2">
      Please enter the one time password to verify your account
    </h3>

    <div v-if="!hasOtp">A code has been sent to {{ email }}</div>

    <TextField
      v-if="hasOtp"
      v-model="otpEmail"
      placeholder="Username@email.com"
    />

    <v-otp-input
      v-model="otp"
      :disabled="!authStore.isUserLoaded"
      type="text"
      color="light-blue"
    ></v-otp-input>

    <TextField v-model="password" type="password" placeholder="Password" />

    <TextField
      class="my-2"
      v-model="password_confirmation"
      type="password"
      placeholder="Password Confirm"
    />

    <Button
      :name="'Reset'"
      :loading="!authStore.isUserLoaded"
      @click="resetPassword"
      :isGradient="true"
      type="submit"
    />
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@stores/auth.js";

import InfoButtonLG from "@components/buttons/InfoButtonLG.vue";
export default {
  props: ["email", "hasOtp"],
  components: {
    InfoButtonLG,
  },
  data: () => ({
    otp: "",
    otpEmail: "",
    password: "",
    password_confirmation: "",

    verificationErrors: [],
  }),
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    resetPassword() {
      this.authStore
        .resetPassword({
          otp: this.otp,
          email: this.hasOtp ? this.otpEmail : this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((res) => {})
        .catch((err) => {
          this.verificationErrors = [err.data.validation.body.message];
        });
    },

    goToPreviousStep() {
      this.$emit("goToPreviousStep");
    },
  },
};
</script>

<style>
</style>