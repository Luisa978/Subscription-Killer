// js/backup.js

import { getSubscriptions, saveSubscriptions } from './storage.js';

export function backupData() {
  const data = getSubscriptions();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'subscription-backup.json';
  a.click();

  URL.revokeObjectURL(url);
  alert('Backup exported successfully!');
}

export function restoreData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const restoredData = JSON.parse(e.target.result);

      const confirmed = confirm('This will overwrite your current data. Continue?');
      if (confirmed && Array.isArray(restoredData)) {
        saveSubscriptions(restoredData);
        alert('Data restored successfully!');
        location.reload(); // reload to re-render table/chart
      } else {
        alert('Restore cancelled or invalid data.');
      }
    } catch (err) {
      alert('Invalid backup file.');
    }
  };

  reader.readAsText(file);
}
