<template>
  <NavbarView />
  <OverView />
  <!-- <BigVideoVue :video="trailer" /> -->
  <div
    class="bg-zinc-900 pl-4 pb-12"
    v-for="category in categories"
    :key="category.id"
  >
    <h1 class="text-white text-2xl pl-4 pb-4 ml-6">{{ category.name }}</h1>
    <GitartItemVue :category-id="category.id" />
  </div>
  <FooterComponent />
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
import NetflixItem from "../components/NetflixItem.vue";
import FooterComponent from "../components/FooterComponent.vue";
import OverView from "../components/OverView.vue";
import GitartItemVue from "../components/GitartItem.vue";
import BigVideoVue from "../components/BigVideo.vue";
</script>

<script>
import axios from "axios";
import NetflixItem from "../components/NetflixItem.vue";

export default {
  components: { NetflixItem },
  data() {
    return {
      films: [],
      categories: [],
      src: "image/LSmcC42kK81ISTYItLYlrqMCg23eJ23WPXy2r8If.jpg",
      // trailer: "",
    };
  },
  methods: {},
  created() {
    axios
      .get(this.$store.state.UrlServe + "/categories")
      .then((response) => {
        this.categories = response.data.data;
      })
      .catch((error) => console.log(error));

    // axios
    //   .get("http://127.0.0.1:8000/api/films/37")
    //   .then((response) => {
    //     this.trailer = response.data.data.video;
    //   })
    //   .catch((error) => console.log(error));
  },
  computed: {},
};
</script>
