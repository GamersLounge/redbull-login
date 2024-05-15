import { defineStore } from "pinia";
import { QueueAPI, ScoreAPI } from "@/api/index.js";

export const useQueueStore = defineStore("queue", {
  state: () => ({
    queue: null,
    queues: [],
    isQueuesLoaded: true,
  }),

  actions: {
    async fetchQueues() {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        QueueAPI.getQueues()
          .then((res) => {
            this.isQueuesLoaded = true;
            this.queues = res.data;
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;
            reject(error);
          });
      });
    },

    async createQueue(formData) {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        QueueAPI.createQueue(formData)
          .then((res) => {
            this.isQueuesLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;

            if (error.data && error.data.message) {
              this.$TOAST.error(error.data.message);
            }
            reject(error);
          });
      });
    },

    async updateQueue(data) {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        QueueAPI.updateQueue(data)
          .then((res) => {
            this.isQueuesLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;
            reject(error);
          });
      });
    },

    async deleteQueue(queueId) {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        QueueAPI.deleteQueue(queueId)
          .then((res) => {
            this.isQueuesLoaded = true;
            // this.fetchQueues()
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;
            reject(error);
          });
      });
    },

    async queTriggerEnter(data) {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        QueueAPI.queTriggerEnter(data)
          .then((res) => {
            this.isQueuesLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;
            reject(error);
          });
      });
    },

    async queTriggerCall(data) {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        QueueAPI.queTriggerCall(data)
          .then((res) => {
            this.isQueuesLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;
            reject(error);
          });
      });
    },

    async setWinScore(data) {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        ScoreAPI.setWinScore(data)
          .then((res) => {
            this.isQueuesLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;
            reject(error);
          });
      });
    },

    async setLoseScore(data) {
      this.isQueuesLoaded = false;
      return new Promise((resolve, reject) => {
        ScoreAPI.setLoseScore(data)
          .then((res) => {
            this.isQueuesLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isQueuesLoaded = true;
            reject(error);
          });
      });
    },
  },
});
