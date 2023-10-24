<template>
  <div
    class="flex items-center overflow-x-auto whitespace-nowrap scroll-smooth custom-scrollbar focus:scroll-auto bg-zinc-900"
  >
    <div class="mx-6 my-6" v-for="item in listFilm" :key="item.id">
      <netflix-item :card="item" />
    </div>
  </div>
  <div class="" v-for="category in categories" :key="category.id">
    {{ category.name }}
  </div>
</template>

<script setup>
import NetflixItem from "../components/NetflixItem.vue";
</script>

<script>
import axios from "axios";
export default {
  props: {
    listFilm: Array,
  },
  data() {
    return {
      categories: [],
      films_id: [],
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((response) => {
        this.categories = response.data.data;
      })
      .catch(() => console.error());
  },
};
</script>
