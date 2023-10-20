<template>
  <NavbarView />
  <OverView />
  <!-- overflow-x-auto whitespace-nowrap scroll-smooth custom-scrollbar focus:scroll-auto bg-zinc-900 -->
  <div class="flex pl-7 items-center flex-wrap bg-zinc-900">
    <div class="mx-6 my-6" v-for="item in films" :key="item.id">
      <router-link :to="'/home/' + item.id">
        <netflix-item :card="item" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
import NetflixItem from "../components/NetflixItem.vue";
import OverView from "../components/OverView.vue";
import CategoryItem from "../components/CategoryItem.vue";
</script>

<script>
import axios from "axios";
import NetflixItem from "../components/NetflixItem.vue";

export default {
  components: { NetflixItem },
  data() {
    return {
      films: [],
    };
  },
  methods: {},
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/films")
      .then((response) => {
        this.films = response.data.data.data;
      })
      .catch(() => console.log(console.error()));
  },
};
</script>

<style scoped>
/* Tạo thanh cuộn màu xanh lam */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #ff1010;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ff1010;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>
