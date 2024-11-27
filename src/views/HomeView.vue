<template>
  <div class="container mx-auto px-4 mt-10">
    <div class="rounded-xl sm:p-6 md:p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Product Image Gallery -->
        <ImageGallery 
          :images="product.images" 
          :alt="product.name"
        />

        <!-- Product Info -->
        <div class="space-y-4">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white text-left">{{ product.name }}</h1>
          <div class="flex items-center mb-2">
            <div class="flex text-yellow-400">
              <svg v-for="star in 5" :key="star" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">4.5 (100+ reseñas)</span>
          </div>

          <div >
            <ReviewsCarousel />
          </div>

          <div class="">
            <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-white text-left">Características del Producto</h3>
            <ul class="space-y-3">
              <li v-for="(feature, index) in product.features" :key="index" class="text-left text-sm sm:text-lg">
                <span class="text-gray-600 dark:text-gray-300">{{ feature }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Quantity Selection Cards -->
          <div class="grid grid-cols-3 sm:gap-4 gap-2">
            <button
              v-for="option in quantityOptions"
              :key="option.quantity"
              @click="selectQuantity(option)"
              class="relative flex flex-col items-center p-4 border-2 rounded-lg transition-all duration-200 focus:outline-none active:outline-none"
              :class="[
                selectedQuantity === option.quantity 
                  ? 'border-blue-500 bg-blue-50 dark:bg-gray-900/20' 
                  : 'border-gray-200 bg-gray-400 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700'
              ]"
            >
              <!-- Savings Badge -->
              <div 
                v-if="option.savings > 0"
                class="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                Ahorra {{ option.savings }}%
              </div>

              <!-- Quantity -->
              <span 
                class="text-2xl font-bold mb-1 text-gray-900 dark:text-white"
                :class="[
                selectedQuantity === option.quantity
                  ? 'text-green-600' 
                  : ''
              ]"
                >
                {{ option.quantity }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                unidad{{ option.quantity > 1 ? 'es' : '' }}
              </span>

              <!-- Price -->
              <div class="mt-2 text-center">
                <span class="block font-bold text-blue-600 dark:text-blue-400 text-sm sm:text-lg">
                  ${{ formatPrice(option.price * option.quantity) }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  ${{ formatPrice(option.price) }} c/u
                </span>
              </div>
            </button>
          </div>

          <div class="space-y-4">
            <button @click="addToCart" 
                    class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
              Agregar al Carrito
            </button>
            <button @click="handleBuyNow(selectedQuantity)" 
                    class="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors">
              Comprar Ahora
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="mt-8 grid grid-cols-3 gap-4">
            <div class="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm font-medium text-gray-900 dark:text-white">Envío Rápido</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">2-3 días hábiles</span>
            </div>
            
            <div class="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-sm font-medium text-gray-900 dark:text-white">30 Días de Garantía</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Devolución garantizada</span>
            </div>
            
            <div class="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span class="text-sm font-medium text-gray-900 dark:text-white">Pago Seguro</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Transacciones cifradas</span>
            </div>
          </div>

          
        </div>
      </div>
    </div>

    <div>
      <ProductBenefits />
    </div>

    <div>
      <ProductComparison />
    </div>

    <div>
      <GuaranteeSection />
    </div>

    <div>
      <BuyerReviews />
    </div>

    <div>
      <FAQSection />
    </div>

    <Footer />

    <a 
      href="https://wa.me/573114246334" 
      target="_blank"
      class="fixed bottom-6 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors z-[9999] flex items-center justify-center"
      title="Contactanos por WhatsApp"
      style="touch-action: manipulation;"
      @click="handleWhatsAppClick"
    >
      <svg 
        class="h-6 w-6 md:h-6 md:w-6" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>

    <!-- Purchase Dialog -->
    <PurchaseDialog 
      v-if="showPurchaseDialog" 
      :product="product"
      :quantity="selectedQuantity"
      @close="showPurchaseDialog = false"
      @purchase="handlePurchase"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import { logAnalyticsEvent } from '../firebase'
import { metaPixelEvents } from '../utils/metaPixel'
import PurchaseDialog from '../components/PurchaseDialog.vue'
import ImageGallery from '../components/ImageGallery.vue'
import ReviewsCarousel from '../components/ReviewsCarousel.vue'
import ProductBenefits from '../components/ProductBenefits.vue'
import ProductComparison from '../components/ProductComparison.vue'
import GuaranteeSection from '../components/GuaranteeSection.vue'
import FAQSection from '../components/FAQSection.vue'
import BuyerReviews from '../components/BuyerReviews.vue'
import Footer from '../components/Footer.vue'

// Import product images
import productImage1 from '../assets/images/product/image-1.webp'
import productImage2 from '../assets/images/product/image-2.webp'
import productImage3 from '../assets/images/product/image-3.webp'
import productImage4 from '../assets/images/product/image-4.webp'

const store = useProductStore()
const showPurchaseDialog = ref(false)
const selectedQuantity = ref(1)

const basePrice = 39900

const quantityOptions = [
  { quantity: 1, price: basePrice, savings: 0 },
  { quantity: 3, price: basePrice * 0.95, savings: 5 },
  { quantity: 5, price: basePrice * 0.90, savings: 10 },
]

const product = {
  id: 1,
  name: "Planeador semanal acrilico",
  price: basePrice,
  images: [
    productImage1,
    productImage2,
    productImage3,
    productImage4
  ],
  features: [
    "✨ Diseño Elegante",
    "📝 Fácil de Usar",
    "🔄 Reutilizable",
    "📅 Vista Semanal",
  ]
}

const formatPrice = (price) => {
  return price.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

const selectQuantity = (option) => {
  selectedQuantity.value = option.quantity
  product.price = option.price
}

const addToCart = () => {
  logAnalyticsEvent('add_to_cart', {
    currency: 'COP',
    value: product.price * selectedQuantity.value,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity: selectedQuantity.value
    }]
  });

  metaPixelEvents.addToCart(product, selectedQuantity.value);
  
  store.addToCart(product, selectedQuantity.value);
}

const handleBuyNow = (quantity) => {
  logAnalyticsEvent('begin_checkout', {
    currency: 'COP',
    value: product.price * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity: quantity
    }]
  });

  metaPixelEvents.initiateCheckout(product, quantity);
  
  showPurchaseDialog.value = true;
};

const handleWhatsAppClick = () => {
  logAnalyticsEvent('whatsapp_contact', {
    source: 'floating_button'
  });

  metaPixelEvents.contact('WhatsApp');
};

const handlePurchase = (purchaseDetails) => {
  console.log('Purchase details:', purchaseDetails)
  showPurchaseDialog.value = false
}

onMounted(() => {
  logAnalyticsEvent('page_view', {
    page_title: 'Home',
    page_location: window.location.href
  });

  logAnalyticsEvent('view_item', {
    currency: 'COP',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price
    }]
  });

  metaPixelEvents.viewContent(product);
});
</script>