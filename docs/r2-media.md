# How the R2 media bucket works

R2 is Cloudflare's file storage. The bucket `laiyiohlsen-media` holds the site's videos and serves them to browsers.
It is separate from the website code, so large videos never go through GitHub.

## What's in it

Files use the same paths as in `src/assets/`:

```
laiyiohlsen-media/
  videos/suns.mp4
  videos/chinatown.mov, oxford.mov, strike.mov   (not used by any page)
  videos/dance/dance-01.mp4 … dance-56.mp4       (except dance-47, which was removed)
```

R2 has no real folders. `videos/dance/dance-01.mp4` is just the file's name, slashes included, but it behaves like folders.

## How browsers reach it

- `media.laiyiohlsen.com` is connected to the bucket in the Cloudflare dashboard (R2 → bucket → Settings → Custom Domains).
- A request for `https://media.laiyiohlsen.com/videos/dance/dance-01.mp4` returns the file stored as `videos/dance/dance-01.mp4`.
- Anyone with a link can view a file. Only you, logged in with wrangler or the dashboard, can add or delete files.
- R2 supports partial requests, so browsers load videos in chunks as they play and can skip ahead without downloading the whole file.

## How the site connects to it

Templates write video addresses as `{{ media.url }}/videos/...`. `src/_data/media.js` decides what `media.url` is:

| Mode | `media.url` | Videos load from |
| --- | --- | --- |
| `npm start` (dev server) | `/assets` | local `src/assets/videos/` |
| Any build, including Cloudflare's deploy | `https://media.laiyiohlsen.com` | R2 |

Setting a `MEDIA_URL` environment variable overrides both.

The local and R2 copies are independent:

- Changing a local video doesn't change the live site until you upload it.
- Deleting a video locally doesn't remove it from R2.

Videos are excluded from git (`.gitignore`), so pushing never sends them.

## Managing files

**Upload or replace.** Run this from the repo root:

```
scripts/upload-media.sh
```

It uploads everything in `src/assets/videos/` with the right file type and replaces existing copies. The first run opens a browser to log in to Cloudflare.

**Delete:**

```
npx wrangler@4.158.0 r2 object delete laiyiohlsen-media/videos/dance/dance-NN.mp4 --remote
```

You can also delete files in the dashboard under R2 → `laiyiohlsen-media`.

**Browse.** The dashboard lists every file with its size and upload date.

## Dance clips

The Dance page builds its clip list from the thumbnails in `src/assets/images/dance/` (see `src/_data/danceClips.js`).

**Add a clip:**

1. Put the video in `src/assets/videos/dance/` as `dance-NN.mp4`.
2. Make its thumbnail. Quick Look names it `dance-NN.mp4.png`; rename it to `dance-NN.png` in `src/assets/images/dance/`.
   ```
   qlmanage -t -s 160 -o /tmp src/assets/videos/dance/dance-NN.mp4
   mv /tmp/dance-NN.mp4.png src/assets/images/dance/dance-NN.png
   ```
3. Upload the video with `scripts/upload-media.sh`.
4. Commit and push the thumbnail.

**Remove a clip:**

1. Delete the video from `src/assets/videos/dance/`.
2. Delete its thumbnail from `src/assets/images/dance/`.
3. Delete its file from R2 (see above).
4. Commit and push.

## Caching

Cloudflare may serve a briefly cached copy right after a file changes or is deleted. It catches up quickly.
To bypass the cache when checking, add a query string to the link, e.g. `?v=2`.

## Cost

| | Free each month | Usage (Nov 2026) |
| --- | --- | --- |
| Storage | 10 GB | about 0.3 GB |
| Downloads | 10 million | well under |
| Bandwidth | always free | — |

At this size it should stay free.
