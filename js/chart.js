// js/chart.js

import { getSubscriptions } from './storage.js';

let chartInstance;

export function updateChart() {
  const subscriptions = getSubscriptions();

  // Agrupar por categoria (frequência ou nome)
  const monthly = subscriptions.filter(sub => sub.frequency.toLowerCase() === 'monthly');
  const yearly = subscriptions.filter(sub => sub.frequency.toLowerCase() === 'yearly');

  const labels = ['Monthly', 'Yearly'];
  const data = [monthly.length, yearly.length];

  const ctx = document.getElementById('subscription-chart').getContext('2d');

  // Se já existir um gráfico, destruir antes de criar outro
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ['#4e79a7', '#f28e2c'],
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Subscriptions by Frequency',
          font: { size: 18 }
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
