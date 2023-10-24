<template>
  <div class="bg-zinc-900 min-h-full h-full pb-20">
    <NavbarView />
    <SliderItem
      :film="films"
      @openFilm="
        films.video != 'null' && films.video != null
          ? (isOpenFilm = true)
          : (isOpenFilm = false)
      "
    />
    <GitartItem :categoryId="films.category_id" />
    <video-component v-if="isOpenFilm" :video="films.video" />
  </div>
</template>

<script setup>
import NetFlix from "../components/logos/NetFlix.vue";
import NavbarView from "../views/NavbarView.vue";
import SliderItem from "./SliderItem.vue";
import GitartItem from "./GitartItem.vue";
import VideoComponent from "./VideoComponent.vue";
</script>

<script>
import axios from "axios";
import VideoComponent from "./VideoComponent.vue";
export default {
  components: { VideoComponent },
  data() {
    return {
      films: [],
      isOpenFilm: false,
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
