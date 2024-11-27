<template>
  <div class="relative overflow-hidden">
    
    <!-- Reviews Carousel -->
    <div class="h-16">
      <transition-group
        name="fade"
        tag="div"
        class="absolute inset-0"
      >
        <div
          v-for="review in reviews"
          :key="review.id"
          v-show="currentReview.id === review.id"
          class="flex flex-col h-full"
        >
          <!-- Review Content -->
          <div class="flex-grow">
            <p class="text-gray-600 dark:text-gray-300 text-left italic text-sm">{{ review.content }} - <strong>{{ review.author }}</strong></p>
          </div>
        </div>
      </transition-group>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const reviews = Array.from({ length: 200 }, (_, i) => {
  // Generate random variations of reviews
  const reviewTemplates = [
    "Excelente producto, superó mis expectativas. La calidad es increíble",
    "Muy satisfecho con mi compra. El envío fue rápido y el producto es genial",
    "La mejor compra que he hecho. Totalmente recomendado",
    "Increíble relación calidad-precio. Vale cada peso",
    "Me encantó el producto, definitivamente volveré a comprar",
    "Perfecto para lo que necesitaba. Muy buena calidad",
    "Súper recomendado, la calidad es excepcional",
    "Excelente servicio y producto de primera",
    "Mejor de lo que esperaba. Muy contento con la compra",
    "Un producto que vale la pena. Muy satisfecho"
  ]

  const additionalPhrases = [
    ". El envío fue muy rápido",
    ". La atención al cliente es excelente",
    ". El empaque es muy seguro",
    ". Llegó en perfecto estado",
    ". La calidad es superior",
    ". El precio es muy justo",
    ". Totalmente recomendado",
    ". Superó mis expectativas",
    ". Excelente experiencia de compra",
    ". Muy profesionales"
  ]

  const names = [
    "Carlos Rodríguez", "Ana María González", "Juan Pablo Martínez", "María José López",
    "Diego Hernández", "Laura García", "Andrés Sánchez", "Valentina Torres",
    "Sebastián Ramírez", "Isabella Morales", "Daniel Jiménez", "Camila Ortiz",
    "Santiago Castro", "Sofía Vargas", "Mateo Ruiz", "Emma Flores",
    "Lucas Mendoza", "Victoria Ríos", "Nicolás Silva", "Paula Herrera",
    "Samuel Medina", "Mariana Pérez", "Gabriel Acosta", "Valeria Romero",
    "Benjamín Cruz", "Luciana Reyes", "Emilio Rojas", "Antonella Díaz",
    "Leonardo Muñoz", "Regina Álvarez", "Joaquín Moreno", "Renata Gutiérrez",
    "Tomás Contreras", "Sara Delgado", "Emilia Campos", "Felipe Navarro",
    "Catalina Ramos", "Maximiliano Vega", "Amanda Cordero", "Vicente Guerrero"
  ]

  // Generate a random review
  const baseReview = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)]
  const additionalPhrase = additionalPhrases[Math.floor(Math.random() * additionalPhrases.length)]
  const name = names[Math.floor(Math.random() * names.length)]

  return {
    id: i + 1,
    author: name,
    content: baseReview + additionalPhrase,
    rating: 5
  }
})

const currentReview = ref(reviews[0])
const currentIndex = ref(0)
const interval = ref(null)

const goToReview = (index) => {
  currentIndex.value = index
  currentReview.value = reviews[index]
  resetInterval()
}

const nextReview = () => {
  currentIndex.value = (currentIndex.value + 1) % reviews.length
  currentReview.value = reviews[currentIndex.value]
}

const resetInterval = () => {
  if (interval.value) clearInterval(interval.value)
  interval.value = setInterval(nextReview, 5000)
}

onMounted(() => {
  resetInterval()
})

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
