var staticCacheName = 'restaurant-review-app';

self.addEventListener('install', function (event) {

  event.waitUntil(caches.open(staticCacheName).then(function (cache) {
    return cache.addAll([
        '/',
        '/js/main.js',
        '/js/dbhelper.js',
        '/css/reset.css',
        '/css/styles.css',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
    ]);
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.filter(function (cacheName) {
      return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
    }).map(function (cacheName) {
      return caches['delete'](cacheName);
    }));
  }));
});

self.addEventListener('fetch', function (event) {
  // TODO: respond to requests for the root page with
  // the page skeleton from the cache
  var requestUrl = new URL(event.request.url);


  if (requestUrl.origin = location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/'));
      return;
    }
  }

  event.respondWith(caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
  }));
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
