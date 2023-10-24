import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

const app = createApp(App);

app.use(VueAxios, axios);

app.use(VuePlyr, {
  plyr: {},
});

app.use(router);

app.use(store);

app.mount("#app");
