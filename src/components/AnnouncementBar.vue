<template>
  <div class="bg-blue-600 dark:bg-blue-700 text-white overflow-hidden">
    <div class="relative">
      <!-- Announcements Slider -->
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(announcement, index) in announcements" 
          :key="index"
          class="flex-shrink-0 w-full py-2"
        >
          <div class="flex items-center justify-center space-x-2 px-4">
            <p class="text-sm font-medium">{{ announcement.text }}</p>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Announcements data
const announcements = [
  { text: "Envío gratis por compras superiores a $120.000" },
  { text: "⚡🕒 $39.900 Oferta por tiempo limitado 🕒⚡" },
]

const currentIndex = ref(0)
const autoplayInterval = ref(null)
const autoplayDelay = 5000 // 5 seconds

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % announcements.length
}

const resetAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
  autoplayInterval.value = setInterval(nextSlide, autoplayDelay)
}

// Start autoplay on mount
onMounted(() => {
  resetAutoplay()
})

// Clean up on unmount
onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
})
</script>
