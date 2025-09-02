const CACHE_NAME = 'cashclub-v1';
const CORE_ASSETS = [
	'/',
	'/index.html',
	'/assets/css/styles.css',
	'/assets/js/main.js'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined)))).then(() => self.clients.claim())
	);
});

// Cache-first for images, network-first for others
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);
	if (request.destination === 'image' || /\.(?:jpe?g|png|gif|webp)$/i.test(url.pathname)) {
		event.respondWith(
			caches.open(CACHE_NAME).then(async (cache) => {
				const cached = await cache.match(request);
				const network = fetch(request).then((resp) => {
					if (resp && resp.status === 200) cache.put(request, resp.clone());
					return resp;
				});
				return cached || network;
			})
		);
		return;
	}
	// network-first for HTML/JS/CSS
	event.respondWith(
		fetch(request).then((resp) => {
			const copy = resp.clone();
			caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
			return resp;
		}).catch(() => caches.match(request))
	);
});


