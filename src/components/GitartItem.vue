<template>
  <carousel v-bind="settings" :breakpoints="breakpoints">
    <slide v-for="slide in listfilm" :key="slide.id">
      <router-link :to="'/home/' + slide.id">
        <FilmItem :card="slide" />
      </router-link>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script setup>
// import NetflixItem from "./NetflixItem.vue";
import FilmItem from "./FilmItem.vue";
</script>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import axios from "axios";

export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    categoryId: Number,
  },
  data() {
    return {
      listfilm: [],
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 2,
          snapAlign: "start",
        },
        // 1024 and up
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        //1340 and up
        1340: {
          itemsToShow: 4,
          snapAlign: "start",
        },
        // 1600 and up
        1600: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/films", {
        params: {
          category: this.categoryId,
        },
      })
      .then((response) => {
        this.listfilm = response.data.data.data;
        console.log(this.listfilm);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
button.carousel__next.carousel__next--disabled {
  color: red;
}

section.carousel {
  height: 200px;
  padding: 10px 20px;
}
</style>
