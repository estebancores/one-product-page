<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {{ cartMode ? 'Finalizar tu Compra' : 'Compra Rápida' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre Completo
          </label>
          <input 
            type="text" 
            v-model="formData.name" 
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
        </div>


        <div>
          <label class="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Teléfono
          </label>
          <input 
            type="tel" 
            v-model="formData.phone" 
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
        </div>

        <div>
          <label class="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dirección de Envío
          </label>
          <textarea 
            v-model="formData.address" 
            required
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
          <div class="flex justify-between text-gray-900 dark:text-white font-semibold">
            <span>Total:</span>
            <span>${{ formatPrice(productTotal) }}</span>
          </div>
        </div>

        <div class="flex space-x-3">
          <button 
            type="button" 
            @click="$emit('close')"
            class="flex-1 px-4 py-2 border bg-white border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            class="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Confirmar Compra
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  cartMode: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  },
  total: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 1
  }
})

const calculateItemPrice = (quantity, basePrice = 39900) => {
  if (quantity >= 5) {
    return basePrice * 0.90 // 10% discount
  } else if (quantity >= 3) {
    return basePrice * 0.95 // 5% discount
  }
  return basePrice
}

const productTotal = computed(() => {
  if (props.cartMode) {
    return props.total
  }
  const basePrice = 39900
  const price = calculateItemPrice(props.quantity, basePrice)
  return price * props.quantity
})

const formatPrice = (price) => {
  return price.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

const generateWhatsAppMessage = (purchaseData) => {
  const message = `*Nuevo Pedido - Planificador Semanal*\n\n` +
    `*Cliente:* ${purchaseData.name}\n` +
    `*Teléfono:* ${purchaseData.phone}\n` +
    `*Dirección:* ${purchaseData.address}\n\n` +
    `--------------------------------------\n` +
    `*Detalles del Pedido:*\n` +
    `- Cantidad: ${purchaseData.quantity}\n` +
    `- Precio unitario: $${formatPrice(calculateItemPrice(purchaseData.quantity))}\n` +
    `- Total: $${formatPrice(purchaseData.total)}\n\n` +
    `--------------------------------------`

  // Encode the message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message)
  const whatsappNumber = '573114246334' // Replace with your WhatsApp number
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
}

const emit = defineEmits(['close', 'purchase'])

const formData = ref({
  name: '',
  phone: '',
  address: ''
})

const handleSubmit = () => {
  const purchaseData = {
    ...formData.value,
    total: productTotal.value,
    quantity: props.quantity,
    items: props.cartMode ? 'Cart Items' : props.product
  }
  
  // Generate WhatsApp link and redirect
  const whatsappLink = generateWhatsAppMessage(purchaseData)
  window.open(whatsappLink, '_blank')
  
  emit('purchase', purchaseData)
}
</script>
