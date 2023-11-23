import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NetflixView from "../views/NetflixView.vue";
import AddFilm from "../views/admin/AddFilm.vue";
import UpdateFilm from "../views/admin/UpdateFilm.vue";
import FilmComponent from "../components/FilmComponent.vue";
import CategoryView from "../views/CategoryView.vue";
import LogIn from "../views/users/LogIn.vue";
import RegisTer from "../views/users/RegisTer.vue";
import DashBoard from "../views/admin/contents/DashBoard.vue";
import FilmTable from "../views/admin/contents/FilmTable.vue";
import Categories from "../views/admin/contents/Categories.vue";
import ImdbView from "../views/ImdbView.vue";
import WeatherView from "../views/WeatherView.vue";
import GenreTable from "../views/admin/contents/GenreTable.vue";
import SongTable from "../views/admin/contents/SongTable.vue";
import SingerTable from "../views/admin/contents/SingerTable.vue";
import SongIndex from "../views/songs/SongIndex.vue";
import SongAll from "../views/songs/SongAll.vue";
import GenreShow from "../views/genres/GenreShow.vue";
import GenreAll from "../views/genres/GenreAll.vue";
import GenreIndex from "../views/genres/GenreIndex.vue";
import CreateSong from "../views/admin/CreateSong.vue";
import UpdateSong from "../views/admin/UpdateSong.vue";
import CreateSinger from "../views/admin/CreateSinger.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Guest
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
    {
      path: "/IMDB",
      name: "IMDB",
      component: ImdbView,
    },
    {
      path: "/weather",
      name: "weather",
      component: WeatherView,
    },

    //song
    {
      path: "/music",
      name: "music",
      component: GenreIndex,
    },
    {
      path: "/songs",
      name: "songs",
      component: SongAll,
    },
    {
      path: "/genres",
      name: "genres",
      component: GenreAll,
    },
    {
      path: "/genres/:id",
      name: "genre",
      component: GenreShow,
    },

    // Admin

    //films
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
      path: "/update/:id",
      name: "Netflix Update",
      component: UpdateFilm,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/settings",
      name: "Netflix settings",
      component: FilmTable,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/settings/categories",
      name: "Netflix setting Categories",
      component: Categories,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/settings/singers",
      name: "Netflix setting singers",
      component: SingerTable,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/settings/genres",
      name: "Netflix setting genres",
      component: GenreTable,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/settings/musics",
      name: "Netflix setting musics",
      component: SongTable,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },

    // songs
    {
      path: "/create/song",
      name: "Create Song",
      component: CreateSong,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/update/songs/:id",
      name: "Update Song",
      component: UpdateSong,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },
    {
      path: "/create/singer",
      name: "Create Singer",
      component: CreateSinger,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next({ name: "Netflix Login" });
        } else next();
      },
    },

    // {
    //   path: "/settings/films",
    //   name: "Netflix settingFilms",
    //   component: FilmTable,
    //   beforeEnter: (to, from, next) => {
    //     if (localStorage.getItem("token") === null) {
    //       next({ name: "Netflix Login" });
    //     } else next();
    //   },
    // },
  ],
});

export default router;
