<template>
  <div class="bg-zinc-900 min-h-full">
    <NavbarView />
    <h1 class="pt-40 ml-10 text-white text-3xl">Films</h1>
    <div class="flex flex-wrap">
      <div
        class="flex flex-col justify-center items-center"
        v-for="film in favorite_films"
        :key="film.id"
      >
        <div class="flex flex-col justify-center">
          <div class="relative flex flex-wrap justify-center">
            <div
              class="relative max-w-sm min-w-[340px] shadow-md rounded-3xl p-2 mx-3 my-5 bg-white transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300"
            >
              <div class="overflow-x-hidden rounded-2xl relative">
                <img
                  class="h-52 rounded-2xl w-full object-cover"
                  :src="$store.state.urlStorage + film.image"
                />
                <button
                  @click.prevent="removeFilmFavorite(film.id)"
                  class="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
              </div>
              <router-link :to="'/home/' + film.id">
                <div class="mt-4 pl-2 mb-2 flex justify-between">
                  <div>
                    <p
                      class="text-lg w-80 font-semibold text-gray-900 mb-0 truncate text-ellipsis"
                    >
                      {{ film.title }}
                    </p>
                    <p class="text-md text-gray-800 mt-0">
                      view: {{ film.views }}
                    </p>
                  </div>
                  <div
                    class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 group-hover:opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="gray"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 class="pt-20 ml-10 text-white text-3xl">Songs</h1>
    <div class="flex flex-wrap">
      <div
        class="flex flex-col justify-center items-center"
        v-for="song in favorite_songs"
        :key="song.id"
      >
        <router-link :to="'/songs/' + song.id">
          <div class="flex flex-col justify-center">
            <div class="relative flex flex-wrap justify-center">
              <div
                class="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-3 my-5 transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300"
              >
                <div class="overflow-x-hidden rounded-2xl relative">
                  <img
                    class="h-52 rounded-2xl w-full object-cover"
                    :src="$store.state.urlStorage + song.image"
                  />
                  <button
                    @click.prevent="removeSongFavorite(song.id)"
                    class="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </button>
                </div>
                <div class="mt-4 pl-2 mb-2 flex justify-between">
                  <div>
                    <p
                      class="text-lg w-80 font-semibold text-gray-900 mb-0 truncate text-ellipsis"
                    >
                      {{ song.name }}
                    </p>
                    <p class="text-md text-gray-800 mt-0">
                      Singer: {{ song.singer_name }}
                    </p>
                  </div>
                  <div
                    class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 group-hover:opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="gray"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarView from "../NavbarView.vue";
import FilmItem from "../../components/FilmItem.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      favorite_films: [],
      favorite_songs: [],
      delete_film_success: false,
      delete_song_success: false,
    };
  },
  created() {
    axios
      .get(this.$store.state.UrlServe + "/favorites/films", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        this.favorite_films = response.data.data;
      });

    axios
      .get(this.$store.state.UrlServe + "/favorites/songs", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.favorite_songs = response.data.data;
      });
  },
  methods: {
    removeFilmFavorite(id) {
      axios
        .delete(this.$store.state.UrlServe + "/favorites/films/" + id + "/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.delete_film_success = true;
          axios
            .get(this.$store.state.UrlServe + "/favorites/films", {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            })
            .then((response) => {
              this.favorite_films = response.data.data;
            });
        })
        .catch((error) => (this.delete_film_success = false));
    },
    removeSongFavorite(id) {
      axios
        .delete(this.$store.state.UrlServe + "/favorites/songs/" + id + "/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.delete_song_success = true;
          axios
            .get(this.$store.state.UrlServe + "/favorites/songs", {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            })
            .then((response) => {
              console.log(response);
              this.favorite_songs = response.data.data;
            });
        })
        .catch((error) => (this.delete_song_success = false));
    },
  },
};
</script>
