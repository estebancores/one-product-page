<template>
  <div class="container mx-auto px-4 py-8 mt-10">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Carrito de Compras</h1>
      <router-link 
        to="/" 
        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Volver a la Tienda
      </router-link>
    </div>

    <div v-if="cartItems.length === 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
      <p class="text-gray-600 dark:text-gray-300 mb-4">Tu carrito está vacío</p>
      <router-link to="/" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors">
        Continuar Comprando
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartItems" :key="item.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-center space-x-4">
          <img :src="productImage" :alt="item.name" class="w-24 h-24 object-fill rounded-lg">
          
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
            <p class="text-blue-600 dark:text-blue-400 font-medium">${{ formatPrice(item.price) }}</p>
            
            <div class="flex items-center space-x-2 mt-2">
              <button @click="decrementQuantity(item)" 
                      class="px-2 py-1 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">-</button>
              <span class="w-8 text-center text-gray-900 dark:text-white">{{ item.quantity }}</span>
              <button @click="incrementQuantity(item)" 
                      class="px-2 py-1 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">+</button>
            </div>
          </div>
          
          <button @click="removeFromCart(item.id)" 
                  class="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors">
            <span class="sr-only">Eliminar</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-fit">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resumen del Pedido</h2>
        
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Subtotal</span>
            <span>${{ formatPrice(cartTotal) }}</span>
          </div>
          <div class="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Envío</span>
            <div class="relative">
              <span 
                :class="{ 
                'transition-opacity duration-500': true,
                'opacity-0': showFreeShippingAnimation && shippingCost === 0,
                'opacity-100': !showFreeShippingAnimation || shippingCost > 0,
                'bg-green-600 text-white p-1 rounded-md': shippingCost === 0
              }">
                {{ shippingCost === 0 ? 'Gratis 🔥' : '$' + formatPrice(shippingCost) }}
              </span>
              <span v-if="showFreeShippingAnimation && shippingCost === 0"
                    class="absolute top-0 left-0 text-green-500 font-bold animate-bounce">
                ¡Envío Gratis! 🎉
              </span>
            </div>
          </div>
          <div class="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
            <div class="flex justify-between font-semibold text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${{ formatPrice(finalTotal) }}</span>
            </div>
          </div>
        </div>

        <button @click="showPurchaseDialog = true"
                class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
          Finalizar Compra
        </button>
      </div>
    </div>

    <!-- Purchase Dialog -->
    <PurchaseDialog 
      v-if="showPurchaseDialog" 
      :cart-mode="true"
      :total="finalTotal"
      :quantity="store.getCartItemCount"
      @close="showPurchaseDialog = false"
      @purchase="handlePurchase"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import { logAnalyticsEvent } from '../firebase'
import { trackMetaEvent } from '../utils/metaPixel'
import PurchaseDialog from '../components/PurchaseDialog.vue'
import confetti from 'canvas-confetti'

import productImage from '../assets/images/product/image-3.webp'

const basePrice = 39900
const store = useProductStore()
const showPurchaseDialog = ref(false)
const showFreeShippingAnimation = ref(false)
const confettiAnimationShowed = ref(false)

const formatPrice = (price) => {
  return price.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

const calculateItemPrice = (quantity) => {
  if (quantity >= 5) {
    return basePrice * 0.90
  } else if (quantity >= 3) {
    return basePrice * 0.95
  }
  return basePrice
}

const cartItems = computed(() => {
  return store.getCartItems.map(item => ({
    ...item,
    price: calculateItemPrice(item.quantity)
  }))
})

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const shippingCost = computed(() => {
  return cartTotal.value > 120000 ? 0 : 10500
})

const finalTotal = computed(() => cartTotal.value + shippingCost.value)

const triggerConfetti = () => {
  const end = Date.now() + 1000

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffa500', '#6a5acd','#3cb371']

  ;(function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors
    })
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }())
}

const checkAndTriggerFreeShipping = () => {
  if (!confettiAnimationShowed.value && cartTotal.value > 120000) {
    showFreeShippingAnimation.value = true
    confettiAnimationShowed.value = true
    triggerConfetti()
    setTimeout(() => {
      showFreeShippingAnimation.value = false
    }, 3000)
  }
}

// Track cart view when component mounts
onMounted(() => {
  checkAndTriggerFreeShipping();
  
  // Track cart view - Firebase
  logAnalyticsEvent('view_cart', {
    currency: 'COP',
    value: cartTotal.value,
    items: cartItems.value.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  });

  // Track cart view - Meta Pixel
  trackMetaEvent('ViewCart', {
    content_type: 'product',
    content_ids: cartItems.value.map(item => item.id),
    contents: cartItems.value.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    currency: 'COP',
    value: cartTotal.value
  });
});

const incrementQuantity = (item) => {
  store.updateCartItemQuantity(item.id, item.quantity + 1)
  checkAndTriggerFreeShipping()
}

const decrementQuantity = (item) => {
  store.updateCartItemQuantity(item.id, item.quantity - 1)
  if (cartTotal.value < 120000 ) {
    confettiAnimationShowed.value = false
  }
  checkAndTriggerFreeShipping()
}

const removeFromCart = (productId) => {
  const item = cartItems.value.find(item => item.id === productId);
  store.removeFromCart(productId)
}

const handlePurchase = (purchaseDetails) => {
  // Track purchase - Firebase
  logAnalyticsEvent('purchase', {
    transaction_id: Date.now().toString(),
    value: finalTotal.value,
    currency: 'COP',
    shipping: shippingCost.value,
    items: cartItems.value.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  });

  // Track purchase - Meta Pixel
  trackMetaEvent('Purchase', {
    content_type: 'product',
    content_ids: cartItems.value.map(item => item.id),
    contents: cartItems.value.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    currency: 'COP',
    value: finalTotal.value,
    num_items: cartItems.value.reduce((total, item) => total + item.quantity, 0)
  });

  console.log('Purchase details:', purchaseDetails);
  showPurchaseDialog.value = false;
  store.clearCart();
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
