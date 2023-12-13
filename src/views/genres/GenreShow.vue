<template>
  <div class="flex flex-col w-full h-screen bg-zinc-900">
    <NavbarView />
    <div class="mt-20">
      <div class="flex justify-center bg-zinc-900 pt-8">
        <router-link
          v-for="genre in genres"
          :key="genre.id"
          :to="'/genres/' + genre.id"
          @click="changeGenre(genre.id)"
        >
          <ButtonDefault
            class="bg-red-500 border-red-500 text-white hover:text-black"
            :name="genre.name"
          />
        </router-link>
      </div>
      <div
        class="flex flex-col p-5 w-11/12 h-3/5 overflow-y-scroll ml-auto mr-auto"
      >
        <div class="border-b pb-1 flex justify-between items-center mb-2">
          <span class="text-base font-semibold uppercase text-gray-700">
            play list</span
          >
          <img
            class="w-4 cursor-pointer"
            src="https://p.kindpng.com/picc/s/152-1529312_filter-ios-filter-icon-png-transparent-png.png"
          />
        </div>

        <div class="" v-for="song in songs" :key="song.id">
          <router-link :to="'/songs/' + song.id">
            <div
              class="flex border-b py-3 cursor-pointer hover:shadow-md px-2 hover:shadow-gray-400"
            >
              <img
                class="w-10 h-10 object-cover rounded-lg"
                alt="User avatar"
                :src="$store.state.urlStorage + song.image"
              />
              <div class="flex flex-col px-2 w-full">
                <span
                  class="text-sm text-red-500 capitalize font-semibold pt-1"
                >
                  {{ song.name }}
                </span>
                <span class="text-xs text-gray-500 uppercase font-medium">
                  -{{ song.singer_name }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
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
      .get(this.$store.state.UrlServe + "/genres/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data.data);
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
  },
};
</script>
