import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NetflixView from "../views/NetflixView.vue";
import AddFilm from "../views/AddFilm.vue";
import FilmComponent from "../components/FilmComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/home",
      name: "Netflix",
      component: NetflixView,
    },
    {
      path: "/home/:id",
      component: FilmComponent,
    },
    {
      path: "/categories",
      name: "Netflix Categories",
      component: NetflixView,
    },
    {
      path: "/create",
      name: "Netflix Create",
      component: AddFilm,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
