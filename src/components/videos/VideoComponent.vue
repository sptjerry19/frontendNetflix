<template>
  <div
    class="absolute top-10 left-40 right-40 shadow-xl shadow-black duration-500 transition-all"
  >
    <VideoPlayer :video="video" />
    <button
      class="w-full h-11 rounded-b-lg flex items-center justify-center text-white transition ease-in-out delay-150 bg-blue-500 hover:scale-105 hover:bg-indigo-500 duration-300"
      @click="$emit('closeVideo')"
    >
      close video
    </button>
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer.vue";

export default {
  components: {
    VideoPlayer,
  },
  props: {
    video: String,
  },
};
</script>
