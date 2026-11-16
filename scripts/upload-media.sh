#!/usr/bin/env bash
# Upload everything in src/assets/videos to the R2 bucket, keeping the same paths
# (src/assets/videos/dance/dance-01.mp4 -> videos/dance/dance-01.mp4).
# Usage: scripts/upload-media.sh [bucket-name]
set -euo pipefail

BUCKET="${1:-laiyiohlsen-media}"
WRANGLER="npx --yes wrangler@4.158.0"
cd "$(dirname "$0")/../src/assets"

# Log in once (opens the browser) if not already authenticated.
$WRANGLER whoami 2>/dev/null | grep -q "You are logged in" || $WRANGLER login

# Read the file list on fd 3 so wrangler keeps the terminal as stdin.
while read -r file <&3; do
  case "${file##*.}" in
    mp4|MP4) type="video/mp4" ;;
    mov|MOV) type="video/quicktime" ;;
    *) type="application/octet-stream" ;;
  esac
  echo "Uploading $file"
  $WRANGLER r2 object put "$BUCKET/$file" --file "$file" --content-type "$type" --remote
done 3< <(find videos -type f ! -name '.DS_Store' | sort)
