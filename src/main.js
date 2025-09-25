import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apiClient from "./plugins/axios";
import { useAuth } from "./composables/useAuth";

const app = createApp(App);

// Global properties
app.config.globalProperties.$api = apiClient;

// Use plugins
app.use(router);
app.use(store);

// Initialize authentication state
const { initializeAuth } = useAuth();
initializeAuth();

app.mount("#app");
