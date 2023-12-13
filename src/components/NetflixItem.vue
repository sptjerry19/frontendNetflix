<template>
  <div>
    <div
      class="flex max-w-sm w-full bg-black shadow-md rounded-lg overflow-hidden mx-auto"
    >
      <!-- <div class="w-2 bg-gray-800"></div> -->

      <div
        class="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
        data-movie-id="438631"
      >
        <div
          class="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black to-transparent"
        ></div>
        <div
          class="relative w-56 h-72 group z-10 px-10 py-10 space-y-6 movie_info"
          data-lity=""
          href="https://www.youtube.com/embed/aSHs224Dge0"
        >
          <div class="absolute top-4 right-4">
            <button
              v-if="isFavorite == true"
              @click.prevent="removeFavoriteFilm(card.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-red-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <button v-else @click.prevent="addFavoriteFilm(card.id)">
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
          <div class="poster__info align-self-end w-full">
            <div class="h-32"></div>
            <router-link :to="'/home/' + card.id">
              <div class="space-y-6 detail_info">
                <div class="flex flex-col space-y-2 inner">
                  <a
                    class="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700"
                    data-unsp-sanitized="clean"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-10 h-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div
                      class="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2"
                    >
                      Trailer
                    </div>
                  </a>
                  <h3
                    class="text-xl font-bold text-white"
                    data-unsp-sanitized="clean"
                  >
                    {{ card.title }}
                  </h3>
                  <div class="mb-0 text-lg text-gray-400">
                    {{ card.name }}
                  </div>
                </div>
              </div>
            </router-link>
            <div
              data-countdown="2021-09-15"
              class="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white"
            ></div>
          </div>
        </div>
        <img
          class="absolute inset-0 transform w-full h-full object-cover -translate-y-4"
          :src="$store.state.urlStorage + card.image"
          style="filter: grayscale(0)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFavorite: false,
    };
  },
  methods: {
    addFavoriteFilm(id) {
      axios
        .put(this.$store.state.UrlServe + "/favorites/films/" + id + "/", "", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.isFavorite = true;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeFavoriteFilm(id) {
      axios
        .delete(this.$store.state.UrlServe + "/favorites/films/" + id, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.isFavorite = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
