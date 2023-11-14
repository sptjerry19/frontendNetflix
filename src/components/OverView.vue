<template>
  <div class="w-full bg-zinc-900 relative">
    <img
      class="w-full max-h-3/4 min-h-1/2 object-cover"
      :src="$store.state.urlStorage + '/' + films.image"
      alt=""
    />
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-zinc-900 to-transparent bg-transparent"
    >
      <div class="px-6 pt-60 text-white w-1/2 hidden md:block">
        <h1 class="text-5xl py-4 font-black">{{ films.title }}</h1>
        <p class="py-2 text-xl">
          {{ films.over_view }}
        </p>
        <router-link :to="'/home/' + films.id">
          <button
            class="mt-8 flex items-center text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            <i
              ><svg
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            </i>
            <h2 class="pl-2">Xem ngay</h2>
          </button>
        </router-link>
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
      films: [],
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
        this.films = response.data.data.data[index];
        console.log(this.src);
      })
      .catch((error) => console.log(error));
  },
};
</script>
