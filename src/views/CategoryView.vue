<template>
  <div class="h-screen bg-zinc-900">
    <NavbarView />
    <!-- <OverView /> -->
    <!-- list category -->
    <div class="flex pt-40 justify-center bg-zinc-900 py-4">
      <form method="get">
        <button @click.prevent="filerCategory(0)">
          <ButtonDefault
            class="bg-red-500 border-red-500 text-white hover:text-black"
            :name="'all'"
          />
        </button>
      </form>
      <form method="get" v-for="category in categories" :key="category.id">
        <input
          class="hidden"
          type=" hidden"
          name="category"
          :value="category.id"
        />
        <button @click.prevent="filerCategory(category.id)">
          <ButtonDefault
            class="bg-red-500 border-red-500 text-white hover:text-black"
            :name="category.name"
          />
        </button>
      </form>
    </div>
    <!-- overflow-x-auto whitespace-nowrap scroll-smooth custom-scrollbar focus:scroll-auto bg-zinc-900 -->
    <div class="flex justify-center items-center flex-wrap bg-zinc-900">
      <div class="mx-6 my-6" v-for="item in films" :key="item.id">
        <netflix-item :card="item" />
      </div>
    </div>
    <!-- no result -->
    <h1
      class="bg-zinc-900 text-white text-center text-6xl"
      v-if="films.length === 0"
    >
      {{ noResult }}
    </h1>
    <Paginate :pages="pages" @change-page="changePage" />
    <FooterComponent />
  </div>
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
import NetflixItem from "../components/NetflixItem.vue";
import ButtonDefault from "../components/buttons/ButtonDefault.vue";
import FooterComponent from "../components/FooterComponent.vue";
import Paginate from "../components/Paginate.vue";
import CategoryItem from "../components/CategoryItem.vue";
import GitartItemVue from "../components/GitartItem.vue";
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
      noResult: "ko co ket qua nao",
      api: this.$store.state.UrlServe,
      pages: 1,
    };
  },
  methods: {
    filerCategory(id) {
      let param = "?category=";
      if (id === 0) {
        param = "";
        id = "";
      }
      const api = this.$store.state.UrlServe + "/films" + param + id;
      console.log(api);
      axios
        .get(api)
        .then((response) => {
          this.films = response.data.data.data;
        })
        .catch(() => console.log(console.error()));
    },
    changePage(page) {
      const apiPage = this.$store.state.UrlServe + "/films?page=" + page;
      axios
        .get(apiPage)
        .then((response) => {
          this.films = response.data.data.data;
        })
        .catch(() => console.log(console.error()));
    },
  },
  mounted() {
    axios
      .get(this.$store.state.UrlServe + "/films", {
        params: { a: this.$route.query.a },
      })
      .then((response) => {
        this.pages = response.data.data.last_page;
        this.films = response.data.data.data;
      })
      .catch(() => console.log(console.error()));

    axios
      .get(this.$store.state.UrlServe + "/categories")
      .then((response) => {
        this.categories = response.data.data;
      })
      .catch((error) => console.log(error));
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

.slide {
  box-shadow: 0 6px 15px -3px rgb(0 0 0/0.3);
  padding: 25px;
  border-radius: 5px;
  background: rgb(202, 202, 202);
  color: #000;
}
</style>
