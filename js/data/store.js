/**
 * Cattaleya - Configuración general de la tienda (preview → Shopify)
 */
const STORE = {
  freeShippingThreshold: 999,
  nationalShippingFee: 99,
  localColimaShippingFee: 49,
  whatsapp: '5213121234567',
  instagram: 'https://instagram.com',
  whatsappMessages: {
    general: 'Hola, me interesa información sobre sus productos',
    personalized: 'Hola, me gustaría cotizar una pieza personalizada'
  }
};

function formatMXN(amount) {
  return `$${amount.toLocaleString('es-MX')} MXN`;
}

function getWhatsAppUrl(messageKey) {
  const text = encodeURIComponent(STORE.whatsappMessages[messageKey] || STORE.whatsappMessages.general);
  return `https://wa.me/${STORE.whatsapp}?text=${text}`;
}

function getSubtotal(cart) {
  return cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
}

function qualifiesForFreeNationalShipping(subtotal) {
  return subtotal >= STORE.freeShippingThreshold;
}

function getShippingCost(deliveryType, subtotal) {
  if (deliveryType === 'tienda') return 0;
  if (deliveryType === 'local-colima') return STORE.localColimaShippingFee;
  if (deliveryType === 'nacional') {
    return qualifiesForFreeNationalShipping(subtotal) ? 0 : STORE.nationalShippingFee;
  }
  return 0;
}

function getShippingLabel(deliveryType, subtotal) {
  const cost = getShippingCost(deliveryType, subtotal);
  if (cost === 0) {
    if (deliveryType === 'tienda') return 'Recoger en tienda — sin costo';
    if (deliveryType === 'nacional' && qualifiesForFreeNationalShipping(subtotal)) {
      return `Envío nacional — gratis (compra desde ${formatMXN(STORE.freeShippingThreshold)})`;
    }
    return 'Sin costo de envío';
  }
  if (deliveryType === 'local-colima') return `Envío local Colima — ${formatMXN(cost)}`;
  return `Envío nacional — ${formatMXN(cost)}`;
}

function getOrderTotal(cart, deliveryType) {
  const subtotal = getSubtotal(cart);
  return subtotal + getShippingCost(deliveryType, subtotal);
}
