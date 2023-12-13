<template>
  <div class="">
    <button
      class="absolute z-20 top-10 right-10 bg-white rounded-full translate-x-1 ease-linear"
      :class="{ 'bg-red-600 text-red-500': isFavorite === true }"
      @click.prevent="addSongFavorite(song.id)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
    <router-link :to="'/songs/' + song.id">
      <div
        class="bg-zinc-950 p-8 rounded-lg shadow-md w-80 hover:scale-105 hover:bg-red-300 duration-300 cursor-pointer"
      >
        <!-- Album Cover -->
        <img
          :src="$store.state.urlStorage + song.image"
          alt="idk - Highvyn, Taylor Shin"
          class="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-zinc-700 object-cover"
        />
        <!-- Song Title -->
        <h2 class="text-xl font-semibold text-center text-white">
          {{ song.name }}
        </h2>
        <!-- Artist Name -->
        <p class="text-gray-600 text-sm text-center">
          {{ song.singer_name }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    song: {
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
    addSongFavorite(id) {
      axios
        .put(this.$store.state.UrlServe + "/favorites/songs/" + id + "/", "", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.isFavorite = true;
          console.log(this.isFavorite);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
