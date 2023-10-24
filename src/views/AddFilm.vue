<template>
  <div class="bg-zinc-900 min-h-full">
    <NavbarView />
    <div class="pt-28">
      <div class="flex items-center justify-center p-12">
        <!-- Author: FormBold Team -->
        <!-- Learn More: https://formbold.com -->
        <div
          class="mx-auto w-full max-w-[550px] bg-zinc-800 shadow-zinc-700 shadow-lg"
        >
          <form class="py-6 px-9" method="POST" @submit.prevent="uploadImage">
            <!-- title -->
            <div class="mb-5">
              <label
                for="title"
                class="mb-3 block text-base font-medium text-white"
              >
                Send files to this title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                :required="true"
                v-model="title"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <span
                class="text-red-500 text-xs italic"
                v-if="error.title != ''"
                >{{ error.title }}</span
              >
            </div>
            <!-- over view -->
            <div class="mb-5">
              <label
                for="over_view"
                class="mb-3 block text-base font-medium text-white"
              >
                over view:
              </label>
              <input
                type="text"
                name="over_view"
                v-model="over_view"
                id="over_view"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <span
                class="text-red-500 text-xs italic"
                v-if="error.over_view != ''"
                >{{ error.over_view }}</span
              >
            </div>
            <!-- video -->
            <div class="mb-5">
              <label
                for="video"
                class="mb-3 block text-base font-medium text-white"
              >
                url video:
              </label>
              <input
                type="text"
                name="video"
                v-model="video"
                id="video"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <span
                class="text-red-500 text-xs italic"
                v-if="error.video != ''"
                >{{ error.video }}</span
              >
            </div>
            <!-- view -->

            <!-- category -->
            <div class="mb-5">
              <label
                for="category"
                class="mb-3 block text-base font-medium text-white"
              >
                choose a country:
              </label>
              <select
                id="category"
                name="category_id"
                v-model="category_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <!-- image -->
            <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-white">
                Upload File
              </label>

              <span
                class="text-red-500 text-xs italic"
                v-if="error.image != ''"
                >{{ error.image }}</span
              >

              <div class="mb-8">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="file"
                  class="sr-only"
                  :required="true"
                  @change="onFileChange"
                />
                <label
                  for="file"
                  class="relative flex max-h-[160px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span class="mb-2 block text-xl font-semibold text-white">
                      Drop image here
                    </span>
                    <span
                      class="mb-2 block text-base font-medium text-[#6B7280]"
                    >
                      Or
                    </span>
                    <span
                      class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-white"
                    >
                      Browse
                    </span>
                  </div>
                </label>
              </div>

              <div
                v-if="this.image"
                class="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8"
              >
                <div class="flex items-center justify-between">
                  <span class="truncate pr-3 text-base font-medium text-black">
                    {{ this.image.name }}
                  </span>
                  <button class="text-white">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      image: null,
      video: "",
      over_view: "",
      views: 100,
      category_id: 1,
      categories: [],
      error: {
        title: "",
        over_view: "",
        image: null,
        video: "",
      },
    };
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
      console.log(this.image.name);
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("image", this.image);
      formData.append("video", this.video);
      formData.append("over_view", this.over_view);
      formData.append("views", this.views);
      formData.append("category_id", this.category_id);

      console.log(formData.get("title"));

      // Use Axios to make the HTTP POST request to the API
      axios
        .post("http://127.0.0.1:8000/api/films", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          // Reset the form
          this.title = "";
          this.image = null;
          this.video = "";
          this.over_view = "";
          this.views = 100;
          this.category_id = 1;
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          const errors = error.response.data.errors;
          this.error.title = errors.title;
          this.error.over_view = errors.over_view;
          this.error.image = errors.image;
          this.error.video = errors.video;
        });
      // reset
      this.error.title = "";
      this.error.over_view = "";
      this.error.image = null;
      this.error.video = "";
    },
  },
  created() {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((response) => {
        this.categories = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
