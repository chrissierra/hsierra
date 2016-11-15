this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v6').then(function(cache) {
      return cache.addAll([
        "db.html",
        "peo.html"
        
        
       
      ]);
    })
  );
});


this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        caches.open('v6').then(function(cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(function() {
      return caches.match('peo.html');
    })
  );
});

this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v6'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
new Response('Hello from your friendly neighbourhood service worker!');