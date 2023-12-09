<template>
  <h1>this is favorite page</h1>
  <h2>{{ log }}</h2>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      log: "",
    };
  },
  created() {
    axios
      .get(this.$store.state.UrlServe + "/favorites/films")
      .then((response) => {
        this.log = response;
      });
  },
};
</script>
