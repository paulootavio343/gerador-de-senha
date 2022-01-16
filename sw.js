var CACHE_NAME = 'gerador-de-senha-cache-v3';
var urlsToCache = [
    '/',
    '/index.html',
    '/assets/js/password-generator-code.js',
    '/assets/js/service-worker-registration.js',
    '/assets/css/password-generator-style.css',
    '/site.webmanifest',
    '/assets/fonts/Roboto/Roboto-Regular.ttf',
    '/assets/fonts/Roboto/LICENSE.txt',
    '/assets/icons/close_black_24dp.svg',
    '/assets/icons/content_copy_black_24dp.svg',
    '/assets/icons/about.txt',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

self.addEventListener('activate', function (event) {

    var cacheAllowlist = ['gerador-de-senha-cache-v3'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});