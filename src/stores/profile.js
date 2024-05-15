import { defineStore } from "pinia";
import { useAuthStore } from "@stores";
import { ProfileAPI } from "@api";
import router from "@/router/index.js";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: null,
    isProfileLoaded: true,

    isEditing: false,
  }),

  getters: {
    totalScore() {
      return this.profile?.scores?.reduce((previous, current) => previous + current.score, 0);
    },
  },

  actions: {
    async getProfile() {
      const authStore = useAuthStore();
      const userId = authStore.user?.id;
      if (!userId) return;

      this.isProfileLoaded = false;
      return new Promise((resolve, reject) => {
        ProfileAPI.getProfile(userId)
          .then((res) => {
            this.isProfileLoaded = true;

            this.profile = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            this.isProfileLoaded = true;
            reject(err);
          });
      });
    },

    async updateProfile(profileId, formData) {
      this.isProfileLoaded = false;
      return new Promise((resolve, reject) => {
        ProfileAPI.updateProfile(profileId, formData)
          .then((res) => {
            this.isProfileLoaded = true;

            this.profile = { ...this.profile, ...res.data };
            this.$TOAST.success("Profile updated successfully");
            resolve(res.data);
          })
          .catch((err) => {
            this.isProfileLoaded = true;
            reject(err);
          });
      });
    },

    async deleteProfile(profileId) {},
  },
});
