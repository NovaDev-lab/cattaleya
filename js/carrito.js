(function() {
  'use strict';

  const cart = getCart();
  const itemsEl = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  const emptyEl = document.getElementById('cart-empty');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingNoteEl = document.getElementById('cart-shipping-note');

  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    return;
  }

  emptyEl.style.display = 'none';
  summaryEl.style.display = 'block';

  let html = '';
  cart.forEach((item, idx) => {
    html += `
      <div class="cart-item" data-idx="${idx}">
        <img src="${item.image}" alt="${item.name}" class="cart-item__img">
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">${formatMXN(item.price)} × ${item.qty || 1}</div>
          <div class="cart-item__qty">
            <button data-action="minus">−</button>
            <span>${item.qty || 1}</span>
            <button data-action="plus">+</button>
          </div>
          <button class="cart-item__remove" data-action="remove">Eliminar</button>
        </div>
        <div class="cart-item__total">${formatMXN((item.price || 0) * (item.qty || 1))}</div>
      </div>
    `;
  });
  itemsEl.innerHTML = html;

  const subtotal = getCartTotal(cart);
  subtotalEl.textContent = formatMXN(subtotal);

  if (shippingNoteEl) {
    const free = qualifiesForFreeNationalShipping(subtotal);
    const remaining = STORE.freeShippingThreshold - subtotal;
    shippingNoteEl.innerHTML = free
      ? '<strong>¡Envío nacional gratis!</strong> Tu compra califica desde $999.'
      : `Agrega ${formatMXN(remaining)} más para <strong>envío nacional gratis</strong>. Envío local en Colima y recoger en tienda disponibles.`;
  }

  function updateRow(row, item) {
    const qty = item.qty || 1;
    row.querySelector('.cart-item__qty span').textContent = qty;
    row.querySelector('.cart-item__price').textContent = `${formatMXN(item.price)} × ${qty}`;
    row.querySelector('.cart-item__total').textContent = formatMXN(item.price * qty);
    const total = getCartTotal(cart);
    subtotalEl.textContent = formatMXN(total);
    if (shippingNoteEl) {
      const free = qualifiesForFreeNationalShipping(total);
      const remaining = STORE.freeShippingThreshold - total;
      shippingNoteEl.innerHTML = free
        ? '<strong>¡Envío nacional gratis!</strong> Tu compra califica desde $999.'
        : `Agrega ${formatMXN(remaining)} más para <strong>envío nacional gratis</strong>.`;
    }
  }

  itemsEl.querySelectorAll('.cart-item').forEach(row => {
    const idx = parseInt(row.dataset.idx, 10);
    row.querySelector('[data-action="minus"]').addEventListener('click', () => {
      if (cart[idx].qty > 1) {
        cart[idx].qty--;
        saveCart(cart);
        updateRow(row, cart[idx]);
        if (typeof updateCartBadge === 'function') updateCartBadge();
      }
    });
    row.querySelector('[data-action="plus"]').addEventListener('click', () => {
      cart[idx].qty = (cart[idx].qty || 1) + 1;
      saveCart(cart);
      updateRow(row, cart[idx]);
      if (typeof updateCartBadge === 'function') updateCartBadge();
    });
    row.querySelector('[data-action="remove"]').addEventListener('click', () => {
      cart.splice(idx, 1);
      saveCart(cart);
      location.reload();
    });
  });
})();
