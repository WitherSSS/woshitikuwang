const CACHE_NAME = 'my-app-cache';

const urlsToCache = [
  '/',
  '/index.html',
  '/timu.html',
  '/type.html',
  '/css/fonts/ionicons.ttf',
  '/css/fonts/ionicons.woff',
  '/css/fonts/ionicons.woff2',
  '/js/axios.min.js',
  '/js/iview.min.js',
  '/js/public.js',
  '/js/vue.min.js',
  '/json/安规(变电).json',
  '/json/传统知识竞赛.json',
  '/json/廉洁初赛.json',
  './images/icon-192.png',
  './images/icon-128.png',
  './images/icon-512.png'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    ))
  );
});