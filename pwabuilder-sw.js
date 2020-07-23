// Versions service worker
const _LATEST_VERSION = "room-of-military-glory_v1.3.0";
const _PREVIOUS_VERSION = "room-of-military-glory_v1.2.3";
// Resource cache
const _ASSETS = [
	"/",
	"style.css",
	"scripts/script.js",
	"images/bg-img--lazy.gif",
	"images/bg-img.gif",
	"images/camera.svg",
	"images/close.svg",
	"images/document.svg",
	"images/double-arrow.svg",
	"images/expand.svg",
	"images/load.svg",
	"images/open-book.svg",
	"images/star.svg"
];

self.addEventListener('install', async (event) => {
	event.waitUntil(
		caches.open(_LATEST_VERSION).then((cache) => {
			return cache.addAll(_ASSETS)
		}).catch((error) => console.log(error))
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.has(_PREVIOUS_VERSION).then((hasCache) => {
			if (hasCache) {
				caches.delete(_PREVIOUS_VERSION);
			}
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((resp) => {
			return resp || fetch(event.request).then((response) => {
				let _responseClone = response.clone();
				caches.open(_LATEST_VERSION).then((cache) => {
					cache.put(event.request, _responseClone);
				});
				return response;
			});
		}).catch((error) => console.log(error))
	);
});