<template>
  <div class="flex flex-col w-screen bg-zinc-900">
    <NavbarView />
    <div
      class="flex pt-24 justify-center bg-zinc-900 py-4 text-6xl text-slate-400"
    >
      Music player
    </div>
    <div class="flex flex-wrap content content-start justify-center">
      <div
        class="relative bg-zinc-900 p-4 flex justify-center items-center mb-8"
        v-for="song in songs"
        :key="song.id"
      >
        <SongComponent :song="song" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarView from "../NavbarView.vue";
import ButtonDefault from "../../components/buttons/ButtonDefault.vue";
import SongComponent from "../../components/SongComponent.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      songs: [],
      genres: [],
      current_page: 1,
      total_page: 1,
      isFavorite: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
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
      .get(this.$store.state.UrlServe + "/songs/all", {
        params: { a: this.$route.query.a },
      })
      .then((response) => {
        console.log(response);
        this.total_page = response.data.last_page;
        this.songs = response.data.data;
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
    nextPageSong(current_page) {
      axios
        .get(this.$store.state.UrlServe + "/songs/all", {
          params: { a: this.$route.query.a, page: current_page },
        })
        .then((response) => {
          console.log(response.data);
          this.songs = this.songs.concat(response.data.data);
        })
        .catch((error) => console.log(error));
    },
    handleScroll(event) {
      console.log(window.scrollY);
      console.log(this.total_page);
      if (window.scrollY >= 400) {
        this.current_page++;
        if (this.current_page > this.total_page) {
          window.removeEventListener("scroll", this.handleScroll);
        } else {
          this.nextPageSong(this.current_page);
        }
      }
    },
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
