<template>
  <Logo />

  <v-form @submit.prevent="login">
    <v-card max-width="500" class="mx-auto px-4 py-2 elevation-0" rounded="xl">
      <v-row class="justify-center ma-0 pb-2 login-title text-basic-text"> Sign In</v-row>
      <!-- {{ this.authStore.isAuthenticated }} -->

      <v-card-text class="pa-0">
        <ErrorsInput :errors="loginErrors" />

        <v-row class="ma-0 pa-1">
          <v-col cols="12 px-0">
            <p class="cols-12 btn-label text-basic-text font-poppins-regular">Email</p>
          </v-col>
          <!-- :error-messages="emailErrors" -->
          <TextField v-model="v$.email.$model" placeholder="Email" />
          <v-col cols="12 pa-1">
            <ErrorsInput :errors="v$.email.$errors" :vuelidateErrors="true" />
          </v-col>
        </v-row>

        <v-row class="ma-0 pa-1">
          <v-col cols="12 px-0">
            <p class="cols-12 btn-label text-basic-text font-poppins-regular">Password</p>
          </v-col>
          <TextField
            v-model="v$.password.$model"
            :type="passVisible ? 'text' : 'password'"
            :append-inner-icon="passVisible ? 'mdi-eye-off' : 'mdi-eye'"
            placeholder="Password"
            @click:append-inner="passVisible = !passVisible"
          />

          <v-col cols="12 pa-1">
            <ErrorsInput :errors="v$.password.$errors" :vuelidateErrors="true" />
          </v-col>
        </v-row>

        <v-row class="ma-0 px-1 py-2">
          <router-link
            to="/forgot-password"
            class="font-poppins-regular text-decoration-none text-basic-text forgot-password"
          >
            Forgot password?
          </router-link>
        </v-row>

        <!-- :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword" -->
      </v-card-text>

      <v-card-text class="py-0 px-1">
        <v-row class="ma-0">
          <Button :name="'SIGN IN'" :loading="!authStore.isUserLoaded" />
        </v-row>
      </v-card-text>

      <v-card-text class="text-body-2">
        <v-row class="ma-0 font-p register align-center justify-center">
          Don't have an account?
          <router-link
            class="text-decoration-none register-link text-light-blue pa-1"
            to="Register"
          >
            Sign Up
          </router-link>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
// import { computed } from "vue";
// Store
import { mapStores } from "pinia";
import { useAuthStore } from "@stores/auth.js";

import Logo from "@components/Logo.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "LoginView",
  setup() {
    const v$ = useVuelidate();

    // const emailErrors = computed(() => {
    //   const errors = [];
    //   if (!v$.value.email.$dirty) return errors; // Only show errors if the field was touched
    //   if (!v$.value.email.required.$response) errors.push("Email is required.");
    //   if (!v$.value.email.email.$response) errors.push("Invalid email format.");
    //   return errors;
    // });

    // const passwordErrors = computed(() => {
    //   const errors = [];
    //   if (!v$.value.password.$dirty) return errors; // Only show errors if the field was touched
    //   if (!v$.value.password.required.$response) errors.push("Password is required.");
    //   return errors;
    // });

    return {
      v$,
      // emailErrors, passwordErrors
    };
  },
  components: {
    Logo,
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },

  data: () => ({
    showPassword: false,
    // email: "a@gamersloungeme.com",
    // password: "GamersLounge",
    email: "",
    password: "",

    passVisible: false,

    loginErrors: [],
  }),

  computed: {
    ...mapStores(useAuthStore),
  },

  methods: {
    async login() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.authStore
        .login({
          email: this.email,
          password: this.password,
        })
        .then((res) => {})
        .catch((err) => {
          this.loginErrors = [err.data.message];
        });
    },
  },
};
</script>

<style scoped>
.login-title {
  font-family: Poppins-Medium;
  font-size: calc(1.2rem + 0.5vw);
}

.forgot-password {
  font-size: calc(0.7rem + 0.3vw);
}

.register {
  font-size: calc(0.8rem + 0.3vw);
}
.register .register-link {
  font-size: calc(1rem + 0.3vw);
}

.btn-label {
  font-size: calc(0.7rem + 0.3vw);
}
</style>
