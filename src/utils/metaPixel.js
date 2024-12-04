// Meta Pixel Event Tracking
export const trackMetaEvent = (eventName, parameters = {}) => {
  // if (window.fbq) {
  //   window.fbq('track', eventName, parameters);
  // }
};

// Common Meta Pixel Events
export const metaPixelEvents = {
  viewContent: () => {
    trackMetaEvent('ViewContent', {
      content_type: 'product',
      content_name: "Planeador semanal acrilico",
      currency: 'COP',
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

  purchaseConfirmed: (total, quantity) => {
    trackMetaEvent('Purchase', {
      content_type: 'purchase',
      currency: 'COP',
      value: total,
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
