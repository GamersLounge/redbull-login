import axios from "@plugins/axios.js";

export const AuthAPI = {
  login(form) {
    return axios.post("/auth/login", form);
  },

  authenticate() {
    return axios.get("/auth/me");
  },

  register(form) {
    return axios.post("/auth/register", form);
  },

  verifyEmail(data) {
    return axios.post("/auth/verification", data);
  },
  resendVerification(data) {
    return axios.post("/auth/send-verification", data);
  },

  logout() {
    return axios.delete("/auth/logout");
  },

  recoverPassword(data) {
    return axios.post("/auth/recover-password", data);
  },
  resetPassword(data) {
    return axios.post("/auth/reset-password", data);
  },
};
