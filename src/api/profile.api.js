import axios from "@plugins/axios.js";

export const ProfileAPI = {
  getProfile(profileId) {
    return axios.get(`/profile/${profileId}`);
  },

  updateProfile(profileId, formData) {
    return formData.put(`/profile/${profileId}`);
  },

  updateAvatar(data) {
    return axios.put(`/profile/${data.userId}`, data.data);
  },

  deleteProfile(profileId) {
    return axios.delete(`/profile/${profileId}`);
  },
};
