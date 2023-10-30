<template>
  <section>
    <div class="w-full relative ml-auto mr-auto">
      <div class="max-h-screen h-full">
        <img
          class="w-full max-h-3/4 min-h-1/2 object-cover"
          :src="'http://localhost:8000/storage/' + film.image"
          alt=""
        />
      </div>
      <div
        class="flex absolute left-0 top-0 bottom-0 bg-gradient-to-t from-zinc-900 to-transparent bg-transparent w-full"
      >
        <div
          class="flex flex-col w-1/3 items-start justify-center ml-14 text-white"
        >
          <h1 class="lg:text-6xl md:text-3xl font-semibold py-4">
            {{ film.title }}
          </h1>
          <p class="opacity-60 py-4">2023 | {{ film.name }}</p>
          <p class="md:text-base md:block hidden">{{ film.over_view }}</p>
          <div class="mt-8">
            <button
              class="flex items-center text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="$emit('openFilm')"
            >
              <i
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </i>
              <h2 class="pl-2">Xem ngay</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VideoPlayer from "./videos/VideoPlayer.vue";
export default {
  components: {
    VideoPlayer,
  },
  props: {
    film: Object,
  },
  data() {
    return {};
  },
};
</script>
