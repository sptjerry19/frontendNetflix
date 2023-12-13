<template>
  <div
    class="fixed top-20 right-10 flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
    role="alert"
    v-if="isSuccessModal"
  >
    <svg
      class="w-5 h-5 inline mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <div>
      <span class="font-medium">Success alert!</span> Song created successfully
    </div>
  </div>
  <div class="grid min-h-full place-items-center backgroundImage">
    <div class="relative w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-4/12">
      <button class="absolute top-10 right-10 text-3xl" @click="$router.back()">
        X
      </button>
      <p v-if="errors !== ''" class="text-red-600">{{ errors }}</p>
      <p v-if="isSuccsess" class="text-green-600">Create Success</p>
      <form @submit.prevent="handleSubmit" class="mt-6">
        <div class="flex justify-between gap-3">
          <span class="w-full">
            <label
              for="name"
              class="block text-xs font-semibold text-gray-600 uppercase"
              >name</label
            >
            <input
              id="firstname"
              type="text"
              name="name"
              placeholder="name"
              v-model="name"
              autocomplete="given-name"
              class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
          </span>
        </div>
        <label
          for="image"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >image</label
        >
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file_image"
          :required="true"
          @change="onFileChange"
        />
        <img :src="imagePreview" alt="" />
        <label
          for="audio"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >audio</label
        >
        <input
          type="file"
          id="audioFile"
          accept="audio/*"
          @change="handleAudioFileChange"
        />
        <audio id="audioPlayer" controls>
          <source src="" type="audio/mpeg" />
        </audio>
        <label
          for="password-confirm"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >singer</label
        >
        <select id="singer" v-model="singer_id" class="w-full h-9">
          <option v-for="singer in singers" :key="singer.id" :value="singer.id">
            {{ singer.name }}
          </option>
        </select>
        <label
          for="password-confirm"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >genres</label
        >
        <div class="flex flex-wrap">
          <div
            class="flex flex-row justify-start p-1 w-1/2"
            v-for="genre in genres"
            :key="genre.id"
          >
            <input
              type="checkbox"
              :id="'genre-' + genre.id"
              v-model="selectedGenres"
              :value="genre.id"
              class="appearance-none h-6 w-2 bg-gray-400 checked:bg-red-500 checked:shadow-[0_0_5px_red] transition-all duration-300 peer ml-1"
            />
            <label
              :for="'genre-' + genre.id"
              class="flex flex-col justify-center px-2 peer-checked:text-red-500 select-none text-black"
              >{{ genre.name }}</label
            >
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
        >
          create song
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      image: null,
      audio: null,
      singer_id: 1,
      singers: [],
      genres: [],
      selectedGenres: [],
      imagePreview: null,
      isSuccessModal: false,
      errors: "",
      isSuccsess: false,
    };
  },

  mounted() {
    const api = this.$store.state.UrlServe;
    axios.get(api + "/genres").then((response) => {
      this.genres = response.data.data;
      console.log(response);
    });
    axios.get(api + "/singers").then((response) => {
      this.singers = response.data.data;
    });
  },

  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
      console.log(this.image.name);
      this.imagePreview = URL.createObjectURL(this.image);
      console.log(this.imagePreview);
    },
    handleAudioFileChange(event) {
      this.audio = event.target.files[0];
      const audioURL = URL.createObjectURL(this.audio);
      document.getElementById("audioPlayer").src = audioURL;
    },
    handleSubmit() {
      const data = {
        name: this.name,
        image: this.image,
        audio: this.audio,
        singer_id: this.singer_id,
        genres: this.selectedGenres,
      };
      axios
        .post(this.$store.state.UrlServe + "/songs", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          console.log("Song created successfully");
          this.isSuccessModal = true;
          this.name = "";
          this.image = null;
          this.audio = null;
          this.singer_id = 1;
          this.selectedGenres = [];
          this.errors = "";
          this.isSuccsess = true;
          setTimeout((this.isSuccessModal = false), 3000);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          this.errors = error.response.data.message;
          this.isSuccsess = false;
        });
    },
  },
};
</script>
