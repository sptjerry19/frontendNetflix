import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NetflixView from "../views/NetflixView.vue";
import AddFilm from "../views/admin/AddFilm.vue";
import FilmComponent from "../components/FilmComponent.vue";
import CategoryView from "../views/CategoryView.vue";
import LogIn from "../views/users/LogIn.vue";
import RegisTer from "../views/users/RegisTer.vue";
import Home from "../views/admin/Home.vue";

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
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/settings",
      name: "Netflix settings",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/login",
      name: "Netflix Login",
      component: LogIn,
    },
    {
      path: "/register",
      name: "Netflix Register",
      component: RegisTer,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
