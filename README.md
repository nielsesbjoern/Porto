# Andrade-Schade in Porto

Private itinerary site for a Porto trip — editorial guide + interactive map. Works **offline** as a PWA.

## Run

```bash
npm install
npm run dev
```

## Offline / production

```bash
npm run build
npm run preview
```

1. Open the site once **online** (production/`preview` — offline does not run in `dev`)
2. On iPhone: Safari → Share → **Add to Home Screen**
3. Tap **Save for offline** (caches all days + Retina map tiles)
4. Airplane mode: itinerary, stories, avatars, and cached map work

Place links open **Apple Maps** on iPhone; multi-stop walking tours use Google Maps. Location needs permission once.

## Stack

- React + Vite + TypeScript + Tailwind
- Leaflet / react-leaflet + CARTO (tiles cached by service worker)
- vite-plugin-pwa / Workbox
- i18n: English, German, Portuguese
