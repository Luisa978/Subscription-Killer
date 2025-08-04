# Subscription Killer PWA

**Subscription Killer** is a modern, offline-capable, installable web app (PWA) that helps users track, manage, and export their subscriptions with ease.

---

## 📦 Features

- 📊 Subscription table with sorting and filtering
- 📅 Dynamic chart by frequency (monthly, yearly)
- 🌙 Light/Dark mode with elegant transitions
- 🎨 Clean responsive UI (mobile/tablet/desktop)
- 🔐 Simulated login with LocalStorage session
- 🧾 Export to CSV
- 💾 Backup and restore with preview
- 🔌 Offline mode detection
- 📲 Installable PWA with service worker and manifest

---

## 🛠️ Project Structure

subscription-killer-pwa/
├── index.html
├── styles.css
├── manifest.json
├── sw.js
├── icons/
│ ├── icon-192x192.png
│ └── icon-512x512.png
├── js/
│ ├── main.js
│ ├── auth.js
│ ├── ui.js
│ ├── chart.js
│ ├── export.js
│ ├── backup.js
│ ├── storage.js
│ └── theme.js
---

## 🚀 How to Use

1. Clone/download the project.
2. Open `index.html` directly in a browser *(for local use)*.
3. To simulate login, enter any username and click "Login".
4. Start managing your subscriptions.
5. You can export data, back it up, and restore with ease.

---

## 📲 Install as PWA

- Click the install icon in the browser (if available).
- Or go to Chrome on mobile → Menu → "Add to Home screen".
- Works offline thanks to Service Worker caching.

---

## 🧪 Testing Offline

1. Open the app in your browser.
2. Disconnect from the internet.
3. Use DevTools → Network tab → "Offline".
4. The app will continue to function, and an offline banner will appear.

---

## 🧰 Technologies Used

- HTML, CSS, JavaScript (Vanilla)
- Chart.js (for dynamic charts)
- LocalStorage
- Service Worker + Web App Manifest
- PWA standards and best practices

---

## ✅ To Do / Improvements (v2)

- 👤 Multi-user local profiles
- 🔔 Recurring notifications
- 💱 Multiple currency support
- ☁️ Optional cloud sync/export
