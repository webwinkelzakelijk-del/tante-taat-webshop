#!/usr/bin/env sh
# Start script for Replit (and any other host).
# Runs the production build only when the code changed since the last build,
# then serves the optimized site. Dev mode (`npm run dev`) is far too slow on a
# small container and its hot-reload websocket does not survive Replit's proxy.
set -e

# A Pull/restart can be launched while an older workflow still owns port 3000.
# Stop that server before touching .next; otherwise visitors can receive HTML
# from the old build while its JavaScript chunks are being replaced.
if command -v fuser >/dev/null 2>&1; then
  fuser -k 3000/tcp 2>/dev/null || true
elif command -v pkill >/dev/null 2>&1; then
  pkill -f '[n]ext-server' 2>/dev/null || true
fi

STAMP=".next/.built-commit"
CURRENT="$(git rev-parse HEAD 2>/dev/null || echo nogit)"
# Any uncommitted change also invalidates the build.
if [ "$CURRENT" != "nogit" ] && [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  CURRENT="$CURRENT-dirty-$(date +%s)"
fi

if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
  echo "▸ Installing dependencies…"
  # npm ci installs exactly what the lockfile says and never rewrites it,
  # so Replit's local npm version cannot create "uncommitted changes" that block Pull.
  npm ci --no-audit --no-fund
fi

if [ ! -f .next/BUILD_ID ] || [ "$(cat "$STAMP" 2>/dev/null)" != "$CURRENT" ]; then
  echo "▸ Building production bundle (this takes a minute the first time)…"
  # Never reuse a build cache that may have been written while an older server
  # was still reading it. Replit's small container can otherwise leave Webpack's
  # persistent cache in a half-written state after a restart.
  rm -rf .next
  NODE_OPTIONS="--max-old-space-size=2048" npm run build
  echo "$CURRENT" > "$STAMP"
else
  echo "▸ Build is up to date, skipping."
fi

echo "▸ Starting Tante Taat…"
exec npm run start
