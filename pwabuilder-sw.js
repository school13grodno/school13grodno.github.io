// This is the "Offline page" service worker
const CACHE = "room-of-military-glory_v1.2.1";
// TODO: replace the following with the correct offline fallback page
const _myAssets = [
	"index.html",
	"style.css",
	"scripts/script.js"
];

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

self.addEventListener('install', async (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => cache.addAll(_myAssets))
	);
});

self.addEventListener('activate', function(event) {
	caches.has('pwabuilde-page').then(function(hasCache) {
		if (!hasCache) {
			caches.delete(hasCache);
		} else {
			caches.open(CACHE).then(function(cache) {
				return cache.addAll(_myAssets);
			});
		}
	});
});

self.addEventListener('fetch', (event) => {
	if (event.request.mode === 'navigate') {
		event.respondWith((async () => {
			try {
				const preloadResp = await event.preloadResponse;

				if (preloadResp) {
					return preloadResp;
				}

				const networkResp = await fetch(event.request);
				return networkResp;
			} catch (error) {
				const cache = await caches.open(CACHE);
				/*const cachedResp = await cache.match(_offlineFallbackPage);*/
				return cache /*cachedResp*/;
			}
		})());
	}
});