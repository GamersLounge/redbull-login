import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({

    plugins: [
        vue()
    ],

    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
            "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
            "@helpers": fileURLToPath(new URL("./src/helpers", import.meta.url)),
            "@plugins": fileURLToPath(new URL("./src/plugins", import.meta.url)),
            "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
            "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
        }
    }
});
