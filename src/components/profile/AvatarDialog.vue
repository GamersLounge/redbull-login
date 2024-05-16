<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="pa-6 elevation-0 mx-auto">
      <v-card-title class="mt-4 text-basic-text text-center font-poppins-medium card-title">
        Edit Avatar
      </v-card-title>

      <v-form id="securityForm" ref="securityForm" @submit.prevent="updateAvatar">
        <v-row class="ma-0">
          <ErrorsInput :errors="v$.selectedAvatar.$errors" :vuelidateErrors="true" />
        </v-row>

        <v-select
          v-model="v$.selectedAvatar.$model"
          :items="avatarOptions"
          item-title="label"
          return-object
          label="Choose an avatar"
          @update:modelValue="onAvatarSelect"
        >
          <template #item="{ item, props: { onClick } }">
            <v-list-item @click="onClick">
              <div class="d-flex justify-center align-center">
                <v-img style="max-width: 60px" crossorigin="anonymous" :src="item.raw.path"></v-img>
              </div>
            </v-list-item>
            <v-divider :thickness="1" class="border-opacity-100 my-3"></v-divider>
          </template>
        </v-select>
        <input type="file" ref="fileInput" style="display: none" @change="onFileChange" />
      </v-form>

      <v-card-actions class="justify-end pa-0">
        <Button :name="'Save'" :loading="!profileStore.isProfileLoaded" @click="updateAvatar" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useProfileStore } from "@stores";

// Helpers
import { Form } from "@helpers/form.js";

import avatar1 from "/avatars/avatar_0.svg";
import avatar2 from "/avatars/avatar_F_1.svg";
import avatar3 from "/avatars/avatar_F_2.svg";
import avatar4 from "/avatars/avatar_m_1.svg";
import avatar5 from "/avatars/avatar_m_2.svg";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "ProfileView",
  validations() {
    return {
      selectedAvatar: { required },
    };
  },
  components: {},

  data: () => ({
    dialog: false,
    profileForm: {},

    editErrors: [],

    selectedAvatar: "",
    avatarOptions: [
      { label: "Avatar 0", path: avatar1 },
      { label: "Avatar F 1", path: avatar2 },
      { label: "Avatar F 2", path: avatar3 },
      { label: "Avatar M 1", path: avatar4 },
      { label: "Avatar M 2", path: avatar5 },
    ],
    file: null,
  }),

  computed: {
    ...mapStores(useProfileStore),
    profile() {
      return this.profileStore.profile;
    },
  },

  methods: {
    onAvatarSelect(item) {
      // console.log("Selected Item Path:", item.path);
      let originalFileName = item.path.split("/").pop();
      fetch(item.path)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], originalFileName, { type: blob.type });
          this.profileForm.avatar = file;
          console.log("Avatar file prepared: ", this.profileForm.avatar);
        })
        .catch((e) => console.error("Error fetching and converting avatar:", e));
    },

    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },

    async updateAvatar() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      const userId = this.profile.id;
      this.profileStore
        .updateProfile(userId, this.profileForm)
        .then((res) => {
          this.closeDialog();
        })
        .catch((err) => {
          let error =
            err.data.validation?.body?.message ??
            err.data.validation.params.message ??
            err.data?.message;
          this.editErrors = [error];
        });
    },
  },

  setup() {
    const v$ = useVuelidate();
    return { v$, avatar1, avatar2, avatar3, avatar4, avatar5 };
  },

  created() {
    const { avatar } = this.profile;
    this.profileForm = new Form({ avatar });
  },
};
</script>

<style scoped>
.card-title {
  font-size: calc(1.5rem + 0.3vw);
}

input[type="file"] {
  display: none;
}
</style>
