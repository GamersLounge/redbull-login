import { useAuthStore } from "@stores";

/**
 * Allow navigation based on authorized roles.
 *
 * @param {string} allowedRoles
 * @returns {(function(*, *): void)|*}
 */
export const isAuthorized = (...allowedRoles) => (to, from) => {

    const authStore = useAuthStore();
    const userRole = authStore.user?.roleId || "";

    if (!allowedRoles.includes(userRole)) return { name: "home", replace: true };
}
