import { defineStore } from "pinia";
import { GameAPI } from "@/api/index.js";

export const useGameStore = defineStore("game", {
  state: () => ({
    game: null,
    games: [],
    platforms: ["Arcade", "PC", "Mob", "PS", "Trivia", "Quest"],

    isGamesLoaded: true,
  }),

  actions: {
    async fetchGames() {
      this.isGamesLoaded = false;
      return new Promise((resolve, reject) => {
        GameAPI.getGames()
          .then((res) => {
            this.isGamesLoaded = true;
            this.games = res.data;
            resolve(res.data);
          })
          .catch((error) => {
            this.isGamesLoaded = true;
            reject(error);
          });
      });
    },

    async createGame(formData) {
      this.isGamesLoaded = false;
      return new Promise((resolve, reject) => {
        GameAPI.createGame(formData)
          .then((res) => {
            this.isGamesLoaded = true;
            this.games = [...this.games, ...[res.data]];
            resolve(res.data);
          })
          .catch((error) => {
            this.isGamesLoaded = true;
            reject(error);
          });
      });
    },

    async updateGame(formData) {
      this.isGamesLoaded = false;
      return new Promise((resolve, reject) => {
        GameAPI.updateGame(formData)
          .then((res) => {
            this.isGamesLoaded = true;

            let gameIndex = this.games.findIndex((o) => o.id === res.data.id);
            this.games.splice(gameIndex, 1, { ...res.data });
            resolve(res.data);
          })
          .catch((error) => {
            this.isGamesLoaded = true;
            reject(error);
          });
      });
    },

    async deleteGame(gameId) {
      this.isGamesLoaded = false;
      return new Promise((resolve, reject) => {
        GameAPI.deleteGame(gameId)
          .then((res) => {
            this.isGamesLoaded = true;

            let index = this.games.findIndex((object) => {
              return object.id === gameId;
            });
            this.games.splice(index, 1);
            resolve(res.data);
          })
          .catch((error) => {
            this.isGamesLoaded = true;
            reject(error);
          });
      });
    },
  },
});
