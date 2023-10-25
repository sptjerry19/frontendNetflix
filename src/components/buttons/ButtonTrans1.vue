<template>
  <button
    class="transition ease-in-out delay-150 bg-blue-500 hover:scale-110 hover:bg-indigo-500 duration-300 rounded-md px-2 py-1"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>
