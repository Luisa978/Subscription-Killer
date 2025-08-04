import { checkSession, initLogin } from './auth.js';
import { renderTable, renderChart, setupUIEvents } from './ui.js';
import { initThemeToggle } from './theme.js';
import { setupExportEvents } from './export.js';
import { setupBackupListeners } from './backup.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkSession()) {
    initLogin();
  } else {
    renderTable();
    renderChart();
    initThemeToggle();
    setupUIEvents();
    setupExportEvents();
    setupBackupListeners();
  }

  // Detectar modo offline
  function updateOfflineStatus() {
    const warning = document.getElementById('offline-warning');
    if (!navigator.onLine) {
      warning.classList.remove('hidden');
    } else {
      warning.classList.add('hidden');
    }
  }

  window.addEventListener('online', updateOfflineStatus);
  window.addEventListener('offline', updateOfflineStatus);
  updateOfflineStatus(); // Verificação inicial
});
