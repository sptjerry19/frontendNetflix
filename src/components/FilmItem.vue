<template>
  <div class="w-80 h-52 mx-3">
    <img
      class="h-44 w-full object-cover transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
      :src="'http://localhost:8000/storage/' + card.image"
      style="filter: grayscale(0)"
    />
    <div class="">
      <h3 class="text-white">
        {{ card.title }}
      </h3>
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

<style>
/* img.absolute.inset-0.transform.w-full.h-full.object-cover.-translate-y-4 {
  padding: 20px;
} */
</style>
