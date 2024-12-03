// Meta Pixel Event Tracking
export const trackMetaEvent = (eventName, parameters = {}) => {
  // if (window.fbq) {
  //   window.fbq('track', eventName, parameters);
  // }
};

// Common Meta Pixel Events
export const metaPixelEvents = {
  viewContent: (content) => {
    trackMetaEvent('ViewContent', {
      content_type: 'product',
      content_ids: [content.id],
      content_name: content.name,
      currency: 'COP',
      value: content.price
    });
  },

  addToCart: (product, quantity) => {
    trackMetaEvent('AddToCart', {
      content_type: 'product',
      content_ids: [product.id],
      content_name: product.name,
      currency: 'COP',
      value: product.price * quantity
    });
  },

  initiateCheckout: (product, quantity) => {
    trackMetaEvent('InitiateCheckout', {
      content_type: 'product',
      content_ids: [product.id],
      content_name: product.name,
      currency: 'COP',
      value: product.price * quantity,
      num_items: quantity
    });
  },

  contact: (method) => {
    trackMetaEvent('Contact', {
      content_category: 'Contact',
      content_name: method
    });
  }
};
