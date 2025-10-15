// Give your cache a unique name (update this when you change files)
const CACHE_NAME = "simitech-designs-cache-v1";

// List of files you want cached for offline use
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles",
  "/scripts",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

// 🧱 INSTALL: Cache essential assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching files...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 🚀 ACTIVATE: Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activated");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// ⚡ FETCH: Serve from cache first, then network fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Found in cache
        return cachedResponse;
      }
      // Otherwise fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          // Cache the new response for next time
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Optionally return a fallback page for offline
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
