(function() {
  'use strict';
  const cart = getCart();
  const itemsEl = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  const emptyEl = document.getElementById('cart-empty');
  const subtotalEl = document.getElementById('cart-subtotal');

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
          <div class="cart-item__price">$${item.price.toLocaleString('es-MX')} MXN × ${item.qty || 1}</div>
          <div class="cart-item__qty">
            <button data-action="minus">−</button>
            <span>${item.qty || 1}</span>
            <button data-action="plus">+</button>
          </div>
          <button class="cart-item__remove" data-action="remove">Eliminar</button>
        </div>
        <div class="cart-item__total" style="font-weight: 600;">$${((item.price || 0) * (item.qty || 1)).toLocaleString('es-MX')} MXN</div>
      </div>
    `;
  });
  itemsEl.innerHTML = html;

  const total = getCartTotal(cart);
  subtotalEl.textContent = `$${total.toLocaleString('es-MX')} MXN`;

  function updateRow(row, item, idx) {
    const qty = item.qty || 1;
    const lineTotal = (item.price || 0) * qty;
    row.querySelector('.cart-item__qty span').textContent = qty;
    row.querySelector('.cart-item__price').textContent = `$${item.price.toLocaleString('es-MX')} MXN × ${qty}`;
    row.querySelector('.cart-item__total').textContent = `$${lineTotal.toLocaleString('es-MX')} MXN`;
    subtotalEl.textContent = `$${getCartTotal(cart).toLocaleString('es-MX')} MXN`;
  }

  itemsEl.querySelectorAll('.cart-item').forEach(row => {
    const idx = parseInt(row.dataset.idx, 10);
    const totalDiv = row.querySelector('div:last-child');
    if (totalDiv) totalDiv.classList.add('cart-item__total');
    row.querySelector('[data-action="minus"]').addEventListener('click', () => {
      if (cart[idx].qty > 1) {
        cart[idx].qty--;
        saveCart(cart);
        updateRow(row, cart[idx], idx);
        if (typeof updateCartBadge === 'function') updateCartBadge();
      }
    });
    row.querySelector('[data-action="plus"]').addEventListener('click', () => {
      cart[idx].qty = (cart[idx].qty || 1) + 1;
      saveCart(cart);
      updateRow(row, cart[idx], idx);
      if (typeof updateCartBadge === 'function') updateCartBadge();
    });
    row.querySelector('[data-action="remove"]').addEventListener('click', () => {
      cart.splice(idx, 1);
      saveCart(cart);
      location.reload();
    });
  });
})();
