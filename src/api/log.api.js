import axios from "@plugins/axios.js";

export const LogAPI = {
  getLogs() {
    return axios.get(`/log`);
  },
};
