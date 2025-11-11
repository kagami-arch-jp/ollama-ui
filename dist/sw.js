self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('ollama_ui_cdn').then(function(cache) {
      return cache.addAll([
        'https://cdn.jsdelivr.net/'
      ]);
    })
  );
});
