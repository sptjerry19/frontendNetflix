<template>
  <div class="bg-zinc-900 h-full pb-20">
    <NavbarView />
    <SliderItem :film="films" />
  </div>
</template>

<script setup>
import NetFlix from "../components/logos/NetFlix.vue";
import NavbarView from "../views/NavbarView.vue";
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
