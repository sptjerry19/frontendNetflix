<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="title">Name</label>
      <input type="text" id="name" v-model="name" />

      <label for="image">Image</label>

      <label for="audioFile">Select an audio file</label>

      <select id="singer" v-model="singer_id">
        <option v-for="singer in singers" :key="singer.id" :value="singer.id">
          {{ singer.name }}
        </option>
      </select>

      <select id="genre" v-model="selectedGenres" multiple>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>

      <button type="submit">Create Song</button>
    </form>
  </div>
  <div class="grid min-h-screen place-items-center">
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
      <form class="mt-6">
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
      const formdata = new FormData();
      formdata.append("name", this.name);
      formdata.append("image", this.image);
      formdata.append("audio", this.audio);
      formdata.append("singer", this.singer);
      formdata.append("genre", this.selectedGenres);
      axios
        .post(this.$store.state.UrlServe + "/songs", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          console.log("Song created successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
