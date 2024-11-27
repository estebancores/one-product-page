<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Preguntas Frecuentes
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber sobre nuestro planeador
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 px-4">
        <div v-for="(faq, index) in faqs" :key="index" 
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <button 
            @click="faq.isOpen = !faq.isOpen"
            class="bg-white dark:bg-transparent w-full flex justify-between items-start text-left"
          >
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ faq.question }}
            </h3>
            <span class="ml-6 flex-shrink-0">
              <svg 
                class="w-6 h-6 text-gray-500 dark:text-gray-400 transform transition-transform"
                :class="{ 'rotate-180': faq.isOpen }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="faq.isOpen" class="mt-4">
              <p class="text-gray-600 dark:text-gray-300">
                {{ faq.answer }}
              </p>
            </div>
          </transition>
        </div>
      </div>

      <!-- Contact Support -->
      <div class="mt-12 text-center">
        <p class=" text-gray-600 dark:text-gray-300">
          ¿No encontraste lo que buscabas?
        </p>
        <button class="bg-green-400 mt-4 inline-flex items-center text-white" @click="contactFaq">
          Contáctanos
          <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: '¿Cuánto tiempo dura el marcador incluido?',
    answer: 'El marcador incluido tiene una duración aproximada de 3-4 meses con uso regular. Puedes usar cualquier marcador borrable estándar cuando necesites reemplazarlo.',
    isOpen: false
  },
  {
    question: '¿Cómo limpio el planeador?',
    answer: 'Simplemente usa un paño suave o borrador de pizarra para borrar. Para una limpieza más profunda, puedes usar un limpiador específico para acrílico o una mezcla suave de agua con jabón.',
    isOpen: false
  },
  {
    question: '¿El planeador se raya fácilmente?',
    answer: 'No, nuestro planeador está fabricado con acrílico de alta calidad resistente a rayones. Sin embargo, recomendamos usar solo marcadores borrables y evitar objetos punzantes.',
    isOpen: false
  },
  {
    question: '¿Qué tamaño tiene el planeador?',
    answer: 'El planeador mide 16.5x26.5 cm, un tamaño ideal para visualizar toda tu semana mientras mantiene un espacio razonable en tu pared.',
    isOpen: false
  },
  {
    question: '¿Cómo se instala?',
    answer: 'El planeador viene con imanes de neodimio en la parte posterior que se adhieren firmemente a superficies metálicas.',
    isOpen: false
  },
  {
    question: '¿Puedo usarlo en exteriores?',
    answer: 'El planeador está diseñado para uso en interiores. La exposición directa al sol o a la intemperie puede afectar su durabilidad y funcionamiento.',
    isOpen: false
  },
  {
    question: '¿Hacen envíos internacionales?',
    answer: 'Actualmente realizamos envíos a toda Colombia. Estamos trabajando para expandir nuestros envíos a otros países de Latinoamérica próximamente.',
    isOpen: false
  },
  {
    question: '¿Ofrecen descuentos para compras al por mayor?',
    answer: 'Sí, ofrecemos descuentos especiales para pedidos de 20 o más unidades. Contáctanos directamente para obtener una cotización personalizada.',
    isOpen: false
  }
])

const contactFaq = () => {
  const message = '*Hola*, estoy interesado en comprar el planeador semanal. Tengo otras dudas por resolver:' 
  const encodedMessage = encodeURIComponent(message)
  const whatsappNumber = '573114246334' 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
  window.open(whatsappLink, '_blank')
}

</script>

<style scoped>
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
