// js/ui.js

import { getSubscriptions, deleteSubscription } from './storage.js';
import { updateChart } from './chart.js';

export function renderTable(filtered = []) {
  const subscriptions = filtered.length ? filtered : getSubscriptions();
  const tbody = document.getElementById('subscription-table-body');
  tbody.innerHTML = '';

  subscriptions.forEach((sub, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${sub.name}</td>
      <td>$${sub.amount.toFixed(2)}</td>
      <td>${sub.frequency}</td>
      <td>${sub.nextPayment}</td>
      <td><button class="delete-btn" data-index="${index}">🗑️</button></td>
    `;

    tbody.appendChild(tr);
  });

  // Attach delete event
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.target.getAttribute('data-index');
      deleteSubscription(idx);
      renderTable();
      updateChart();
    });
  });
}

export function filterSubscriptions(e) {
  const query = e.target.value.toLowerCase();
  const filtered = getSubscriptions().filter(sub =>
    sub.name.toLowerCase().includes(query)
  );
  renderTable(filtered);
}

export function initAdvancedFilters() {
  // Aqui você pode adicionar lógica de filtro por data, tipo, etc futuramente
  // Exemplo:
  // document.getElementById('filter-date').addEventListener('change', ...)
}

let currentSort = { column: null, ascending: true };

export function setupTableSorting() {
  const headers = document.querySelectorAll('#subscription-table th');
  headers.forEach((th, index) => {
    if (index >= 0 && index <= 3) {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const column = th.textContent.trim().toLowerCase();
        sortTableByColumn(column);
      });
    }
  });
}

function sortTableByColumn(column) {
  const rows = Array.from(document.querySelectorAll('#subscription-table-body tr'));
  const colMap = {
    name: 0,
    amount: 1,
    frequency: 2,
    'next payment': 3
  };

  const colIndex = colMap[column];
  const ascending = currentSort.column === column ? !currentSort.ascending : true;

  rows.sort((a, b) => {
    const aText = a.children[colIndex].textContent.trim();
    const bText = b.children[colIndex].textContent.trim();

    if (colIndex === 1) return ascending ? parseFloat(aText.slice(1)) - parseFloat(bText.slice(1)) : parseFloat(bText.slice(1)) - parseFloat(aText.slice(1));
    if (colIndex === 3) return ascending ? new Date(aText) - new Date(bText) : new Date(bText) - new Date(aText);
    return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
  });

  const tbody = document.getElementById('subscription-table-body');
  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));

  currentSort = { column, ascending };
}
