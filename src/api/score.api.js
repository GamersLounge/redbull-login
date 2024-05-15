import axios from "@plugins/axios.js";

export const ScoreAPI = {
  getScores() {
    return axios.get(`/score`);
  },

  setScore(data) {
    return axios.put(`/score/${data.userId}/game/${data.gameId}`, data.data);
  },

  setWinScore(data) {
    return axios.post(`/score/winner/${data.userId}/game/${data.gameId}`);
  },

  setLoseScore(data) {
    return axios.post(`/score/loser/${data.userId}/game/${data.gameId}`);
  },

  setTriviaScore(data) {
    return axios.post(`/score/trivia/${data.userId}/game/${data.gameId}`, data.data);
  },

  getUserScore(data) {
    return axios.get(`/score/${data.userId}/game/${data.gameId}`);
  },
};
