import { defineStore } from "pinia";
import { LogAPI } from "@api";

export const useLogStore = defineStore("log", {
  state: () => ({
    logs: [],
    isLogsLoaded: true,
  }),
  getters: {},

  actions: {
    async fetchLogs() {
      this.isLogsLoaded = false;
      return new Promise((resolve, reject) => {
        LogAPI.getLogs()
          .then((res) => {
            this.isLogsLoaded = true;
            this.logs = res.data;
            resolve(res.data);
          })
          .catch((error) => {
            this.isLogsLoaded = true;
            reject(error);
          });
      });
    },
  },
});
