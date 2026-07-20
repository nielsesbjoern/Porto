import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.png",
        "favicon-32.png",
        "favicon-64.png",
        "apple-touch-icon.png",
        "icons.svg",
        "avatars/*.png",
        "avatars/*.jpg",
        "avatars/clara-squat/*.jpg",
        "icons/*.png",
      ],
      manifest: {
        name: "Andrade-Schade in Porto",
        short_name: "Porto",
        description:
          "Andrade-Schade in Porto — two mornings on the Douro. Works offline.",
        theme_color: "#0c5c7a",
        background_color: "#f4f7f8",
        display: "standalone",
        orientation: "any",
        start_url: "/",
        scope: "/",
        lang: "en",
        categories: ["travel", "lifestyle"],
        icons: [
          {
            src: "icons/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/pwa-maskable-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/pwa-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // App shell + fonts + images
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2,webp}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
        // Keep SW lean but complete for this itinerary app
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            // CARTO / OSM basemap tiles — CacheFirst so visited areas work offline
            urlPattern: ({ url }) =>
              url.hostname.endsWith("basemaps.cartocdn.com") ||
              url.hostname.endsWith("cartocdn.com"),
            handler: "CacheFirst",
            options: {
              cacheName: "porto-map-tiles",
              expiration: {
                maxEntries: 2500,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Any remaining same-origin assets
            urlPattern: ({ request, sameOrigin }) =>
              sameOrigin &&
              (request.destination === "image" ||
                request.destination === "font" ||
                request.destination === "style" ||
                request.destination === "script"),
            handler: "CacheFirst",
            options: {
              cacheName: "porto-static",
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 90,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  build: {
    target: "es2022",
  },
});
