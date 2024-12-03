import { defineStore } from 'pinia'

import productImage1 from '../assets/images/product/image-1.webp'
import productImage2 from '../assets/images/product/image-2.webp'
import productImage3 from '../assets/images/product/image-3.webp'
import productImage4 from '../assets/images/product/image-4.webp'

const BASE_PRICE = 39900
export const useProductStore = defineStore('products', {
  state: () => ({
    loading: false,
    error: null,
    product: {
      id: 1,
      name: "Planeador semanal acrilico",
      price: BASE_PRICE,
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
    },
    easySelectQty: [
      { quantity: 1, price: BASE_PRICE, savings: 0 },
      { quantity: 3, price: BASE_PRICE * 0.95, savings: 5 },
      { quantity: 5, price: BASE_PRICE * 0.90, savings: 10 },
    ],
    purchase: {
      quantity: 1,
      price: BASE_PRICE
    }
  }),
  
  getters: {
    basePrice() {
      return this.product.price
    },
    quantityoptions() {
      return this.easySelectQty
    },
    
    getCurrentPurchase() {
      return this.purchase
    }
  },
  actions: {
    setPurchaseQuantity(quantity) {
      this.purchase.quantity = quantity
    },

    setPurchasePrice(price) {
      this.purchase.price = price
    }
  }
})