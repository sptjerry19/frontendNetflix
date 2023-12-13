<template>
  <div class="flex flex-col w-full bg-zinc-900">
    <NavbarView />
    <div
      class="flex pt-24 justify-center bg-zinc-900 py-4 text-6xl text-slate-400"
    >
      Music player
    </div>
    <div class="flex flex-wrap">
      <div
        class="bg-zinc-900 p-4 flex justify-center items-center mb-4"
        v-for="song in songs"
        :key="song.id"
      >
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
    </div>
    <p class="text-white text-center mb-8 hover:text-red-500">
      <router-link to="/songs">show more ></router-link>
    </p>
  </div>
</template>

<script setup>
import NavbarView from "../NavbarView.vue";
import ButtonDefault from "../../components/buttons/ButtonDefault.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      songs: [],
      genres: [],
      page: 1,
    };
  },
  created() {
    axios
      .get(this.$store.state.UrlServe + "/genres/")
      .then((response) => {
        console.log(response);
        this.genres = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(this.$store.state.UrlServe + "/songs/top10")
      .then((response) => {
        console.log(response.data);
        this.songs = response.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    changeGenre(id) {
      axios
        .get(this.$store.state.UrlServe + "/genres/" + id)
        .then((response) => {
          console.log(response.data.data);
          this.songs = response.data.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
