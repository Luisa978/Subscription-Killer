// js/export.js

import { getSubscriptions, saveSubscriptions } from './storage.js';

export function exportCSV() {
  const data = getSubscriptions();
  if (data.length === 0) return alert('No subscriptions to export.');

  const headers = ['Name', 'Amount', 'Frequency', 'Next Payment'];
  const rows = data.map(sub =>
    [sub.name, sub.amount, sub.frequency, sub.nextPayment].join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'subscriptions.csv');
  link.click();
}

export function backupData() {
  const data = getSubscriptions();
  if (data.length === 0) return alert('No data to backup.');

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `subscription_backup_${new Date().toISOString()}.json`;
  link.click();
}

export function restoreData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedData = JSON.parse(e.target.result);

      if (!Array.isArray(importedData)) {
        throw new Error('Invalid backup format');
      }

      const confirmRestore = confirm('Do you want to replace your current data with this backup?');
      if (confirmRestore) {
        saveSubscriptions(importedData);
        alert('Data restored successfully!');
        location.reload();
      }
    } catch (err) {
      alert('Failed to restore: Invalid file format.');
      console.error(err);
    }
  };
  reader.readAsText(file);
}
