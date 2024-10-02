import { defineStore } from "pinia";
import { AuthAPI, UserAPI } from "@/api/index.js";
import router from "@/router/index.js";
import Socket from "@/config/socket";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isUserLoaded: true,
    isAuthenticated: false,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: null,
    socket: null, // Add socket to the state to manage connection

    userSlots: [],
    userQueues: [],
  }),

  getters: {
    isAdministrator: (state) => state.user?.roleId === 1,
    isGameAdmin: (state) => state.user?.roleId === 2,
    isTriviaAdmin: (state) => state.user?.roleId === 3,
    isScoreAdmin: (state) => state.user?.roleId === 4,
    isUser: (state) => state.user?.roleId === 5,
  },

  actions: {
    async login(form) {
      this.isUserLoaded = false;
      return new Promise((resolve, reject) => {
        AuthAPI.login(form)
          .then(async (res) => {
            this.isUserLoaded = true;
            this.isAuthenticated = true;
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            const user = res.data.user;

            this.setAccessToken(accessToken);
            this.setRefreshToken(refreshToken);
            this.setUser(user);

            try {
              if (!this.socket) {
                this.socket = new Socket();
                this.socket.connect("https://staging.esportssummit-me.com", accessToken, refreshToken);

                this.socket.listenToScoreChange();
              }

              console.log(this.socket);

            } catch (socketError) {
              console.error("Socket connection error:", socketError);
            }

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

        if (!this.socket) {
          this.socket = new Socket();
          this.socket.connect("https://staging.esportssummit-me.com", this.accessToken, this.refreshToken);

          this.socket.listenToScoreChange();

          this.socket.listenToQueueCall();

          this.socket.listenToQueueEnter();
        }

        console.log(this.socket);

        // Set initial user data
        this.setUser(data);
        this.isAuthenticated = true;
      } catch (error) {
        console.error("Socket connection error:", error);
      }
    },

    async logout() {
      try {
        await AuthAPI.logout();
      } finally {
        this.isAuthenticated = false;
        this.user = null;

        // Disconnect from Socket.IO server
        if (this.socket) {
          this.socket.disconnect();
          this.socket = null;
        }

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
      const { id, uuid, email, username, avatar, roleId } = user;
      this.user = { id, uuid, email, username, avatar, roleId };
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
