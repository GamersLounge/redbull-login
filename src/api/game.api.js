import axios from "@plugins/axios.js";

export const GameAPI = {
  getGames() {
    return axios.get("/game");
  },

  getGame(gameId) {
    return axios.get(`/game/${gameId}`);
  },

  /**
   *
   * @param formData
   */
  createGame(formData) {
    return formData.post("/game");
  },

  updateGame(data) {
    return data.formData.put(`/game/${data.gameId}`);
  },

  deleteGame(gameId) {
    return axios.delete(`/game/${gameId}`);
  },

  getGameScores(gameId) {
    return axios.get(`/game/${gameId}/score`);
  },
};
