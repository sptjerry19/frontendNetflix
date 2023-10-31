<template>
  <div class="w-full bg-zinc-900 relative">
    <img
      class="w-full max-h-3/4 min-h-1/2 object-cover"
      :src="$store.state.urlStorage + '/' + src"
      alt=""
    />
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-zinc-900 to-transparent bg-transparent"
    >
      <div class="px-6 pt-60 text-white w-1/2 hidden md:block">
        <h1 class="text-5xl py-4 font-black">Only available on Netflix</h1>
        <p class="py-2 text-xl">
          Netflix is ​​home to excellent original programming you can't find
          anywhere else. Movies, TV shows, specials and more, all tailored just
          for you.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Image from "./Image.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      src: "",
    };
  },
  created() {
    const api = this.$store.state.UrlServe + "/films";
    axios
      .get(api)
      .then((response) => {
        const index = Math.floor(
          Math.random() * response.data.data.data.length
        );
        this.src = response.data.data.data[index].image;
        console.log(this.src);
      })
      .catch((error) => console.log(error));
  },
};
</script>
