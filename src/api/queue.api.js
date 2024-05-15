import axios from "@plugins/axios.js";

export const QueueAPI = {
  getQueues() {
    return axios.get("/queue");
  },

  getQueue(queueId) {
    return axios.get(`/queue/${queueId}`);
  },

  createQueue(formData) {
    return axios.post("/queue", formData);
  },

  updateQueue(data) {
    return axios.put(`/queue/${data.queueId}`, data.data);
  },

  queTriggerEnter(data) {
    return axios.post(`/queue/trigger-enter`, data);
  },
  queTriggerCall(data) {
    return axios.post(`/queue/trigger-call`, data);
  },

  deleteQueue(queueId) {
    return axios.delete(`/queue/${queueId}`);
  },
};
