<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Copyright and Security -->
        <div class="space-y-6">
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold text-gray-900 dark:text-white">EsnaShop</span>
            <span class="text-gray-500 dark:text-gray-400">|</span>
            <span class="text-sm text-gray-500 dark:text-gray-400"> Todos los derechos reservados</span>
          </div>
          
          <!-- Security Badges -->
          <div class="flex flex-wrap gap-4 items-center">
            <div class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Pago Seguro</span>
            </div>
            <div class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">SSL Certificado</span>
            </div>
            <div class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Transacciones Seguras</span>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
            Métodos de Pago Aceptados
          </h3>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div class="flex flex-wrap gap-8 justify-center items-center">
              <div class="transform hover:scale-105 transition-transform duration-200">
                <img 
                  src="../assets/images/payments.png" 
                  alt="Tarjetas de crédito aceptadas" 
                  class="h-8 object-contain"
                />
              </div>
              <div class="transform hover:scale-105 transition-transform duration-200">
                <img 
                  src="../assets/images/payment-method-2.webp" 
                  alt="Métodos de pago digitales" 
                  class="h-8 object-contain"
                />
              </div>
              <div class="transform hover:scale-105 transition-transform duration-200">
                <img 
                  src="../assets/images/payment-method-3.png" 
                  alt="Otros métodos de pago" 
                  class="h-8 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p class="text-xs text-center text-gray-500 dark:text-gray-400">
          Este sitio está protegido por reCAPTCHA y se aplican la Política de Privacidad y los Términos de Servicio de Google.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional script needed
</script>
