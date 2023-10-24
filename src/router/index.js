import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NetflixView from "../views/NetflixView.vue";
import AddFilm from "../views/AddFilm.vue";
import AddFilm2 from "../views/AddFilm2.vue";
import FilmComponent from "../components/FilmComponent.vue";
import CategoryView from "../views/CategoryView.vue";
import LogIn from "../views/users/LogIn.vue";

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
      name: "Netflix Film",
      component: FilmComponent,
    },
    {
      path: "/categories",
      name: "Netflix Categories",
      component: CategoryView,
    },
    {
      path: "/create",
      name: "Netflix Create",
      component: AddFilm,
    },
    {
      path: "/login",
      name: "Netflix Login",
      component: LogIn,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
