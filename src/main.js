import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import VueLazyload from "vue-lazyload";
import vClickOutside from "click-outside-vue3";

const app = createApp(App);

app.use(VueAxios, axios);

app.use(router);

app.use(store);

app.use(VuePlyr, {
  plyr: {},
});

app.use(VueLazyload, {
  observer: true,
  preLoad: 1.3,
  // error,
  attempt: 1,
});

app.use(vClickOutside);

app.mount("#app");
