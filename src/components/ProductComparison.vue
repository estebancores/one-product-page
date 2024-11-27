<template>
  <section class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Compara y elige la mejor opción
      </h2>

      <!-- Comparison Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" class="py-3 px-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Características
              </th>
              <th scope="col" class="py-3 px-6 text-center text-sm font-semibold bg-blue-200 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-t-lg">
                Nuestro Planeador
                <div class="text-xs font-normal mt-1 text-blue-600 dark:text-blue-400">Recomendado</div>
              </th>
              <th scope="col" class="py-3 px-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Planeador Común
              </th>
              <th scope="col" class="py-3 px-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Agenda Tradicional
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(feature, index) in features" :key="index" 
                :class="index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'">
              <td class="py-4 px-6 text-sm text-center text-gray-900 dark:text-white">
                {{ feature.name }}
              </td>
              <td class="py-4 px-6 text-center bg-blue-200 dark:bg-blue-900/50 relative">
                <div class="absolute inset-0 border-x border-blue-100 dark:border-blue-800"></div>
                <div class="relative">
                  <span v-if="feature.ourProduct" class="text-blue-600 dark:text-blue-400">
                    <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span v-else class="text-red-600 dark:text-red-400">
                    <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </span>
                </div>
              </td>
              <td class="py-4 px-6 text-center">
                <span v-if="feature.commonPlanner" class="text-green-600 dark:text-green-400">
                  <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span v-else class="text-red-600 dark:text-red-400">
                  <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <span v-if="feature.traditional" class="text-green-600 dark:text-green-400">
                  <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span v-else class="text-red-600 dark:text-red-400">
                  <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bottom Label -->
      <div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        * Comparación basada en características estándar del mercado
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    name: 'Reutilizable',
    ourProduct: true,
    commonPlanner: false,
    traditional: false
  },
  {
    name: 'Material Duradero',
    ourProduct: true,
    commonPlanner: true,
    traditional: false
  },
  {
    name: 'Borrable y Editable',
    ourProduct: true,
    commonPlanner: false,
    traditional: false
  },
  {
    name: 'Seguimiento de Hábitos',
    ourProduct: true,
    commonPlanner: true,
    traditional: true
  },
  {
    name: 'Instalación Magnética',
    ourProduct: true,
    commonPlanner: false,
    traditional: false
  },
  {
    name: 'Ecológico',
    ourProduct: true,
    commonPlanner: false,
    traditional: false
  },
  {
    name: 'Vista Semanal Completa',
    ourProduct: true,
    commonPlanner: true,
    traditional: true
  },
  {
    name: 'Sin Costo Recurrente',
    ourProduct: true,
    commonPlanner: false,
    traditional: false
  }
]
</script>

<style scoped>
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}
</style>
