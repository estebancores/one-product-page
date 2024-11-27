import { defineStore } from 'pinia'

const CART_STORAGE_KEY = 'esna-shop-cart'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    cart: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'),
    basePrice: 39900
  }),
  
  getters: {
    getProducts: (state) => state.products,
    getCartItems: (state) => state.cart,
    getCartTotal: (state) => state.cart.reduce((total, item) => {
      const price = calculateItemPrice(item.quantity, state.basePrice)
      return total + (price * item.quantity)
    }, 0),
    getCartItemCount: (state) => state.cart.reduce((count, item) => count + item.quantity, 0)
  },
  
  actions: {

    addToCart(product, quantity = 1) {
      const existingItem = this.cart.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity
        })
      }
      this.saveCartToStorage()
    },

    updateCartItemQuantity(productId, quantity) {
      const item = this.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        this.saveCartToStorage()
      }
    },

    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item.id === productId)
      if (index > -1) {
        this.cart.splice(index, 1)
        this.saveCartToStorage()
      }
    },

    clearCart() {
      this.cart = []
      this.saveCartToStorage()
    },

    saveCartToStorage() {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart))
    }
  }
})

function calculateItemPrice(quantity, basePrice) {
  if (quantity >= 5) {
    return basePrice * 0.90 
  } else if (quantity >= 3) {
    return basePrice * 0.95
  }
  return basePrice
}
