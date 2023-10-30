<template>
  <img class="object-cover" :src="source" v-lazy="source" />
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    src: {
      type: String,
    },
  },

  setup(props) {
    const { size, src } = props;
    // const storage = this.$store.state.urlStorage;

    return {
      source: `https://jerrynetflixapp.000webhostapp.com/storage/${src}`,
    };
  },
};
</script>

<style>
img[lazy="loaded"] {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-name: fadeIn;
}
</style>
