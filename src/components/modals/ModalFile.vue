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
        <div class="font-semibold text-2xl pb-4">Create a {{ table }}</div>
      </div>
      <div>
        <form
          class="flex flex-col space-y-8"
          method="POST"
          @submit.prevent="createData"
        >
          <div class="flex flex-col gap-y-8 h-12 space-x-2 w-auto">
            <input
              type="text"
              name="category"
              v-model="name"
              required
              class="bg-transparent border-2 rounded-full py-4 px-6 text-[16px] leading-[22.4px] font-light placeholder:text-white text-white"
              :placeholder="table"
            />
          </div>
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
              class="relative flex max-h-[160px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-2 text-center"
            >
              <div>
                <span>image</span>
                <span
                  class="inline-flex rounded border border-[#e0e0e0] py-2 px-10 ml-2 text-base font-medium text-white"
                >
                  Browse
                </span>
              </div>
              <div v-if="image" class="rounded-md bg-[#F5F7FB] py-4 px-8">
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
            </label>
          </div>
          <button
            type="submit"
            class="max-w-[200px] h-auto rounded-full bg-white text-black py-3 px-6"
          >
            <span class="text-teal-900 font-semibold">Create</span>
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
    table: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      image: null,
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
      console.log(this.image.name);
    },
    createData() {
      const api = this.$store.state.UrlServe + "/" + this.table + "/";
      const fomrData = new FormData();
      fomrData.append("name", this.name);
      fomrData.append("image", this.image);
      axios
        .post(api, fomrData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
