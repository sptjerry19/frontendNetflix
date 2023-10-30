<template>
  <div class="w-full h-96">
    <vue-plyr>
      <div class="plyr__video-embed player">
        <iframe
          :src="video + '?autoplay=1&mute=1'"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        ></iframe>
      </div>
    </vue-plyr>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    video: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
