<template>
  <div class="flex flex-col w-full bg-zinc-900">
    <NavbarView />
    <SongIndex />
    <div class="flex flex-col pt-20 justify-center bg-zinc-950 py-4">
      <h1 class="text-white text-5xl text-center mb-4">Thể loại</h1>
      <div class="flex flex-wrap justify-center">
        <router-link
          v-for="genre in genres"
          :key="genre.id"
          :to="'/genres/' + genre.id"
          @click="changeGenre(genre.id)"
        >
          <div class="p-4 flex justify-center items-center">
            <div
              class="relative bg-zinc-950 p-4 rounded-lg shadow-md hover:scale-105 hover:bg-red-300 duration-300 cursor-pointer"
            >
              <!-- Album Cover -->
              <img
                src="https://www.shutterstock.com/image-vector/vector-set-realistic-isolated-neon-260nw-1192029745.jpg"
                alt="idk - Highvyn, Taylor Shin"
                class="w-40 h-40 mx-auto rounded-lg shadow-lg shadow-zinc-700 object-cover"
              />
              <h2
                class="absolute bottom-20 right-0 left-0 text-3xl font-semibold text-center text-white"
              >
                {{ genre.name }}
              </h2>
              <!-- genre Title -->
            </div>
          </div>
        </router-link>
      </div>
      <p class="text-white text-center mb-8 hover:text-red-500">
        <router-link to="/genres">show more ></router-link>
      </p>
    </div>
    <SingerIndex />
    <FooterComponent />
  </div>
</template>

<script setup>
import SongIndex from "../songs/SongIndex.vue";
import NavbarView from "../NavbarView.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import SingerIndex from "../singers/SingerIndex.vue";
import ButtonDefault from "../../components/buttons/ButtonDefault.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      songs: [],
      genres: [],
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
    // axios
    //   .get(this.$store.state.UrlServe + "/genres/" + this.$route.params.id)
    //   .then((response) => {
    //     console.log(response.data.data);
    //     this.songs = response.data.data;
    //   })
    //   .catch((error) => console.log(error));
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
