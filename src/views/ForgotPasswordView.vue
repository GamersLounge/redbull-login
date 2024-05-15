<template>
  <Logo />

  <v-stepper
    :items="['Step 1', 'Step 2']"
    v-model="currentStep"
    hide-actions
    class="hide-stepper-header elevation-0"
  >
    <v-stepper-header></v-stepper-header>

    <template v-slot:item.1>
      <v-form @submit.prevent="recoverPassword">
        <v-card max-width="500" class="mx-auto px-4 py-2 elevation-0">
          <v-row class="justify-center ma-0 register-title text-basic-text">
            Reset Password
          </v-row>

          <v-card-text class="pa-0">
            <ErrorsInput :errors="recoverErrors" />

            <v-row class="ma-0 pa-1">
              <v-col cols="12 px-0">
                <p
                  class="cols-12 btn-label text-basic-text font-poppins-regular"
                >
                  Email
                </p>
              </v-col>

              <TextField
                v-model="v$.email.$model"
                placeholder="Username@email.com"
              />

              <v-col cols="12  pa-1">
                <ErrorsInput
                  :errors="v$.email.$errors"
                  :vuelidateErrors="true"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="py-0 px-1">
            <v-row class="ma-0">
              <Button
                :name="'Send'"
                :loading="!authStore.isUserLoaded"
                type="submit"
              />
            </v-row>
          </v-card-text>

          <v-card-text class="text-body-2">
            <v-row
              class="ma-0 login text-basic-text align-center justify-center"
            >
              Already Have An OTP?

              <v-btn
                class="text-decoration-none text-light-blue pa-2"
                @click="setHasOtp"
                variant="text"
              >
                Verify
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
    </template>

    <template v-slot:item.2>
      <ForgotPasswordVerify
        ref="verifyEmail"
        :email="email"
        :hasOtp="hasOtp"
        @goToPreviousStep="goToPreviousStep()"
      />
    </template>
  </v-stepper>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@stores/auth.js";

import Logo from "@components/Logo.vue";
import ForgotPasswordVerify from "@components/forgot-password/ForgotPasswordVerify.vue";

import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email as emailValidator } from "@vuelidate/validators";

export default {
  name: "RegisterView",
  components: {
    Logo,
    ForgotPasswordVerify,
  },
  setup() {
    const email = ref("");

    const v$ = useVuelidate(
      {
        email: { required, email: emailValidator },
      },
      { email }
    );

    return {
      email,
      v$,
    };
  },
  data: () => ({
    currentStep: 1,
    hasOtp: false,

    email: "",

    recoverErrors: [],
  }),
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async recoverPassword() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.authStore
        .recoverPassword({
          email: this.email,
        })
        .then((res) => {
          this.goToNextStep();
          this.hasOtp = false;
        })
        .catch((err) => {
          this.recoverErrors = [err.data.validation.body.message];
        });
    },

    setHasOtp() {
      this.currentStep = 2;
      this.hasOtp = true;
    },

    goToNextStep() {
      if (this.currentStep < 2) {
        this.currentStep++;
      }
    },
    goToPreviousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
  },
  created() {},
};
</script>

<style scoped>
.register-title {
  font-family: Poppins-Medium;
  font-size: calc(1.2rem + 0.5vw);
}

.login {
  font-size: calc(0.8rem + 0.3vw);
}
.login .login-link {
  font-size: calc(1rem + 0.3vw);
}

.btn-label {
  font-size: calc(0.7rem + 0.3vw);
}

:deep(.v-stepper-header) {
  display: none !important;
}
</style>
