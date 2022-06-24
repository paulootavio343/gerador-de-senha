var cacheName = 'gerador-de-senha-cache-v4';
var urlsToCache = [
    '/',
    '/index.html',
    '/site.webmanifest',
    '/assets/js/password-generator-code.js',
    '/assets/js/service-worker-registration.js',
    '/assets/css/password-generator-style.css',
    '/assets/fonts/Roboto/Roboto-Regular.ttf',
    '/assets/fonts/Roboto/LICENSE.txt',
    '/assets/icons/close_black_24dp.svg',
    '/assets/icons/content_copy_black_24dp.svg',
    '/assets/icons/home_black_24dp.svg',
    '/assets/icons/about.txt',
];

self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    // Remove old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // Cache and network fallback
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
});
