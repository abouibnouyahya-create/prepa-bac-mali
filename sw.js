const CACHE_NAME = 'prepa-bac-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './data/renouveau-poetique.js',
    './images/icone-192.png'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Interception des requêtes pour servir le cache (hors-ligne)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si le fichier est dans le cache, on le renvoie
                if (response) {
                    return response;
                }
                // Sinon, on va le chercher sur internet
                return fetch(event.request);
            })
    );
});