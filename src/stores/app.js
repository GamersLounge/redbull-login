import { defineStore } from "pinia";
import { useTheme } from "vuetify";

export const useAppStore = defineStore("app", {

    state: () => ({
        appName: "GEuphoria",
        darkMode: true,
        drawer: false,
        dashboardRail: true
    }),

    actions: {

        /**
         * Load default setting from setting file on app launch.
         */
        async loadDefaultSetting() {

            const vuetifyTheme = useTheme();

            // Set selected theme
            this.darkMode = JSON.parse(window.localStorage.getItem("darkMode"));
            vuetifyTheme.global.name.value = this.darkMode ? "dark" : "light";
        },

        /**
         * Change current Vuetify theme.
         *
         * @param {Vuetify} vuetify
         * @param {Boolean} state
         */
        setDarkMode(vuetify, state) {

            // Set selected theme
            vuetify.theme.global.name = state ? "dark" : "light";

            // Save state to setting file
            window.localStorage.setItem("darkMode", JSON.stringify(state));

            this.darkMode = state;
        }
    }
});
