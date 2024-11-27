<template>
  <section class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Product Image -->
        <div class="relative">
          <img 
            src="/src/assets/images/product/product-benefits.webp" 
            alt="Planeador semanal en uso" 
            class="rounded-lg shadow-lg w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
        </div>

        <!-- Benefits List -->
        <div class="space-y-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            ¿Por qué elegir nuestro planeador?
          </h2>

          <div class="space-y-6">
            <!-- Benefit 1 -->
            <div class="flex items-start space-x-4">
              <div>
                <h3 class="sm:text-left text-lg font-medium text-gray-900 dark:text-white">
                  Material Premium
                </h3>
                <p class="sm:text-left mt-2 text-gray-600 dark:text-gray-300">
                  Fabricado con acrílico de alta calidad que garantiza durabilidad y resistencia al uso diario.
                </p>
              </div>
            </div>

            <!-- Benefit 2 -->
            <div class="flex items-start space-x-4">
              <div>
                <h3 class="sm:text-left text-lg font-medium text-gray-900 dark:text-white">
                  Diseño Práctico
                </h3>
                <p class="sm:text-left mt-2 text-gray-600 dark:text-gray-300">
                  Organiza tu semana de manera eficiente con secciones bien definidas y espacio suficiente para seguimiento de tus habitos.
                </p>
              </div>
            </div>

            <!-- Benefit 3 -->
            <div class="flex items-start space-x-4">
              <div>
                <h3 class="sm:text-left text-lg font-medium text-gray-900 dark:text-white">
                  Personalizable
                </h3>
                <p class="sm:text-left mt-2 text-gray-600 dark:text-gray-300">
                  Usa el marcador incluido para escribir y borrar fácilmente, adaptando el planeador a tus necesidades cambiantes.
                </p>
              </div>
            </div>

            <!-- Benefit 4 -->
            <div class="flex items-start space-x-4">
              <div>
                <h3 class="sm:text-left text-lg font-medium text-gray-900 dark:text-white">
                  Fácil Instalación
                </h3>
                <p class="sm:text-left mt-2 text-gray-600 dark:text-gray-300">
                  Incluye imanes en la parte posterior para adherirse de manera sencilla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>
