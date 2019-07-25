const cacheName = 'resturant';

// install event
self.addEventListener('install', e => {
  console.log('Service Worker Installed');
});

//Activate Event
self.addEventListener('activate', e => {

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Deleting old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
        cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
