<template>
  <v-dialog v-model="dialog" persistent max-width="600" scrim="transparent">
    <v-card>
      <v-card-title>Add User</v-card-title>

      <v-card-text class="pt-0">
        <ErrorsInput :errors="userErrors" />

        <v-form @submit.prevent="submit">
          <v-row class="ma-0 pa-1">
            <v-col cols="12 px-0">
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">
                Name
              </p>
            </v-col>

            <TextField v-model="v$.username.$model" placeholder="Full Name" />

            <v-col cols="12 pa-1">
              <ErrorsInput
                :errors="v$.username.$errors"
                :vuelidateErrors="true"
              />
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-1">
            <v-col cols="12 px-0">
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">
                Email
              </p>
            </v-col>

            <TextField
              v-model="v$.email.$model"
              placeholder="Username@email.com"
            />

            <v-col cols="12  pa-1">
              <ErrorsInput :errors="v$.email.$errors" :vuelidateErrors="true" />
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-1">
            <v-col cols="12 px-0">
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">
                Mobile No.
              </p>
            </v-col>

            <TextField
              v-model="v$.phone.$model"
              type="number"
              placeholder="01xxxxxxxx"
            />

            <v-col cols="12  pa-1">
              <ErrorsInput :errors="v$.phone.$errors" :vuelidateErrors="true" />
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-1">
            <v-col cols="12 px-0">
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">
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
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">
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

          <v-select
            label="Select"
            v-model="role"
            :items="roles"
            variant="outlined"
          ></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn @click="dialog = false" :loading="!userStore.isUsersLoaded">
          Cancel
        </v-btn>

        <v-btn
          color="success"
          flat
          @click="submit"
          :loading="!userStore.isUsersLoaded"
          variant="outlined"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useUserStore } from "@stores/user.js";

// Form
import FileInput from "@components/FileInput.vue";

import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email as emailValidator,
  sameAs,
} from "@vuelidate/validators";

export default {
  name: "AddUser",
  setup() {
    const username = ref("");
    const password = ref("");
    const password_confirmation = ref("");
    const email = ref("");
    const phone = ref("");

    const v$ = useVuelidate(
      {
        username: { required },
        password: { required },
        password_confirmation: { required, sameAs: sameAs(password) },
        email: { required, email: emailValidator },
        phone: { required },
      },
      { username, password, password_confirmation, email, phone }
    );

    return {
      username,
      password,
      password_confirmation,
      email,
      phone,
      v$,
    };
  },
  components: {
    FileInput,
  },

  data: () => ({
    dialog: false,

    roles: ["Administrator", "GameAdmin", "TriviaAdmin", "User"],

    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    phone: "",
    role: null,

    userErrors: [],
  }),

  computed: {
    ...mapStores(useUserStore),
    // ...mapStores(useAuthStore),
  },

  methods: {
    openDialog() {
      this.dialog = true;

      this.username = "";
      this.password = "";
      this.password_confirmation = "";
      this.email = "";
      this.phone = "";
      this.role = null;
    },

    async submit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.userStore
        .createUser({
          username: this.username,
          name: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          phone: this.phone,
          role: this.role,
          isVerified: true,
        })
        .then((res) => {
          this.dialog = false;
        })
        .catch((err) => {
          this.userErrors = [err.data.validation.body.message];
        });
    },
  },
};
</script>

<style scoped></style>
