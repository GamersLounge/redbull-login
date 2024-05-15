import axios from "@plugins/axios.js";

export const UserAPI = {
  createUser(form) {
    return axios.post("/user", form);
  },
  updateUser(data) {
    return axios.put(`/user/${data.userId}`, data.form);
  },
  deleteUser(userId) {
    return axios.delete(`/user/${userId}`);
  },

  getUsers() {
    return axios.get("/user");
  },

  getUserSlots(userId) {
    return axios.get(`/user/${userId}/slots`);
  },
  getUserQueues() {
    return axios.get(`/user/queues`);
  },
};
