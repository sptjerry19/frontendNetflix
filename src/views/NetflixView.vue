<template>
  <NavbarView />
  <OverView />
  <div
    class="bg-zinc-900 pl-4 pt-10"
    v-for="category in categories"
    :key="category.id"
  >
    <h1 class="text-white text-2xl p-4 ml-6">{{ category.name }}</h1>
    <GitartItemVue :category-id="category.id" />
  </div>
  <FooterComponent />
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
import NetflixItem from "../components/NetflixItem.vue";
import OverView from "../components/OverView.vue";
import GitartItemVue from "../components/GitartItem.vue";
import FooterComponent from "../components/FooterComponent.vue";
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
    };
  },
  methods: {},
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((response) => {
        this.categories = response.data.data;
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
};
</script>
