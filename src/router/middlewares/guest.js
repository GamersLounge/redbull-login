import { useAuthStore } from "@stores";

/**
 * Redirect to home page if the user is logged in and trying to access a guest only page.
 *
 * @param to
 * @param from
 */
export const isGuest = (to, from) => {

    const authStore = useAuthStore();

    if (authStore.isAuthenticated) return { name: "home", replace: true };
}
