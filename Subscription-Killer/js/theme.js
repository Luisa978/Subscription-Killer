// js/theme.js

export function initThemeToggle() {
  const toggleButton = document.getElementById('theme-toggle');

  if (!toggleButton) return;

  // Aplica o tema salvo no carregamento
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Evento de clique para alternar tema
  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
