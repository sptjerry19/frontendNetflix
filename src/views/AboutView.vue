<template>
  <div class="bg-zinc-900">
    <NavbarView />
    <div class="about">
      <h1>{{ $route.name }}</h1>
    </div>
  </div>
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
