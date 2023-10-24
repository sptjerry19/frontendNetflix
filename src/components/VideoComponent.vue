<template>
  <div class="absolute top-0 left-0 right-0">
    <iframe class="w-full h-screen" :src="video + '?autoplay=1'"> </iframe>
  </div>
</template>

<script>
export default {
  props: {
    video: String,
  },
};
</script>
