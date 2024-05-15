import { defineStore } from "pinia";
import { ScoreAPI } from "@/api/index.js";

export const useScoreStore = defineStore("score", {
  state: () => ({
    scores: [],
    isScoresLoaded: true,
  }),

  getters: {},

  actions: {
    async fetchScores() {
      this.isScoresLoaded = false;
      return new Promise((resolve, reject) => {
        ScoreAPI.getScores()
          .then((res) => {
            this.isScoresLoaded = true;
            this.scores = res.data;
            resolve(res);
          })
          .catch((error) => {
            this.isScoresLoaded = true;
            reject(error);
          });
      });
    },

    async getUserScore(data) {
      this.isScoresLoaded = false;
      return new Promise((resolve, reject) => {
        ScoreAPI.getUserScore(data)
          .then((res) => {
            this.isScoresLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isScoresLoaded = true;
            reject(error);
          });
      });
    },

    async setScore(data) {
      this.isScoresLoaded = false;
      return new Promise((resolve, reject) => {
        ScoreAPI.setScore(data)
          .then((res) => {
            this.isScoresLoaded = true;

            // let scoreIndex = this.scores.findIndex((o) => o.id === res.data.id);
            // this.scores.splice(scoreIndex, 1, { ...res.data });
            let scoreIndex = this.scores.findIndex((o) => o.id === res.data.id);
            this.scores[scoreIndex].score = res.data.score;
            resolve(res);
          })
          .catch((error) => {
            this.isScoresLoaded = true;
            reject(error);
          });
      });
    },

    async setTriviaScore(data) {
      this.isScoresLoaded = false;
      return new Promise((resolve, reject) => {
        ScoreAPI.setTriviaScore(data)
          .then((res) => {
            this.isScoresLoaded = true;
            resolve(res.data);
          })
          .catch((error) => {
            this.isScoresLoaded = true;
            reject(error);
          });
      });
    },
  },
});
