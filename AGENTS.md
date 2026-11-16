# Personal site (Eleventy)

- Dev server: `npm run start:local` (http://localhost:8080). Build: `npm run build` (src -> public).
- Videos live in `src/assets/videos/` but are gitignored (too large for GitHub / Cloudflare Pages' 25 MiB file limit).
  They are hosted in the R2 bucket `laiyiohlsen-media`, served at `https://media.laiyiohlsen.com`.
  Reference them in templates as `{{ media.url }}/videos/...` (see `src/_data/media.js`: local `/assets` when serving, R2 URL in builds, override with `MEDIA_URL`).
  Upload new/changed videos with `scripts/upload-media.sh`.
- Dance page: `src/sections/dance.njk`. Clips are `src/assets/videos/dance/dance-NN.mp4` with Quick Look thumbnails in
  `src/assets/images/dance/dance-NN.png` (`qlmanage -t -s 160`); update `clips:` in the front matter when the count changes.
