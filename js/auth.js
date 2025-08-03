// js/auth.js

const SESSION_KEY = 'user_session';
const DEFAULT_USER = { username: 'admin', password: 'admin' };
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

export function checkLogin() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!session || Date.now() > session.expiresAt) {
    return false;
  }
  return true;
}

export function getUsername() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  return session?.username || '';
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  location.reload();
}

export function login(username) {
  const expiresAt = Date.now() + SESSION_DURATION;
  const session = { username, expiresAt };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function initLogin() {
  const loginSection = document.getElementById('login-section');
  const loginForm = document.getElementById('login-form');

  loginSection.style.display = 'block';
  document.querySelectorAll('main > section:not(#login-section)').forEach(el => el.style.display = 'none');
  document.querySelector('header').style.display = 'none';
  document.querySelector('footer').style.display = 'none';

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username === DEFAULT_USER.username && password === DEFAULT_USER.password) {
      login(username);
      location.reload(); // Recarrega a página para reativar main.js
    } else {
      alert('Invalid credentials. Try "admin" / "admin".');
    }
  });
}
