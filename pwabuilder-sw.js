/* Versions service worker */
const _LATEST_VERSION = "room-of-military-glory_v1.4.2";
/* Resource cache */
const _ASSETS = [
	"/",
	"style.css",
	"scripts/script.js",
	"images/bg-img_lazy.gif",
	"images/bg-img.gif",
	"images/camera.svg",
	"images/close.svg",
	"images/document.svg",
	"images/double-arrow.svg",
	"images/expand.svg",
	"images/load.svg",
	"images/open-book.svg",
	"images/star.svg",
	"images/school-logo.png",
	"images/github.svg"
];
/* Install service worker */
self.addEventListener('install', async (event) => {
	event.waitUntil(
		caches.open(_LATEST_VERSION).then((cache) => {
			/* Add minimum resources */
			return cache.addAll(_ASSETS)
		}).catch((error) => console.log(error))
	);
	/* Skip waiting new update service working */
	self.skipWaiting();
});
/* Activate service worker */
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((names) => {
			for (let name of names) {
				if (name !== _LATEST_VERSION) {
					/* Delete previous version */
					caches.delete(name);
				}
			}
		})
	);
	/* Use updated service worker */
	self.clients.claim();
});
/* Use service worker */
self.addEventListener('fetch', (event) => {
	/* Skip cross-origin requests, like those for Google Analytics */
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then((resp) => {
				/* Return from cache if available
					else add to cache */
				return resp || fetch(event.request).then((response) => {
					let _responseClone = response.clone();
					caches.open(_LATEST_VERSION).then((cache) => {
						cache.put(event.request, _responseClone);
					});
					return response;
				});
			}).catch((error) => console.log(error))
		);
	}
});