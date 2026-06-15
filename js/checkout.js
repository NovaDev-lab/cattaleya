(function() {
  'use strict';

  const cart = getCart();
  const redirectEl = document.getElementById('checkout-redirect');
  const contentEl = document.getElementById('checkout-content');
  const paymentEl = document.getElementById('payment-step');
  const summaryEl = document.getElementById('checkout-summary');
  const refEl = document.getElementById('ref-number');
  const addressFields = document.getElementById('address-fields');
  const contactFields = document.getElementById('contact-fields');

  if (cart.length === 0) {
    redirectEl.style.display = 'block';
    return;
  }

  redirectEl.style.display = 'none';
  contentEl.style.display = 'grid';

  const ref = 'CAT-' + Date.now();
  refEl.textContent = ref;

  function getDeliveryType() {
    return document.querySelector('input[name="delivery"]:checked').value;
  }

  function renderSummary() {
    const delivery = getDeliveryType();
    const subtotal = getCartTotal(cart);
    const shipping = getShippingCost(delivery, subtotal);
    const total = subtotal + shipping;

    let html = '<h3>Resumen</h3>';
    cart.forEach(i => {
      html += `<div class="checkout-item"><span>${i.name} × ${i.qty || 1}</span><span>${formatMXN((i.price || 0) * (i.qty || 1))}</span></div>`;
    });
    html += `<div class="checkout-item"><span>Subtotal</span><span>${formatMXN(subtotal)}</span></div>`;
    html += `<div class="checkout-item"><span>Envío</span><span>${shipping === 0 ? 'Gratis' : formatMXN(shipping)}</span></div>`;
    html += `<div class="checkout-total">Total: ${formatMXN(total)}</div>`;
    html += `<p class="shipping-note">${getShippingLabel(delivery, subtotal)}</p>`;
    summaryEl.innerHTML = html;
    return { subtotal, shipping, total, delivery };
  }

  function updateFormVisibility() {
    const delivery = getDeliveryType();
    const needsAddress = delivery === 'nacional' || delivery === 'local-colima';
    addressFields.style.display = needsAddress ? 'block' : 'none';
    contactFields.style.display = delivery === 'tienda' ? 'block' : 'none';

    addressFields.querySelectorAll('input, textarea').forEach(inp => {
      inp.required = needsAddress;
    });
    contactFields.querySelectorAll('input').forEach(inp => {
      inp.required = delivery === 'tienda';
    });
  }

  document.querySelectorAll('input[name="delivery"]').forEach(r => {
    r.addEventListener('change', () => {
      updateFormVisibility();
      renderSummary();
    });
  });

  updateFormVisibility();
  renderSummary();

  document.getElementById('btn-pagar').addEventListener('click', () => {
    const delivery = getDeliveryType();
    const totals = renderSummary();

    if (delivery === 'nacional' || delivery === 'local-colima') {
      const fields = ['checkout-name', 'checkout-phone', 'checkout-email', 'checkout-calle', 'checkout-colonia', 'checkout-cp', 'checkout-ciudad', 'checkout-estado'];
      const missing = fields.filter(id => !document.getElementById(id).value.trim());
      if (missing.length) {
        alert('Completa todos los campos obligatorios de envío (marcados con *).');
        document.getElementById(missing[0]).focus();
        return;
      }
    }

    if (delivery === 'tienda') {
      const contactIds = ['pickup-name', 'pickup-phone'];
      const missing = contactIds.filter(id => !document.getElementById(id).value.trim());
      if (missing.length) {
        alert('Indica tu nombre y teléfono para preparar tu pedido en tienda.');
        document.getElementById(missing[0]).focus();
        return;
      }
    }

    const payment = document.querySelector('input[name="payment"]:checked').value;
    contentEl.style.display = 'none';
    paymentEl.style.display = 'block';

    const paymentTitle = document.getElementById('payment-title');
    const paymentDesc = document.getElementById('payment-desc');
    const transferBlock = document.getElementById('transfer-block');
    const storeBlock = document.getElementById('store-payment-block');
    const cardBlock = document.getElementById('card-payment-block');

    transferBlock.style.display = 'none';
    storeBlock.style.display = 'none';
    cardBlock.style.display = 'none';

    if (payment === 'transferencia') {
      paymentTitle.textContent = 'Transferencia bancaria';
      paymentDesc.textContent = 'Realiza tu pago a la siguiente CLABE. En Shopify este paso se automatizará.';
      transferBlock.style.display = 'block';
    } else if (payment === 'tienda') {
      paymentTitle.textContent = 'Pago en tienda';
      paymentDesc.textContent = 'Tu pedido quedará reservado. Paga al recoger en Av. Tecnológico #9 interior 2, Colima.';
      storeBlock.style.display = 'block';
    } else {
      paymentTitle.textContent = 'Pago con tarjeta';
      paymentDesc.textContent = 'En la tienda Shopify finalizarás el pago con tarjeta de forma segura.';
      cardBlock.style.display = 'block';
    }

    document.getElementById('payment-total').textContent = formatMXN(totals.total);
    document.getElementById('payment-ref').textContent = ref;
  });

  document.getElementById('copy-clabe').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('clabe-number').textContent);
    alert('CLABE copiada');
  });

  document.getElementById('btn-generar-ticket').addEventListener('click', () => {
    const delivery = getDeliveryType();
    const totals = renderSummary();
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const ticket = generateTicket(cart, totals, ref, delivery, payment);
    const w = window.open('', '_blank');
    w.document.write(ticket);
    w.document.close();
    w.print();
  });
})();

function generateTicket(cart, totals, ref, delivery, payment) {
  const date = new Date().toLocaleString('es-MX');
  const deliveryLabels = {
    nacional: 'Envío a domicilio (República Mexicana)',
    'local-colima': 'Envío local Colima',
    tienda: 'Recoger en tienda'
  };
  const paymentLabels = {
    transferencia: 'Transferencia bancaria',
    tienda: 'Efectivo o transferencia en tienda',
    tarjeta: 'Tarjeta (Shopify)'
  };
  let items = '';
  cart.forEach(i => {
    items += `<tr><td>${i.name}</td><td>${i.qty || 1}</td><td>${formatMXN(i.price * (i.qty || 1))}</td></tr>`;
  });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Ticket Cattaleya</title>
  <style>body{font-family:sans-serif;max-width:400px;margin:20px auto;padding:20px}
  table{width:100%;border-collapse:collapse}td,th{padding:8px;border-bottom:1px solid #eee;text-align:left}
  .header{text-align:center;margin-bottom:20px}.total{font-size:1.2em;font-weight:bold;margin-top:15px}
  .ref{background:#f5f5f5;padding:10px;margin:10px 0}</style></head><body>
  <div class="header"><h1>Cattaleya Joyería</h1><p>Av. Tecnológico #9 interior 2<br>Lomas Vista Hermosa, 28016 Colima, Col.</p></div>
  <p><strong>Fecha:</strong> ${date}</p>
  <p class="ref"><strong>Referencia:</strong> ${ref}</p>
  <p><strong>Entrega:</strong> ${deliveryLabels[delivery] || delivery}</p>
  <p><strong>Pago:</strong> ${paymentLabels[payment] || payment}</p>
  <table><tr><th>Producto</th><th>Cant</th><th>Total</th></tr>${items}</table>
  <p>Subtotal: ${formatMXN(totals.subtotal)}</p>
  <p>Envío: ${totals.shipping === 0 ? 'Gratis' : formatMXN(totals.shipping)}</p>
  <div class="total">Total: ${formatMXN(totals.total)}</div>
  ${payment === 'transferencia' ? '<p style="margin-top:20px;font-size:0.9em;color:#666">Transferencia a CLABE: 0121800012345678901234</p>' : ''}
  <p style="margin-top:10px;font-size:0.85em">Gracias por tu compra</p>
  </body></html>`;
}
