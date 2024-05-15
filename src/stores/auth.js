import { defineStore } from "pinia";
import { AuthAPI, UserAPI } from "@/api/index.js";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isUserLoaded: true,
    isAuthenticated: false,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: null,

    userSlots: [],
    userQueues: [],
  }),

  getters: {
    isAdministrator: (state) => state.user?.role === "Administrator",

    isGameAdmin: (state) => state.user?.role === "GameAdmin",

    isTriviaAdmin: (state) => state.user?.role === "TriviaAdmin",

    isScoreAdmin: (state) => state.user?.role === "ScoreAdmin",

    isUser: (state) => state.user?.role === "User",
  },

  actions: {
    async login(form) {
      this.isUserLoaded = false;
      return new Promise((resolve, reject) => {
        AuthAPI.login(form)
          .then((res) => {
            this.isUserLoaded = true;
            this.isAuthenticated = true;
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            const user = res.data.user;

            this.setAccessToken(accessToken);
            this.setRefreshToken(refreshToken);
            this.setUser(user);

            router.push({ name: "home" });
            resolve(res.data);
          })
          .catch((error) => {
            this.isUserLoaded = true;
            reject(error);
          });
      });
    },

    async authenticate() {
      if (!this.accessToken || !this.refreshToken) return;

      try {
        const { data } = await AuthAPI.authenticate();

        // Set initial user data
        this.setUser(data);
        this.isAuthenticated = true;
      } catch (error) {
        //
      }
    },

    async logout() {
      try {
        await AuthAPI.logout();
      } finally {
        this.isAuthenticated = false;
        this.user = null;

        // Remove token
        this.setAccessToken(null);
        this.setRefreshToken(null);

        router.push({ name: "login" });
      }
    },

    setAccessToken(token) {
      this.accessToken = token;
      localStorage.setItem("accessToken", token);
    },

    setRefreshToken(token) {
      this.refreshToken = token;
      localStorage.setItem("refreshToken", token);
    },

    setUser(user) {
      const { id, uuid, email, username, avatar, role } = user;
      this.user = { id, uuid, email, username, avatar, role };
    },

    async register(form) {
      this.isUserLoaded = false;
      return new Promise((resolve, reject) => {
        AuthAPI.register(form)
          .then((res) => {
            this.isUserLoaded = true;
            resolve(res);
          })
          .catch((error) => {
            this.isUserLoaded = true;
            reject(error);
          });
      });
    },

    verifyEmail(data) {
      this.isUserLoaded = false;
      return new Promise((resolve, reject) => {
        AuthAPI.verifyEmail(data)
          .then((res) => {
            this.isUserLoaded = true;
            this.isAuthenticated = true;
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            const user = res.data.user;

            this.setAccessToken(accessToken);
            this.setRefreshToken(refreshToken);
            this.setUser(user);

            this.$TOAST.success("Verified successfully");
            router.push({ name: "home" });
            resolve(res);
          })
          .catch((error) => {
            this.isUserLoaded = true;
            reject(error);
          });
      });
    },

    resendVerification(data) {
      this.isUserLoaded = false;
      return new Promise((resolve, reject) => {
        AuthAPI.resendVerification(data)
          .then((res) => {
            this.isUserLoaded = true;

            this.$TOAST.success("Email Sent successfully");
            resolve(res);
          })
          .catch((error) => {
            this.isUserLoaded = true;
            reject(error);
          });
      });
    },

    recoverPassword(data) {
      this.isUserLoaded = false;
      return new Promise((resolve, reject) => {
        AuthAPI.recoverPassword(data)
          .then((res) => {
            this.isUserLoaded = true;

            this.$TOAST.success("Email Sent Successfully");
            resolve(res);
          })
          .catch((error) => {
            this.isUserLoaded = true;
            reject(error);
          });
      });
    },

    resetPassword(data) {
      this.isUserLoaded = false;
      return new Promise((resolve, reject) => {
        AuthAPI.resetPassword(data)
          .then((res) => {
            this.isUserLoaded = true;

            this.$TOAST.success("Password updated successfully");
            router.push({ name: "login" });
            resolve(res);
          })
          .catch((error) => {
            this.isUserLoaded = true;
            reject(error);
          });
      });
    },

    async getUserSlots(userId) {
      this.isUsersLoaded = false;
      return new Promise((resolve, reject) => {
        UserAPI.getUserSlots(userId)
          .then((res) => {
            this.isUsersLoaded = true;
            this.userSlots = res.data;
            resolve(res.data);
          })
          .catch((error) => {
            this.isUsersLoaded = true;
            reject(error);
          });
      });
    },

    async getUserQueues() {
      this.isUsersLoaded = false;
      return new Promise((resolve, reject) => {
        UserAPI.getUserQueues()
          .then((res) => {
            this.isUsersLoaded = true;
            this.userQueues = res.data;
            resolve(res.data);
          })
          .catch((error) => {
            this.isUsersLoaded = true;
            reject(error);
          });
      });
    },
  },
});
