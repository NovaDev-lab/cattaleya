(function() {
  'use strict';

  const user = getUser();
  const loggedOut = document.getElementById('cuenta-loggedout');
  const loggedIn = document.getElementById('cuenta-loggedin');

  if (user) {
    loggedOut.style.display = 'none';
    loggedIn.style.display = 'block';
    document.getElementById('user-name').textContent = user.name || user.email;
    document.getElementById('btn-logout').addEventListener('click', () => {
      if (confirm('¿Cerrar sesión?')) {
        saveUser(null);
        location.reload();
      }
    });
    return;
  }

  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('form-login').style.display = tab.dataset.tab === 'login' ? 'block' : 'none';
      document.getElementById('form-register').style.display = tab.dataset.tab === 'register' ? 'block' : 'none';
    });
  });

  document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const stored = localStorage.getItem('cattaleya_users');
    const users = stored ? JSON.parse(stored) : {};
    if (users[email]) {
      saveUser(users[email]);
      location.reload();
    } else {
      alert('Usuario no registrado. Regístrate primero.');
    }
  });

  document.getElementById('form-register').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const users = JSON.parse(localStorage.getItem('cattaleya_users') || '{}');
    users[email] = { name, email };
    localStorage.setItem('cattaleya_users', JSON.stringify(users));
    saveUser(users[email]);
    location.reload();
  });
})();
