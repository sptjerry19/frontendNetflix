<template>
  <div class="min-h-full backgroundImage">
    <!-- <NavbarView /> -->
    <div class="pt-28">
      <div class="flex items-center justify-center p-12">
        <!-- Author: FormBold Team -->
        <!-- Learn More: https://formbold.com -->
        <div
          class="mx-auto w-full max-w-[550px] bg-zinc-800 shadow-zinc-700 shadow-lg"
        >
          <form
            class="pb-6 pt-10 px-9 relative"
            method="POST"
            @submit.prevent="uploadImage"
          >
            <button
              class="absolute top-2 right-2 text-white hover:text-red-600"
              @click="$router.back()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <!-- name -->
            <div class="mb-5">
              <label
                for="name"
                class="mb-3 block text-base font-medium text-white"
              >
                Send files to this name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                :required="true"
                v-model="name"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <!-- image -->
            <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-white">
                Upload File
              </label>

              <!-- <span
                  class="text-red-500 text-xs italic"
                  v-if="error.image != ''"
                  >{{ error.image }}</span
                > -->

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
                <img :src="imagePreview" alt="" />
              </div>

              <!-- v-if="this.image" -->
              <!-- {{ this.image.name }} -->
              <div v-if="image" class="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                <div class="flex items-center justify-between">
                  <span class="truncate pr-3 text-base font-medium text-black">
                    {{ image.name }}
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
                type="submit"
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
import NavbarView from "../NavbarView.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      name: "",
      image: null,
      imagePreview: null,
    };
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
      this.imagePreview = URL.createObjectURL(this.image);
      console.log(this.image.name);
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);

      // Use Axios to make the HTTP POST request to the API
      axios
        .post(this.$store.state.UrlServe + "/singers", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.backgroundImage {
  background-image: url("../../assets/VN-vi-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg");
}
</style>
