<template>
  <v-card
    class="py-12 px-8 text-center mx-auto ma-4"
    max-width="420"
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

      <v-btn
        color="primary"
        size="small"
        text="Re-send Email"
        variant="tonal"
        :loading="!authStore.isUserLoaded"
        @click="resendVerification()"
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

    <InfoButtonSM
      @click="verifyEmail"
      :loading="!authStore.isUserLoaded"
      height="40"
      width="135"
      :value="'Verify'"
      :isGradient="true"
    />
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@stores/auth.js";

import InfoButtonSM from "@components/buttons/InfoButtonSM.vue";
export default {
  props: ["email", "hasOtp"],
  components: {
    InfoButtonSM,
  },
  data: () => ({
    otp: "",
    otpEmail: "",

    verificationErrors: [],
  }),
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    resendVerification() {
      this.otp = "";

      this.authStore
        .resendVerification({
          email: this.hasOtp ? this.otpEmail : this.email,
        })
        .then((res) => {})
        .catch((err) => {
          this.verificationErrors = [err.data.validation.body.message];
        });
    },
    verifyEmail() {
      this.authStore
        .verifyEmail({
          email: this.hasOtp ? this.otpEmail : this.email,
          otp: this.otp,
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