# Andrade-Schade in Porto

Private itinerary site for a Porto trip — editorial guide + interactive map.

## Run

```bash
npm install
npm run dev
```

## Stack

- React + Vite + TypeScript + Tailwind
- Leaflet / react-leaflet with CARTO basemap (no Google Maps API key)
- Google Maps only via deeplinks on click
- i18n: English, German, Portuguese

## Data

Edit [`src/data/itinerary.ts`](src/data/itinerary.ts) for stops and coordinates.
Edit [`src/i18n/locales/`](src/i18n/locales/) for copy in EN / DE / PT.
