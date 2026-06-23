# LIVENTRA MEDIA — Cloudflare Pages Deploy

## 1) Upload this project to GitHub
Create a new GitHub repo and upload all files.

## 2) Create a Cloudflare Pages project
In Cloudflare dashboard:
- Workers & Pages
- Create application
- Pages
- Connect to Git

## 3) Build settings
Framework preset: **Next.js**
Build command: `npm run build`
Build output directory: `.next`

## 4) Add environment variables in Cloudflare Pages
Go to:
Settings → Environment variables

Add:
- `YOUTUBE_API_KEY` = your Google YouTube API key
- `YOUTUBE_CHANNEL_ID` = `UCLeBqaOXvbonWYYhr9MdHTA`
- `NEXT_PUBLIC_SITE_URL` = your Cloudflare Pages URL or custom domain

Example:
- `NEXT_PUBLIC_SITE_URL=https://liventra-media.pages.dev`

## 5) Redeploy
After adding env vars, trigger a new deploy.

## 6) Important for live chat
The `NEXT_PUBLIC_SITE_URL` must match your real deployed domain so YouTube live chat embed works correctly.
