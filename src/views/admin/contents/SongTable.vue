<template>
  <Home />
  <SearchBar :name="$route.name" />
  <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] w-40">
    <div class="px-6 pt-6 2xl:container">
      <router-link to="/create" class="ml-2"
        ><ButtonTrans1Vue :name="'Create Film'"
      /></router-link>
      <div class="flex justify-center">
        <form method="get">
          <button @click.prevent="filerCategory(0)">
            <ButtonDefault :name="'all'" />
          </button>
        </form>
        <form method="get" v-for="category in categories" :key="category.id">
          <input
            class="hidden"
            type=" hidden"
            name="category"
            :value="category.id"
          />
          <button @click.prevent="filerCategory(category.id, category.name)">
            <ButtonDefault :name="category.name" />
          </button>
        </form>
      </div>
      <table class="mt-2 border-collapse max-w-full">
        <thead>
          <tr>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              id
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              image
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              name
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              audio
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              singer
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              genres
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            v-for="film in films"
            :key="film.id"
          >
            <td
              class="w-5 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.id }}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <img
                class="h-44 w-full object-cover transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                :src="$store.state.urlStorage + film.image"
                style="filter: grayscale(0)"
              />
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span class="rounded py-1 px-3 text-xs font-bold break-all">{{
                film.video
              }}</span>
            </td>
            <td
              class="w-1/6 lg:w-auto font-bold p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.title }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.over_view }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.name || category }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <router-link
                :to="'/update/' + film.id"
                class="text-blue-400 hover:text-blue-600 underline"
                >Edit</router-link
              >
              <button
                class="text-red-400 hover:text-red-600 underline pl-6"
                @click="removeFilm(film.id)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Paginate :pages="page" @change-page="changePage" />
    </div>
  </div>
</template>

<script setup>
import Home from "../Home.vue";
import ButtonDefault from "../../../components/buttons/ButtonDefault.vue";
import Paginate from "../../../components/Paginate.vue";
</script>

<script>
import SearchBar from "./SearchBar.vue";
import axios from "axios";
import ButtonTrans1Vue from "../../../components/buttons/ButtonTrans1.vue";
export default {
  components: {
    ButtonTrans1Vue,
    SearchBar,
  },
  data() {
    return {
      films: [],
      categories: [],
      token: localStorage.getItem("token"),
      category: "",
      page: 1,
    };
  },
  created() {
    const api = this.$store.state.UrlServe + "/films";
    console.log(api);
    axios
      .get(api, {
        params: { a: this.$route.query.a },
      })
      .then((response) => {
        this.page = response.data.data.last_page;
        this.films = response.data.data.data;
        console.log(this.films);
      })
      .catch(() => console.log(console.error()));

    axios
      .get(this.$store.state.UrlServe + "/categories")
      .then((response) => {
        this.categories = response.data.data;
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    removeFilm(id) {
      const api = this.$store.state.UrlServe + "/films/" + id + "/";
      axios
        .delete(api, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => window.location.reload())
        .catch((error) => console.log(error));
      // fetch(api, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${this.token}`,
      //   },
      // }).then((response) => window.location.reload());
    },

    filerCategory(id, name) {
      let param = "?category=";
      if (id === 0) {
        param = "";
        id = "";
      }
      const api = this.$store.state.UrlServe + "/films" + param + id;
      console.log(api);
      axios
        .get(api)
        .then((response) => {
          console.log(response);
          this.films = response.data.data.data;
          this.page = response.data.data.last_page;
          this.category = name;
        })
        .catch(() => console.log(console.error()));
    },
    changePage(page) {
      const apiPage = this.$store.state.UrlServe + "/films?page=" + page;
      axios
        .get(apiPage)
        .then((response) => {
          this.films = response.data.data.data;
        })
        .catch(() => console.log(console.error()));
    },
  },
};
</script>
