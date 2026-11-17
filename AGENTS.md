# Personal site (Eleventy)

- Dev server: `npm run start:local` (http://localhost:8080). Build: `npm run build` (src -> public).
- Videos live in `src/assets/videos/` but are gitignored (too large for GitHub / Cloudflare Pages' 25 MiB file limit).
  They are hosted in the R2 bucket `laiyiohlsen-media`, served at `https://media.laiyiohlsen.com`.
  Reference them in templates as `{{ media.url }}/videos/...` (see `src/_data/media.js`: local `/assets` when serving, R2 URL in builds, override with `MEDIA_URL`).
  Upload new/changed videos with `scripts/upload-media.sh`.
- Dance page: `src/sections/dance.njk`. Clips are `src/assets/videos/dance/dance-NN.mp4` with Quick Look thumbnails in
  `src/assets/images/dance/dance-NN.png` (`qlmanage -t -s 160`). The clip list comes from the thumbnails (`src/_data/danceClips.js`): to remove a clip, delete its video, its thumbnail, and its R2 object.
- Full guide to the R2 media setup (uploading, deleting, adding/removing dance clips): `docs/r2-media.md`.
- Images: write plain `<img src="/assets/images/...">` or markdown images; a transform in `.eleventy.js` (`responsiveImages`) swaps them for resized WebP copies in `/img/` (content-hashed names, cached for a year via `src/_headers`). Pass `sizes="..."` on small thumbnails. jQuery/Lightbox load only on Art pages (`{% block head %}` in `projects.njk`/`project.njk`).
- `unused-media/`: images/videos no page uses, kept for later (outside `src/`, so not published or uploaded). Its `videos/` is gitignored like `src/assets/videos/`; those videos are still in R2 under `videos/`.
