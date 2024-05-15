import axios from "axios";
import { config } from "@/config/index.js";
import router from "@/router/index.js";
import { useAuthStore } from "@stores/auth.js";

const axiosInstance = axios.create({
  baseURL: config.apiURL,
});

/**
 * Request Interceptor.
 */
axiosInstance.interceptors.request.use(
  (request) => {
    const authStore = useAuthStore();

    // Send JWT tokens with every request if possible
    if (authStore.accessToken) request.headers["Authorization"] = "Bearer " + authStore.accessToken;
    if (authStore.refreshToken) request.headers["X-Refresh-Token"] = authStore.refreshToken;

    request.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    request.headers["Pragma"] = "no-cache";
    request.headers["Expires"] = "0";
    return request;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor.
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Check for new access token in response header
    const newAccessToken = response.headers.get("X-Access-Token");

    // Set new access token
    if (newAccessToken) {
      const authStore = useAuthStore();
      authStore.setAccessToken(newAccessToken);
    }

    return response.data;
  },
  (error) => {
    // Check for new access token in response header
    const newAccessToken = error.response.headers.get("X-Access-Token");

    // Set new access token
    if (newAccessToken) {
      const authStore = useAuthStore();
      authStore.setAccessToken(newAccessToken);
    }

    // console.log(error)
    // if (error.response) {
    //     console.log("GOT ERROR")
    //     router.push({name: "Login"})
    // }
    // if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //
    //     store.dispatch("auth/logout");
    //     router.push({name: "DDD"})
    // }
    //
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
