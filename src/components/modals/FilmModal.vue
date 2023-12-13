<template>
  <div class="flex flex-col">
    <img :src="$store.state.urlStorage + film.image" alt="" />
    <div class="flex flex-col bg-zinc-950">
      <div class="flex">
        <i>play</i>
        <i>like</i>
      </div>
      <div class="flex">
        <p class="text-green-600">3% Match</p>
        <p>view: {{ film.views }}</p>
      </div>
      <div class="flex">
        <h3>{{ film.over_view }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      required: true,
    },
  },
};
</script>
