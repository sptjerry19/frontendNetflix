<template>
  <div class="bg-zinc-900 min-h-full">
    <NavbarView />
    <div class="h-40"></div>
    <!-- <h1 class="text-9xl text-center text-white">GLOBAL TOP10</h1> -->
    <!-- <div class="h-20"></div> -->
    <Carousel class="" :itemsToShow="1.2" :wrapAround="true" :transition="500">
      <Slide v-for="top in topImdb" :key="top.id">
        <div class="w-full">
          <Image class="w-full" :src="top.image" />
        </div>
      </Slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </Carousel>

    <h1 class="pt-10 text-9xl text-center text-white font-mono">
      GLOBAL TOP10
    </h1>

    <div class="flex flex-col items-start justify-center">
      <div
        class="flex items-center justify-center w-full"
        v-for="film in topImdb"
        :key="film.id"
      >
        <div
          class="da relative flex min-h-screen flex-col overflow-hidden bg-transparent bg-gray-50 my-6 rounded-lg"
        >
          <div
            class="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg"
          >
            <div
              class="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70"
            >
              <img
                :src="'http://localhost:8000/storage/' + film.image"
                class="animate-fade-in block h-full w-full scale-100 transform object-cover opacity-100 transition duration-300 group-hover:scale-110"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="w-2/5 ml-10 flex flex-col items-start mt-10 text-white">
          <h1 class="text-2xl">{{ film.title }}</h1>
          <p class="opacity-50 text-sm">{{ film.over_view }}</p>
          <router-link :to="'home/' + film.id">
            <ButtonTrans1 class="my-6" :name="'Play Now!'" />
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
import FooterComponent from "../components/FooterComponent.vue";
import Image from "../components/Image.vue";
import ButtonTrans1 from "../components/buttons/ButtonTrans1.vue";
</script>

<script>
import { defineComponent } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import axios from "axios";

export default defineComponent({
  name: "Autoplay",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      topImdb: [],
    };
  },
  created() {
    const api = this.$store.state.UrlServe + "/imdb";
    axios
      .get(api)
      .then((response) => {
        console.log(response);
        this.topImdb = response.data.data;
        console.log(this.topImdb);
      })
      .catch((error) => console.log(error));
  },
});
</script>

<style scoped>
.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

/* .carousel__slide--clone {
  width: 800px;
  height: 600px;
} */

img,
video {
  max-height: 800px;
}
ol.carousel__track {
  transform: translateX(0px);
  transition: all 0ms ease 0s;
  width: 100%;
}
section.carousel {
  height: 80%;
  padding: 0;
}
button.carousel__prev {
  width: 100px;
  height: 100px;
  color: red;
}
button.carousel__next {
  width: 100px;
  height: 100px;
  color: red;
}
.carousel__prev:hover,
.carousel__next:hover {
  opacity: 0.8;
}
svg.carousel__icon {
  width: 100%;
  height: 100%;
}
</style>
