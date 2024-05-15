import { useAuthStore } from "@stores";

/**
 * Redirect to home page if not logged in and trying to access a restricted page.
 *
 * @param to
 * @param from
 */
export const isAuthenticated = (to, from) => {

    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) return { name: "login", replace: true };
}
