import { createPinia } from "pinia";
import { useToast } from "vue-toastification";

const pinia = createPinia();

// Inject toast into pinia store
pinia.use(({ store }) => {
    store.$TOAST = useToast();
});

export default pinia;
