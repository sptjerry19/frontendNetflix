<template>
  <div>
    <div
      class="flex max-w-sm w-full bg-black shadow-md rounded-lg overflow-hidden mx-auto"
    >
      <!-- <div class="w-2 bg-gray-800"></div> -->

      <div
        class="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
        data-movie-id="438631"
      >
        <div
          class="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black to-transparent"
        ></div>
        <div
          class="relative w-56 h-72 cursor-pointer group z-10 px-10 py-10 space-y-6 movie_info"
          data-lity=""
          href="https://www.youtube.com/embed/aSHs224Dge0"
        >
          <div class="poster__info align-self-end w-full">
            <div class="h-32"></div>
            <div class="space-y-6 detail_info">
              <div class="flex flex-col space-y-2 inner">
                <a
                  class="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700"
                  data-unsp-sanitized="clean"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div
                    class="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2"
                  >
                    Trailer
                  </div>
                </a>
                <h3
                  class="text-xl font-bold text-white"
                  data-unsp-sanitized="clean"
                >
                  {{ card.title }}
                </h3>
                <div class="mb-0 text-lg text-gray-400">
                  {{ card.name }}
                </div>
              </div>
            </div>
            <div
              data-countdown="2021-09-15"
              class="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white"
            ></div>
          </div>
        </div>
        <img
          class="absolute inset-0 transform w-full h-full object-cover -translate-y-4"
          :src="$store.state.urlStorage + card.image"
          style="filter: grayscale(0)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>
