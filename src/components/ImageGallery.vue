<template>
  <div class="relative">
    <!-- Main Image -->
    <div class="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <img 
        :src="currentImage" 
        :alt="alt"
        class="w-full h-[500px] object-contain transition-transform duration-200"
        ref="mainImage"
      >
      
      <!-- Navigation Arrows -->
      <div class="absolute inset-y-0 left-0 flex items-center">
        <button 
          v-if="selectedIndex > 0"
          @click="selectImage(selectedIndex - 1)"
          class="h-80 p-2 bg-black/20 hover:bg-black/30 text-white rounded-r-lg transition-colors"
          aria-label="Previous image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <button 
          v-if="selectedIndex < images.length - 1"
          @click="selectImage(selectedIndex + 1)"
          class="h-80 p-2 bg-black/20 hover:bg-black/30 text-white rounded-l-lg transition-colors"
          aria-label="Next image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Thumbnails -->
    <div class="mt-4 grid grid-cols-4 gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="selectImage(index)"
        class="relative rounded-lg overflow-hidden aspect-square bg-white dark:bg-gray-800"
        :class="{ 'ring-2 ring-blue-500 dark:ring-blue-400': selectedIndex === index }"
      >
        <img 
          :src="image" 
          :alt="`${alt} - View ${index + 1}`"
          class="w-full h-full object-contain transition-opacity hover:opacity-80"
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})

const selectedIndex = ref(0)
const mainImage = ref(null)

const currentImage = computed(() => props.images[selectedIndex.value])

const selectImage = (index) => {
  selectedIndex.value = index
}
</script>