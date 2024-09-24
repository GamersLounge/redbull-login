import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
// import "@fontsource/poppins";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          background: "#FFFF",
          white: "#FFFF",
          black: "#0000",
          // primary: "#153B8B",
          // secondary: "#FEC43B",
          // action: "#E31A4C",

          "basic-text": "#231f20",
          "dark-blue": "#4D4648",
          "light-blue": "#635B5D",
          red: "#d3003e",
          grey: "#dde0ed",
          container: "#DFDFDF",

          error: "#bc0000",

          "game-admin-bg": "#13182c",
          "table-header-bg": "#080e19",
        },
      },
      dark: {
        colors: {
          background: "#FFFF",
          white: "#FFFF",
          // primary: "#153B8B",
          // secondary: "#FEC43B",
          // action: "#E31A4C",

          "basic-text": "#4A4C72",
          "dark-blue": "#081241",
          "light-blue": "#22389b",
          red: "#d3003e",
          grey: "#dde0ed",

          error: "#bc0000",

          "game-admin-bg": "#13182c",
          "table-header-bg": "#080e19",

          // "slate-50": "#f8fafc",
          // "slate-100": "#f1f5f9",
          // "slate-200": "#e2e8f0",
          // "slate-300": "#cbd5e1",
          // "slate-400": "#94a3b8",
          // "slate-500": "#64748b",
          // "slate-600": "#475569",
          // "slate-700": "#334155",
          // "slate-800": "#1e293b",
          // "slate-900": "#0f172a",

          // "dark-background": "#0f172a",
          // "on-dark-background": "#aeb4c1",

          // surface: "#0f172a",
          // "on-surface": "#94a3b8",

          // "on-background": "#cbd5e1",

          // "on-primary": "",

          // "secondary": "",
          // "on-secondary": "",

          // "success": "",
          // "on-success": "",

          // "warning": "",
          // "on-warning": "",

          // "error": "",
          // "on-error": "",

          // "info": "",
          // "on-info": "",
        },
      },
    },
    variations: {
      // colors: ["primary", "secondary"],
      // lighten: 3,
      // darken: 2,
    },
    defaults: {
      VBtn: {},
    },
  },
});

export { vuetify };
