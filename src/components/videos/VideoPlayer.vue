<template>
  <div>
    <vue-plyr>
      <div class="plyr__video-embed player">
        <iframe
          :src="video + '?autoplay=1&mute=1'"
          allowfullscreen
          allowtransparency
          allow="autoplay"
          controls="false"
        ></iframe>
      </div>
    </vue-plyr>
  </div>
</template>

<script></script>
<script>
export default {
  props: {
    video: String,
  },
  data() {
    return {
      src: `${this.video}?autoplay=1&mute=1`,
    };
  },
};
</script>
