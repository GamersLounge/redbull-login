<template>
  <RouterView />
</template>

<script>
// Store
import { useAppStore } from "@stores";

export default {
  name: "App",

  setup() {
    const appStore = useAppStore();

    return { appStore };
  },

  created() {
    // Load default app configuration
    this.appStore.loadDefaultSetting();
  },
};
</script>
