const staticCachesName = 'uber-demo-site-static-v1';
const dynamicCache = 'uber-demo-site-dynamic-v1'

const assets = [
    '/',
    'https://npmcdn.com/leaflet@1.0.0-rc.1/dist/leaflet.css',
    '/static/js/bundle.js',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&family=Montserrat&display=swap',
    '/static/media/pexels-oleksandr-pidvalnyi-376729.f43eac866bcd4ef9e43e.jpg',
    '/static/media/pexels-pixabay-210182.d18e1b3f5c48d2376433.jpg',
    '/static/media/banner1.e3eb62015cc745513f9c.jpg',
    'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
    'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
    '/favicon.ico',
    '/android-chrome-192x192.png',
    '/login'
];

this.addEventListener("install",(evt)=>{
     
    // evt.waitUntil(
    //     caches.open(staticCachesName).then(cache => {
    //         cache.addAll(assets)
    //   })
    // )
    
})

this.addEventListener("activate",(event)=>{

    // event.waitUntil(
    //     caches.keys().then(keys => {
    //         return Promise.all(keys.filter(key => key !== staticCachesName).map(key => caches.delete(key)))
    //     })
    // )
})

this.addEventListener("fetch",(event)=>{
    // event.respondWith(
    //     caches.match(event.request).then(cacheRes => {
    //         return cacheRes || fetch(event.request)
    //     })
    // )
})


// .then(async(fetchResult) => {
//     return caches.open(dynamicCache).then(cache => {
//         cache.put(event.request.url , fetchResult.clone());
//         return fetchResult;
//     })
//  })