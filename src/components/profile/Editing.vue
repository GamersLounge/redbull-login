<template>
  <!-- Profile Section -->
  <v-card-title class="mt-4 text-basic-text text-center font-poppins-medium card-title">
    Edit Settings
  </v-card-title>

  <v-card class="pa-6 elevation-0 mx-auto" max-width="600">
    <div class="image-edit-container w-100">
      <v-img
        class="mb-3 edit-image"
        crossorigin="anonymous"
        alt="User Avatar"
        width="125"
        :src="getRemoteAsset(profile.avatar) || getLocalAvatar('avatar_0.svg')"
      >
        <v-badge :content="''" color="white" overlap offset-x="12" offset-y="12" class="edit-badge">
          <template #badge>
            <v-icon color="black" @click="editImageDialog"> mdi-pencil </v-icon>
          </template>
        </v-badge>
      </v-img>
    </div>

    <ErrorsInput v-if="editErrors && editErrors.length > 0" class="my-2" :errors="editErrors" />

    <v-row class="ma-0">
      <v-text-field
        v-model="profileForm.name"
        variant="outlined"
        density="comfortable"
        label="Name"
      />
    </v-row>

    <v-row class="ma-0">
      <v-text-field
        v-model="profileForm.phone"
        variant="outlined"
        density="comfortable"
        label="Mobile No."
      />
    </v-row>

    <v-card-actions class="justify-end pa-0">
      <Button :name="'Save'" :loading="!profileStore.isProfileLoaded" @click="updateProfile" />
    </v-card-actions>
  </v-card>

  <!-- Security Section -->
  <v-card-title class="mt-4 text-basic-text text-center font-poppins-medium card-title">
    Security
  </v-card-title>

  <v-card class="pa-6 elevation-0 mx-auto" max-width="600">
    <ErrorsInput
      v-if="passwordErrors && passwordErrors.length > 0"
      class="my-2"
      :errors="passwordErrors"
    />

    <v-form
      id="securityForm"
      ref="securityForm"
      v-model="securityFormValid"
      @submit.prevent="updatePassword"
    >
      <v-row class="ma-0">
        <v-text-field
          v-model="passwordForm.password"
          :rules="rules.password"
          variant="outlined"
          density="comfortable"
          label="New Password"
          type="password"
        />
      </v-row>

      <v-row class="ma-0">
        <v-text-field
          v-model="passwordForm.password_confirmation"
          :rules="rules.password_confirmation"
          variant="outlined"
          density="comfortable"
          label="Repeat Password"
          type="password"
        />
      </v-row>
    </v-form>

    <v-card-actions class="justify-end pa-0">
      <Button :name="'Save'" :loading="!profileStore.isProfileLoaded" @click="updatePassword" />
    </v-card-actions>
  </v-card>

  <!-- Account Section -->
  <!-- <v-card-title class="mt-6 text-medium-emphasis">Account</v-card-title> -->

  <!-- <v-card class="px-4 py-6">
    <v-card-subtitle class="text-wrap">
      When you delete your account, we permanently delete your personal data and
      all your previous scores.
    </v-card-subtitle>

    <v-card-actions>
      <v-btn variant="tonal" color="error">Delete Account</v-btn>
    </v-card-actions>
  </v-card> -->

  <AvatarDialog ref="avatarDialog" />
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useProfileStore } from "@stores";

// Helpers
import { Form } from "@helpers/form.js";
import { getLocalAvatar, getRemoteAsset } from "@helpers/file.js";

// Components
import AvatarDialog from "./AvatarDialog.vue";

export default {
  name: "ProfileView",

  components: {
    AvatarDialog,
  },

  data: () => ({
    profileForm: {},
    passwordForm: new Form({ password: "", password_confirmation: "" }),
    securityFormValid: false,
    rules: {
      password: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password have to be at least 6 characters long",
      ],
    },

    editErrors: [],

    passwordErrors: [],
  }),

  computed: {
    ...mapStores(useProfileStore),
    profile() {
      return this.profileStore.profile;
    },
  },

  methods: {
    editImageDialog() {
      this.$refs.avatarDialog.openDialog();
    },
    /**
     * Update user's profile.
     */
    updateProfile() {
      const userId = this.profile.id;
      this.profileStore
        .updateProfile(userId, this.profileForm)
        .then((res) => {})
        .catch((err) => {
          let error =
            err.data.validation?.body?.message ??
            err.data.validation.params.message ??
            err.data?.message;
          this.editErrors = [error];
        });
    },

    /**
     * Change user's password.
     */
    updatePassword() {
      const userId = this.profile.id;
      this.profileStore
        .updateProfile(userId, this.passwordForm)
        .then((res) => {})
        .catch((err) => {
          let error =
            err.data.validation?.body?.message ??
            err.data.validation.params.message ??
            err.data?.message;
          this.passwordErrors = [error];
        });
    },
  },

  setup() {
    return { getLocalAvatar, getRemoteAsset };
  },

  created() {
    const { username, name, phone } = this.profile;
    this.profileForm = new Form({ username, name, phone });
  },
};
</script>

<style scoped>
.card-title {
  font-size: calc(1.5rem + 0.3vw);
}

.image-edit-container {
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 125px;
}
.edit-image {
  max-width: 125px;
}
.edit-badge {
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
}
</style>
