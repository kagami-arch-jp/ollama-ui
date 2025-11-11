const files=<?js echo(JSON.stringify(CDN_FILES)) ?>;

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('cdn12').then(function(cache) {
      return cache.addAll(files);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (files.find(x=>x===request.url)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  }

});
