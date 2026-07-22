// 这是 Service Worker 文件，负责缓存网页，实现离线访问
const CACHE_NAME = 'my-card-v1';
// 需要缓存的网页文件列表
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 当Service Worker被安装时，把上面的文件都存起来
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('已打开缓存');
        return cache.addAll(urlsToCache);
      })
  );
});

// 当网页发请求时，优先从缓存里拿。没有缓存才去联网
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存里有就直接用，没有就去网络拿
        return response || fetch(event.request);
      })
  );
});