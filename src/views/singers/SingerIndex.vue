<template>
  <div class="flex flex-col pt-20 justify-center bg-zinc-00">
    <h1 class="text-white text-5xl text-center mb-8">Ca sĩ</h1>
    <div class="flex flex-wrap justify-center">
      <router-link
        v-for="singer in singers"
        :key="singer.id"
        :to="'/singers/' + singer.id"
      >
        <div
          class="overflow-hidden m-4 relative justify-end cursor-pointer capitalize flex flex-col rounded-md bg-red-500 w-52 h-64 z-50 object-cover text-white transform hover:-translate-y-2 transition ease-in-out duration-500"
        >
          <img :src="singer.image" alt="desktop" />
          <div class="absolute p-3 flex flex-col">
            <span>{{ singer.name }}</span>
          </div>
        </div>
      </router-link>
    </div>
    <p class="text-white text-center mb-8 hover:text-red-500">
      <router-link to="/genres">show more ></router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      singers: [],
    };
  },
  created() {
    axios
      .get(this.$store.state.UrlServe + "/singers")
      .then((response) => {
        console.log(response);
        this.singers = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>
