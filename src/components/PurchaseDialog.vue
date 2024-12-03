<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 mt-10">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {{ cartMode ? 'Finalizar tu Compra' : 'Compra Rápida' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
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
              <p class="text-xs text-gray-500 dark:text-gray-400">(incluyendo ciudad y barrio)</p>
            </label>
            <textarea 
              v-model="formData.address" 
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div>
            <label class="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Método de pago
            </label>
            <select 
              v-model="formData.paymentMethod" 
              required
              class="w-full px-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="Tarjeta de crédito">Tarjeta de Crédito (Mercadopago)</option>
              <option value="Transferencia bancaria">Transferencia (Nu, Nequi, Bancolombia)</option>
            </select>
          </div>

        </div>
        <div class="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
          <div class="flex justify-between text-gray-900 dark:text-white font-semibold">
            <span>Unidades:</span>
            <span>{{ quantity }}</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-gray-900 dark:text-white font-semibold">
            <span>Precio unitario:</span>
            <span>${{ formatPrice(calculateItemPrice(quantity)) }}</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-gray-900 dark:text-white font-semibold">
            <span>Envío:</span>
            <span>${{ formatPrice(shippingCost) }}</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-gray-900 dark:text-white font-semibold">
            <span>Total:</span>
            <span>${{ formatPrice(productTotal) }}</span>
          </div>
        </div>

        <div class="mt-2">
          
          <button
            type="submit"
            class="w-full px-4 py-2 bg-green-600 dark:bg-blue-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            Confirmar Compra
          </button>

          <button 
            type="button" 
            @click="$emit('close')"
            class="mt-2 w-full text-sm px-4 py-2 border bg-white text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/products'
const store = useProductStore()

const props = defineProps({
  cartMode: {
    type: Boolean,
    default: false
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

const calculateItemPrice = (quantity) => {
  if (quantity >= 5) {
    return store.product.price * 0.90 // 10% discount
  } else if (quantity >= 3) {
    return store.product.price * 0.95 // 5% discount
  }
  return store.product.price
}

const shippingCost = computed(() => {
  return calculateItemPrice(props.quantity) * props.quantity > 120000 ? 0 : 10500
})

const productTotal = computed(() => {
  if (props.cartMode) {
    return props.total
  }
  const price = calculateItemPrice(props.quantity)
  return price * props.quantity + shippingCost.value
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
    `*Dirección:* ${purchaseData.address}\n` +
    `*Metodo de Pago:* ${purchaseData.paymentMethod}\n\n` +
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
  address: '',
  paymentMethod: ''
})

const handleSubmit = () => {
  const purchaseData = {
    ...formData.value,
    total: productTotal.value,
    quantity: props.quantity,
  }
  
  // Generate WhatsApp link and redirect
  const whatsappLink = generateWhatsAppMessage(purchaseData)
  window.open(whatsappLink, '_blank')
  
  emit('purchase', purchaseData)
}
</script>
