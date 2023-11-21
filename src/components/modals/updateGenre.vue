<template>
  <div
    class="absolute left-0 right-0 ml-auto mr-auto flex items-center justify-center"
  >
    <div
      class="px-9 pt-10 pb-14 flex flex-col gap-y-8 bg-teal-900 text-white rounded-xl max-w-[510px] max-h-[468px]"
    >
      <div class="flex justify-end cursor-pointer" @click="$emit('closeModal')">
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/ios/50/ffffff/delete-sign--v1.png"
          alt="delete-sign--v1"
        />
      </div>
      <div>
        <div class="font-semibold text-2xl pb-4">Update {{ genreName }}</div>
      </div>
      <div>
        <form
          class="flex flex-col space-y-8"
          method="POST"
          @submit.prevent="updateGenre(id)"
        >
          <div class="flex flex-col gap-y-8 h-12 space-x-2 w-auto">
            <input
              type="text"
              name="category"
              v-model="name"
              required
              class="bg-transparent border-2 rounded-full py-4 px-6 text-[16px] leading-[22.4px] font-light placeholder:text-white text-white"
              placeholder="new genre"
            />
          </div>
          <button
            type="submit"
            class="max-w-[200px] h-auto rounded-full bg-white text-black py-3 px-6"
          >
            <span class="text-teal-900 font-semibold">Update</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    id: {
      type: Number,
    },
    genreName: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    updateGenre(id) {
      const api = this.$store.state.UrlServe + "/genres/" + id;
      const jsonData = {
        name: this.name,
      };
      axios
        .put(api, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.name = "";
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
