<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-900/50">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Lo que dicen nuestros clientes
        </h2>
        <div class="mt-4 flex items-center justify-center gap-4">
          <div class="flex items-center">
            <div class="flex items-center">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="ml-2 text-lg font-semibold text-gray-900 dark:text-white">4.5</p>
          </div>
          <span class="text-gray-500 dark:text-gray-400">|</span>
          <p class="text-lg text-gray-600 dark:text-gray-300">+100 reseñas verificadas</p>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
        <div v-for="(review, index) in reviews" :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <!-- Review Header -->
          <div class="flex items-center mb-4">
            <img :src="review.userImage" :alt="review.userName" class="w-12 h-12 rounded-full object-cover">
            <div class="ml-4">
              <div class="flex items-center">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ review.userName }}</h3>
                <svg v-if="review.verified" class="w-5 h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="flex items-center mt-1">
                <div class="flex">
                  <svg v-for="i in review.rating" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ review.date }}</span>
              </div>
            </div>
          </div>

          <!-- Review Content -->
          <p class="text-gray-600 dark:text-gray-300">{{ review.comment }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Helper function to generate random dates within the last 3 months
const getRandomDate = () => {
  const end = new Date()
  const start = new Date(end.getTime() - (90 * 24 * 60 * 60 * 1000))
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Generate reviews data
const generateReviews = (count) => {
  const names = [
    'Ana María', 'Carlos', 'Gabriel', 'Santiago', 'Valentina', 'Sebastián', 'Johnier', 'Daniel',
    'Mariana', 'Patricia', 'Diego', 'Andrés', 'Jhon R.', 'Diego', 'María José', 'Brigitte',
    'Ramiro Arboleda', 'Alejandro', 'Paula', 'Mateo'
  ]
  
  const comments = [
    'Excelente planeador, me ayuda a mantener mi semana organizada. La calidad del acrílico es muy buena.',
    'Me encanta que sea magnético, lo tengo en mi nevera y es súper práctico. El tamaño es perfecto.',
    'Increíble producto, lo uso todos los días. El marcador que viene incluido es de muy buena calidad.',
    'Superó mis expectativas, la calidad es excelente y el diseño es muy elegante.',
    'Perfecto para organizar mis actividades semanales. El material es resistente y fácil de limpiar.',
    'Lo compré hace un mes y estoy encantada. Es exactamente lo que necesitaba para organizarme mejor.',
    'La calidad del acrílico es excepcional, no se raya y se mantiene como nuevo.',
    'Muy útil para planificar la semana. El diseño es minimalista y elegante.',
    'Excelente servicio y producto de calidad. Lo recomiendo totalmente.',
    'Me ayuda mucho a mantener un mejor control de mis actividades diarias.',
    'El planeador es hermoso y muy funcional. La entrega fue rápida.',
    'Muy satisfecha con mi compra, el producto es de excelente calidad.',
    'Lo uso para organizar las actividades de toda la familia. Es perfecto.',
    'El tamaño es ideal y la calidad del material es excelente.',
    'Muy buen producto, cumple perfectamente su función.',
    'Me encanta que sea tan práctico y facil de limpiar.',
    'Excelente relación calidad-precio. Lo recomiendo.',
    'El diseño es muy práctico y se ve muy bien en mi oficina.',
    'Perfecto para mantener un registro visual de mis actividades.',
    'La calidad del producto justifica totalmente su precio.'
  ]

  return Array.from({ length: count }, (_, i) => ({
    userName: names[i % names.length],
    userImage: `https://i.pravatar.cc/150?img=${i + 1}`,
    rating: Math.random() > 0.2 ? 5 : 4,
    verified: Math.random() > 0.3,
    date: getRandomDate(),
    comment: comments[i % comments.length],
  }))
}

const maxReviews = 100 // Maximum number of reviews to load
const reviews = ref(generateReviews(21))
const displayCount = ref(21)

// Computed property to check if we can load more
const canLoadMore = computed(() => displayCount.value < maxReviews)
</script>
