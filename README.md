# Kaidi Kitchen — cinematic restaurant demo

React + Vite + Tailwind CSS + GSAP / ScrollTrigger.

## Run

```bash
npm install
npm run dev
```

## Replace the content

- Add the optional scroll-scrubbed cinematic video at `public/videos/kaidi-kitchen.mp4`. The hero automatically uses it when available and falls back to the generated scene images when it is not.
- Replace phone, address, hours and email in `src/main.jsx`.
- Menu content and pricing live in the `menuItems` array at the top of `src/main.jsx`.
- Gallery content lives in `galleryItems` at the top of `src/main.jsx`.
- Generated image assets are in `public/images` and are intentionally compressed JPEGs for a faster first load.

The hero respects `prefers-reduced-motion`, uses a pinned GSAP timeline for the cinematic entrance, and switches to a simplified mobile layout with touch-friendly controls.
