# Zorgoball’s Emporium of Electrical Madness

Joshua Lilly’s public portfolio, published at https://zorgoball.github.io/zorgoball-emporium/.

## Local preview

Serve this directory with a static HTTP server (for example, `python -m http.server 8765`) and open http://localhost:8765. There are no package dependencies or build steps.

## Experience

- Laser Pup opening exhibit: muted H.264 loop, extracted poster, pause control, offscreen pause, and reduced-motion support.
- App showcases with official App Store screenshots and direct product links.
- Original practice prompts inspired by the purpose of Ask Euterpe; these are website prompts, not a claim to reproduce the app’s prompt library.
- Music previews: one audio player, explicit play controls, no autoplay, and playback-error fallbacks.
- Temporary Madness color switch and subtle pointer-responsive exhibits.
- Responsive layouts, semantic navigation, keyboard focus, and a skip link.

## Assets and sources

`assets/laser-pup-hero.mp4` is a web-optimized version of the owner-supplied `2-LaserPup.mp4`; `laser-pup-poster.jpg` is a frame from that video. The previous original video and legacy poster remain in the repository but are not used by the page.

App icons and screenshots were retrieved from Apple’s public iTunes lookup API for the owner’s developer ID 1867003089. App IDs: Rome 6761012792, Ask Euterpe 6757444076, The Greatest Generation 6797933883.

Album artwork and preview metadata were retrieved from the same API. `assets/music.json` preserves track titles, artists, preview URLs, and Apple Music destination URLs. Audio streams directly from Apple; it is not rehosted.

The book cover comes from the owner’s Amazon listing, ASIN B0DMPJH2ZZ. A sample spread and a guitar recording have not been supplied; neither is fabricated.

## Publication

Push the validated static files to the repository’s configured GitHub Pages branch. Relative asset paths support the `/zorgoball-emporium/` project URL. No hosting migration is needed.
