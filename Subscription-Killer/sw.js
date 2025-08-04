// sw.js

const CACHE_NAME = 'subscription-killer-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/js/main.js',
  '/js/auth.js',
  '/js/ui.js',
  '/js/chart.js',
  '/js/export.js',
  '/js/backup.js',
  '/js/theme.js',
  '/js/storage.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/chart.js' // se estiver usando CDN
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets...');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Ativa o Service Worker e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições e serve do cache quando offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Retorna do cache, ou busca na rede e atualiza o cache
      return (
        cachedResponse ||
        fetch(event.request)
          .then(response => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
          .catch(() => {
            // Se estiver offline e falhar, retorna página fallback (opcional)
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          })
      );
    })
  );
});
