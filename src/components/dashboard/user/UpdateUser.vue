<template>
  <v-dialog v-model="dialog" max-width="600" scrim="transparent">
    <v-card>
      <v-card-title>Update User</v-card-title>

      <v-card-text class="pt-0">
        <ErrorsInput :errors="userErrors" />

        <v-form @submit.prevent="updateUser">
          <v-row class="ma-0 pa-1">
            <v-col cols="12 px-0">
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">
                User Name
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
            <v-select
              label="Select"
              v-model="role"
              :items="roles"
              variant="outlined"
            ></v-select>

            <v-col cols="12  pa-1">
              <ErrorsInput :errors="v$.role.$errors" :vuelidateErrors="true" />
            </v-col>
          </v-row>

          <v-switch
            v-model="isBlocked"
            label="isBlocked"
            color="light-blue"
            hide-details
            inset
          ></v-switch>

          <v-switch
            v-model="isVerified"
            label="isVerified"
            color="light-blue"
            hide-details
            inset
          ></v-switch>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="success"
          flat
          @click="updateUser"
          :loading="!userStore.isUsersLoaded"
          variant="outlined"
        >
          Update
        </v-btn>
      </v-card-actions>

      <!-- <v-card-title>Update Password</v-card-title>
      <v-card-text class="pt-0">
        <v-form @submit.prevent="updateUser">
          <v-row class="ma-0 pa-1">
            <v-col cols="12 px-0">
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">Password</p>
            </v-col>

            <TextField v-model="v$.password.$model" type="password" placeholder="PASSWORD" />

            <v-col cols="12  pa-1">
              <ErrorsInput :errors="v$.password.$errors" :vuelidateErrors="true" />
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-1">
            <v-col cols="12 px-0">
              <p class="cols-12 btn-label text-basic-text font-poppins-regular">Confirm Password</p>
            </v-col>

            <TextField
              v-model="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              @blur="v$.password_confirmation.$touch()"
            />

            <v-col cols="12  pa-1">
              <ErrorsInput :errors="v$.password_confirmation.$errors" :vuelidateErrors="true" />
            </v-col>
          </v-row>

          <v-row class="ma-0">
            <v-spacer />
            <v-btn
              color="success"
              flat
              @click="updatePassword"
              :loading="!userStore.isUsersLoaded"
              variant="outlined"
            >
              Update
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text> -->
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
import { required, sameAs } from "@vuelidate/validators";

export default {
  name: "AddUser",
  setup() {
    const username = ref("");
    // const password = ref("");
    // const password_confirmation = ref("");
    const phone = ref("");
    const role = ref("");

    const v$ = useVuelidate(
      {
        username: { required },
        // password: { required },
        // password_confirmation: { required, sameAs: sameAs(password) },
        phone: { required },
        role: { required },
      },
      {
        username,
        // password,
        // password_confirmation,
        phone,
        role,
      }
    );

    return {
      username,
      // password,
      // password_confirmation,
      phone,
      role,
      v$,
    };
  },
  components: {
    FileInput,
  },

  data: () => ({
    dialog: false,

    roles: ["Administrator", "GameAdmin", "TriviaAdmin", "User"],

    username: null,
    // password: null,
    // password_confirmation: null,
    phone: null,
    role: null,
    isBlocked: false,
    isVerified: false,

    userErrors: [],
  }),

  computed: {
    ...mapStores(useUserStore),
    // ...mapStores(useAuthStore),
  },

  methods: {
    openDialog(user) {
      this.dialog = true;

      this.userId = user.id;
      this.username = user.username;
      this.phone = user.phone;
      this.role = user.role;
      this.isBlocked = user.isBlocked;
      this.isVerified = user.isVerified;

      // this.password = null;
      // this.password_confirmation = null;
    },

    // async updatePassword() {
    //   const isFormCorrect = await this.v$.$validate();
    //   if (!isFormCorrect) return;

    //   this.userStore
    //     .updateUser({
    //       userId: this.userId,
    //       data: {
    //         password: this.password,
    //         password_confirmation: this.password_confirmation,
    //       },
    //     })
    //     .then((res) => {
    //       this.dialog = false;
    //     })
    //     .catch((err) => {
    //       this.userErrors = [err.data.validation.body.message];
    //     });
    // },

    async updateUser() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.userStore
        .updateUser({
          userId: this.userId,
          form: {
            username: this.username,
            name: this.username,
            phone: this.phone,
            role: this.role,
            isBlocked: this.isBlocked,
            isVerified: this.isVerified,
          },
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
