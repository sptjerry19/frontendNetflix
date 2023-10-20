<template>
  <div class="bg-zinc-900 h-full pb-20">
    <header class="fixed top-0 w-full z-30 bg-transparent transition-all pt-4">
      <nav
        class="px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4"
      >
        <router-link to="/">
          <NetFlix />
        </router-link>
        <ul
          class="hidden lg:flex col-start-2 col-end-8 text-black-500 items-center"
        >
          <router-link
            to="/home"
            class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-white hover:text-red-700"
            :class="{ 'text-red-700': $route.name === 'Netflix' }"
            >Home</router-link
          >
          <router-link
            to="/categories"
            class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-white hover:text-red-700"
            :class="{ 'text-red-700': $route.name === 'Netflix Categories' }"
            >Categories</router-link
          >
          <router-link
            to="/about"
            class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-white hover:text-red-700"
            :class="{ 'text-red-700': $route.name === 'about' }"
            >About</router-link
          >
          <router-link
            to="/add"
            :class="{ 'text-red-700': $route.name === 'Netflix Add' }"
            class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-white hover:text-red-700"
            >Add Video</router-link
          >
        </ul>
        <div
          class="col-start-10 col-end-12 font-medium flex justify-end items-center"
        >
          <div class="relative text-lg bg-transparent text-red-800">
            <div class="flex items-center border-b border-red-500 py-2">
              <input
                class="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="search"
              />
              <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                <svg
                  class="h-4 w-4 fill-current text-red-800"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style="enable-background: new 0 0 56.966 56.966"
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <SliderItem :film="films" />
  </div>
</template>

<script setup>
import NetFlix from "../components/logos/NetFlix.vue";
import SliderItem from "./SliderItem.vue";
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
    axios
      .get("http://127.0.0.1:8000/api/films/" + this.$route.params.id)
      .then((response) => {
        this.films = response.data.data;
        console.log(response);
      })
      .catch(() => console.log(console.error()));
  },
};
</script>
