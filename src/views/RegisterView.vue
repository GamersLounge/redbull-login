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
      <v-form @submit.prevent="register">
        <v-card max-width="500" class="mx-auto px-4 py-2 elevation-0">
          <v-row class="justify-center ma-0 register-title text-basic-text">
            Sign Up
          </v-row>

          <v-card-text class="pa-0">
            <ErrorsInput :errors="registerErrors" />

            <v-row class="ma-0 pa-1">
              <v-col cols="12 px-0">
                <p
                  class="cols-12 btn-label text-basic-text font-poppins-regular"
                >
                  User Name
                </p>
              </v-col>

              <TextField v-model="v$.username.$model" placeholder="User Name" />

              <v-col cols="12 pa-1">
                <ErrorsInput
                  :errors="v$.username.$errors"
                  :vuelidateErrors="true"
                />
              </v-col>
            </v-row>

            <v-row class="ma-0 pa-1">
              <v-col cols="12 px-0">
                <p
                  class="cols-12 btn-label text-basic-text font-poppins-regular"
                >
                  Full Name
                </p>
              </v-col>

              <TextField v-model="v$.fullname.$model" placeholder="Full Name" />

              <v-col cols="12 pa-1">
                <ErrorsInput
                  :errors="v$.fullname.$errors"
                  :vuelidateErrors="true"
                />
              </v-col>
            </v-row>

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

            <v-row class="ma-0 pa-1">
              <v-col cols="12 px-0">
                <p
                  class="cols-12 btn-label text-basic-text font-poppins-regular"
                >
                  Mobile No.
                </p>
              </v-col>

              <TextField
                v-model="v$.phone.$model"
                type="number"
                placeholder="01xxxxxxxx"
              />

              <v-col cols="12  pa-1">
                <ErrorsInput
                  :errors="v$.phone.$errors"
                  :vuelidateErrors="true"
                />
              </v-col>
            </v-row>

            <v-row class="ma-0 pa-1">
              <v-col cols="12 px-0">
                <p
                  class="cols-12 btn-label text-basic-text font-poppins-regular"
                >
                  Password
                </p>
              </v-col>

              <TextField
                v-model="v$.password.$model"
                type="password"
                placeholder="PASSWORD"
              />

              <v-col cols="12  pa-1">
                <ErrorsInput
                  :errors="v$.password.$errors"
                  :vuelidateErrors="true"
                />
              </v-col>
            </v-row>

            <v-row class="ma-0 pa-1">
              <v-col cols="12 px-0">
                <p
                  class="cols-12 btn-label text-basic-text font-poppins-regular"
                >
                  Confirm Password
                </p>
              </v-col>

              <TextField
                v-model="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                @blur="v$.password_confirmation.$touch()"
              />

              <v-col cols="12  pa-1">
                <ErrorsInput
                  :errors="v$.password_confirmation.$errors"
                  :vuelidateErrors="true"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="py-0 px-1">
            <v-row class="ma-0">
              <Button :name="'Sign Up'" :loading="!authStore.isUserLoaded" />
            </v-row>
          </v-card-text>

          <v-card-text class="text-body-2">
            <v-row
              class="ma-0 login text-basic-text align-center justify-center"
            >
              Already Have An Account?

              <router-link
                class="text-decoration-none login-link text-light-blue pa-1"
                to="Login"
              >
                Sign In
              </router-link>
            </v-row>

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
      <VerifyEmail
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
import VerifyEmail from "@components/register/VerifyEmail.vue";

import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email as emailValidator,
  sameAs,
} from "@vuelidate/validators";

export default {
  name: "RegisterView",
  components: {
    Logo,
    VerifyEmail,
  },
  setup() {
    const username = ref("");
    const fullname = ref("");
    const password = ref("");
    const password_confirmation = ref("");
    const email = ref("");
    const phone = ref("");

    const v$ = useVuelidate(
      {
        username: { required },
        fullname: { required },
        password: { required },
        password_confirmation: { required, sameAs: sameAs(password) },
        email: { required, email: emailValidator },
        phone: { required },
      },
      { username, fullname, password, password_confirmation, email, phone }
    );

    return {
      username,
      fullname,
      password,
      password_confirmation,
      email,
      phone,
      v$,
    };
  },
  data: () => ({
    currentStep: 1,
    hasOtp: false,

    username: "",
    fullname: "",
    password: "",
    password_confirmation: "",
    email: "",
    phone: "",

    registerErrors: [],
  }),
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async register() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.authStore
        .register({
          username: this.username,
          name: this.fullname,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          phone: this.phone,
        })
        .then((res) => {
          this.goToNextStep();
          this.hasOtp = false;
        })
        .catch((err) => {
          let error = err.data.validation?.body?.message ?? err.data?.message;
          this.registerErrors = [error];
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
  created() {
    // console.log(this.$API)
  },
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
