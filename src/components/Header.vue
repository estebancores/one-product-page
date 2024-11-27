<template>
  <header 
    class="bg-white dark:bg-gray-800 shadow-md z-40 transition-all duration-300 fixed w-full"
    :class="[isScrolled ? 'top-0' : 'top-[32px]']"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <img src="../assets/images/logo-isotype.png" alt="EsnaShop Logo" class="h-12 rounded-full">
            <span class="text-black dark:text-white font-semibold text-2xl transition-colors">EsnaShop</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Theme Switcher -->
          <button 
            @click="toggleTheme" 
            class=" bg-white p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors"
            :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
          >
            <!-- Sun icon for light mode -->
            <svg 
              v-if="theme === 'dark'"
              class="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- Moon icon for dark mode -->
            <svg 
              v-else
              class="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Shopping Cart Icon -->
          <router-link 
            to="/cart" 
            class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none relative transition-colors"
            :class="{ 'bg-green-500 text-white': cartItemCount > 0 }"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartItemCount > 0" 
                  class="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {{ cartItemCount }}
            </span>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useProductStore } from '../stores/products'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const store = useProductStore()
const themeStore = useThemeStore()
const { getCartItemCount } = storeToRefs(store)
const { theme } = storeToRefs(themeStore)
const { toggleTheme } = themeStore

const cartItemCount = getCartItemCount

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Add margin to main content to account for fixed header and announcement bar */
:deep(main) {
  margin-top: 6rem;
}
</style>
