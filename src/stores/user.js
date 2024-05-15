import { defineStore } from "pinia";
import { UserAPI } from "@/api/index.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    isUsersLoaded: true,
  }),

  getters: {},

  actions: {
    async fetchUsers() {
      this.isUsersLoaded = false;
      return new Promise((resolve, reject) => {
        UserAPI.getUsers()
          .then((res) => {
            this.isUsersLoaded = true;
            this.users = res.data;
            resolve(res);
          })
          .catch((error) => {
            this.isUsersLoaded = true;
            reject(error);
          });
      });
    },

    async createUser(form) {
      this.isUsersLoaded = false;
      return new Promise((resolve, reject) => {
        UserAPI.createUser(form)
          .then((res) => {
            this.isUsersLoaded = true;
            this.users = [...this.users, ...[res.data]];
            resolve(res);
          })
          .catch((error) => {
            this.isUsersLoaded = true;
            reject(error);
          });
      });
    },

    async updateUser(data) {
      this.isUsersLoaded = false;
      return new Promise((resolve, reject) => {
        UserAPI.updateUser(data)
          .then((res) => {
            this.isUsersLoaded = true;
            let userIndex = this.users.findIndex((o) => o.id === res.data.id);
            this.users.splice(userIndex, 1, { ...res.data });
            resolve(res);
          })
          .catch((error) => {
            this.isUsersLoaded = true;
            reject(error);
          });
      });
    },

    async deleteUser(userId) {
      this.isUsersLoaded = false;
      return new Promise((resolve, reject) => {
        UserAPI.deleteUser(userId)
          .then((res) => {
            this.isUsersLoaded = true;

            let index = this.users.findIndex((object) => {
              return object.id === userId;
            });
            this.users.splice(index, 1);
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
