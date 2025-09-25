<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Layout/Navbar.vue";
import NotificationPermission from "./components/UI/NotificationPermission.vue";
</script>

<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <!-- Notification Permission Modal -->
    <NotificationPermission />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
