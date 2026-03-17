(function() {
  'use strict';

  const cart = getCart();
  const redirectEl = document.getElementById('checkout-redirect');
  const contentEl = document.getElementById('checkout-content');
  const paymentEl = document.getElementById('payment-step');
  const summaryEl = document.getElementById('checkout-summary');
  const refEl = document.getElementById('ref-number');

  if (cart.length === 0) {
    redirectEl.style.display = 'block';
    return;
  }

  redirectEl.style.display = 'none';
  contentEl.style.display = 'grid';

  const total = getCartTotal(cart);
  const ref = 'CAT-' + Date.now();

  let html = '<h3>Resumen</h3>';
  cart.forEach(i => {
    html += `<div class="checkout-item"><span>${i.name} × ${i.qty || 1}</span><span>$${((i.price || 0) * (i.qty || 1)).toLocaleString('es-MX')}</span></div>`;
  });
  html += `<div class="checkout-total">Total: $${total.toLocaleString('es-MX')} MXN</div>`;
  summaryEl.innerHTML = html;

  refEl.textContent = ref;

  const addressFields = document.getElementById('address-fields');
  const addressInputs = addressFields.querySelectorAll('input');
  document.querySelectorAll('input[name="delivery"]').forEach(r => {
    r.addEventListener('change', () => {
      const isEnvio = r.value === 'envio';
      addressFields.style.display = isEnvio ? 'block' : 'none';
      addressInputs.forEach(inp => inp.required = isEnvio);
    });
  });

  document.getElementById('btn-pagar').addEventListener('click', () => {
    const delivery = document.querySelector('input[name="delivery"]:checked').value;
    if (delivery === 'envio') {
      const fields = ['checkout-name', 'checkout-phone', 'checkout-email', 'checkout-calle', 'checkout-colonia', 'checkout-cp', 'checkout-ciudad', 'checkout-estado'];
      const missing = fields.filter(id => !document.getElementById(id).value.trim());
      if (missing.length) {
        alert('Completa todos los campos obligatorios de envío (marcados con *).');
        document.getElementById(missing[0]).focus();
        return;
      }
    }
    contentEl.style.display = 'none';
    paymentEl.style.display = 'block';
  });

  document.getElementById('copy-clabe').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('clabe-number').textContent);
    alert('CLABE copiada');
  });

  document.getElementById('btn-generar-ticket').addEventListener('click', () => {
    const ticket = generateTicket(cart, total, ref);
    const w = window.open('', '_blank');
    w.document.write(ticket);
    w.document.close();
    w.print();
  });
})();

function generateTicket(cart, total, ref) {
  const date = new Date().toLocaleString('es-MX');
  let items = '';
  cart.forEach(i => {
    items += `<tr><td>${i.name}</td><td>${i.qty || 1}</td><td>$${(i.price * (i.qty || 1)).toLocaleString('es-MX')}</td></tr>`;
  });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Ticket Cattaleya</title>
  <style>body{font-family:sans-serif;max-width:400px;margin:20px auto;padding:20px}
  table{width:100%;border-collapse:collapse}td{padding:8px;border-bottom:1px solid #eee}
  .header{text-align:center;margin-bottom:20px}.total{font-size:1.2em;font-weight:bold;margin-top:15px}
  .ref{background:#f5f5f5;padding:10px;margin:10px 0}</style></head><body>
  <div class="header"><h1>Cattaleya Joyería</h1><p>Av. Tecnológico #9 interior 2<br>Lomas Vista Hermosa, 28016 Colima, Col.</p></div>
  <p><strong>Fecha:</strong> ${date}</p>
  <p class="ref"><strong>Referencia:</strong> ${ref}</p>
  <table><tr><th>Producto</th><th>Cant</th><th>Total</th></tr>${items}</table>
  <div class="total">Total: $${total.toLocaleString('es-MX')} MXN</div>
  <p style="margin-top:20px;font-size:0.9em;color:#666">Transferencia a CLABE: 0121800012345678901234</p>
  <p style="margin-top:10px;font-size:0.85em">Gracias por tu compra</p>
  </body></html>`;
}
