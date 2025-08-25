# Divine Portfolio (Vite + React + TypeScript + Tailwind)

## Quickstart
1. Install deps: `npm i`
2. Start dev: `npm run dev`
3. Add your images/videos into `public/media/` and update paths in `src/App.tsx`
4. Build: `npm run build` → output in `dist/`
5. Deploy on Netlify (Connect to your Git repo or drag-drop the `dist/` folder)

## Video Encoding Tips
- Encode two formats for best coverage:
  - **MP4 (H.264 + AAC)** — maximum compatibility (iOS/Android/macOS/Windows)
  - **WebM (VP9 + Opus)** — efficient for Chromium/Firefox
- Example ffmpeg commands:
  - MP4: `ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p -profile:v high -level 4.0 -preset veryfast -crf 22 -c:a aac -b:a 128k -movflags +faststart output.mp4`
  - WebM: `ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 0 -crf 33 -c:a libopus -b:a 96k output.webm`
  - Poster: `ffmpeg -i output.mp4 -ss 00:00:01.000 -vframes 1 clip-1-poster.jpg`

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Optional headers for caching (create a `_headers` file at repo root):

  ```
  /media/*
    Cache-Control: public, max-age=31536000, immutable
  ```
