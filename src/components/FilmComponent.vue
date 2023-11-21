<template>
  <div class="bg-zinc-900 min-h-full h-full pb-20">
    <NavbarView />
    <SliderItem
      :film="films"
      @openFilm="
        films.video != 'null' && films.video != null
          ? handleOpenFilm()
          : (isOpenFilm = false)
      "
    />
    <GitartItem :categoryId="films.category_id" @click="changeFilm()" />
    <video-component
      v-if="isOpenFilm"
      :video="films.video"
      @closeVideo="isOpenFilm = false"
    />
  </div>
</template>

<script setup>
import NetFlix from "../components/logos/NetFlix.vue";
import NavbarView from "../views/NavbarView.vue";
import SliderItem from "./SliderItem.vue";
import GitartItem from "./GitartItem.vue";
import VideoComponent from "./videos/VideoComponent.vue";
</script>

<script>
import axios from "axios";
export default {
  components: { VideoComponent },
  data() {
    return {
      films: [],
      view: 0,
      isOpenFilm: false,
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    handleOpenFilm() {
      this.isOpenFilm = true;

      this.view += 2;
      const formData = new FormData();
      formData.append("views", this.view);
      formData.append("_method", "PUT");
      // Use Axios to make the HTTP POST request to the API
      axios
        .post(
          this.$store.state.UrlServe + "/films/" + this.$route.params.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // const modal = document.querySelector(".plyr__poster");
      // console.log(modal);
      // window.onclick = function (event) {
      //   console.log(event.target);
      //   if (event.target == modal) {
      //     console.log("close modal");
      //   }
      // };
    },
  },
  created() {
    axios
      .get(this.$store.state.UrlServe + "/films/" + this.$route.params.id)
      .then((response) => {
        this.films = response.data.data;
        this.view = this.films.views;
        console.log(this.view);
      })
      .catch(() => console.log(console.error()));
  },
  methods: {
    changeFilm() {
      axios
        .get(this.$store.state.UrlServe + "/films/" + this.$route.params.id)
        .then((response) => {
          this.films = response.data.data;
          this.view = this.films.views;
          console.log(this.view);
        })
        .catch(() => console.log(console.error()));
    },
  },
};
</script>
