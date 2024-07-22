const CACHE_NAME = 'simple-pwa-v1';
const urlsToCache = [
    '/index.html',
    '/main.js',
    '/manifest.json',
    '/style.css',
    '/logo-192x192.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache).catch(error => {
                console.error('Failed to cache', error);
            });
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith('chrome-extension://')) {
        return; // Ignore chrome-extension requests
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // If request is in cache, return the cached version
            }
            return fetch(event.request).then(
                response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
