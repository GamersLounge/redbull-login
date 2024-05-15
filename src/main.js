// Vue
import { createApp } from "vue";

// Store
import store from "@stores/store.js";

// Router
import router from "@/router";

// Components
import App from "@/App.vue";

// Global Components
import registerGlobalComponents from "@plugins/globalComponents";

// Plugins
import { vuetify } from "@plugins/vuetify.js";
import { Toast, options } from "@plugins/toast.js";
import { useToast } from "vue-toastification";
// import axios from "@/plugins/axios";

// Styles
import "@assets/styles/main.css";

// Config
import { config } from "@config/index.js";

// Vue instance
const app = createApp(App);

// Globally available across all components
app.config.globalProperties.$config = config;
app.config.globalProperties.$TOAST = useToast();

// Use all modules
registerGlobalComponents(app);
app.use(store);
app.use(router);
app.use(vuetify);
app.use(Toast, options);

// Mount the app element
app.mount("#app");
