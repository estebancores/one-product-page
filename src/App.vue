<script setup>
import Header from './components/Header.vue'
import AnnouncementBar from './components/AnnouncementBar.vue'
</script>

<template>
  <div class="min-h-screen dark:bg-gray-900 transition-colors">
    <AnnouncementBar />
    <Header />
    <main class="max-w-7xl mx-auto py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
body {
  @apply bg-gray-50 dark:bg-gray-900 transition-colors;
}

#app {
  @apply text-gray-900 dark:text-gray-100;
}
</style>
