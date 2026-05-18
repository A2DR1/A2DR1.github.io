# Austin Shen — Personal Portfolio

A full-featured personal portfolio website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Three.js, Framer Motion, and MongoDB.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Database | MongoDB + Mongoose |
| Deployment | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — 3D hero, about, skills, research, experience, CTA |
| `/projects` | GitHub repos fetched live from GitHub API |
| `/blog` | Blog post listing (MongoDB + static fallback) |
| `/blog/[slug]` | Individual blog post |
| `/contact` | Contact form → MongoDB |

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/contact` | Save contact form submission |
| GET | `/api/projects` | Proxy GitHub API for A2DR1's repos |
| GET | `/api/blog` | List blog posts |
| GET | `/api/blog/[slug]` | Single blog post by slug |
| POST | `/api/blog` | Create new blog post |

## Local Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd portfolio
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXX   # optional, increases GH rate limit
```

To get a MongoDB URI:
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Under **Database Access**, create a user with read/write permissions
3. Under **Network Access**, allow your IP (or `0.0.0.0/0` for Vercel)
4. Click **Connect** → **Drivers** and copy the connection string

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note**: Without `MONGODB_URI`, the contact form and blog API will error, but the site still works — the blog page falls back to static sample posts.

## Deploying to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js.

### Option B — GitHub integration

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new), import the repo
3. Add environment variables in the Vercel dashboard:
   - `MONGODB_URI`
   - `GITHUB_TOKEN` (optional)
4. Deploy

### Adding a custom domain

In Vercel → Project Settings → Domains, add your domain. Vercel handles SSL automatically.

## Seeding Blog Posts

To add a blog post via the API:

```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "slug": "my-first-post",
    "excerpt": "A short summary of the post.",
    "content": "# My First Post\n\nFull markdown content here.",
    "tags": ["thoughts", "engineering"]
  }'
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout with Navbar + Footer
│   ├── page.tsx             # Home page
│   ├── projects/page.tsx    # Projects page
│   ├── blog/
│   │   ├── page.tsx         # Blog listing
│   │   └── [slug]/page.tsx  # Individual post
│   ├── contact/page.tsx     # Contact form
│   └── api/
│       ├── contact/route.ts
│       ├── projects/route.ts
│       └── blog/
│           ├── route.ts
│           └── [slug]/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroScene.tsx        # Three.js 3D hero ("use client")
│   └── AnimatedSection.tsx  # Framer Motion scroll reveal
├── lib/
│   └── mongodb.ts           # Singleton MongoDB connection
├── models/
│   ├── Contact.ts
│   └── BlogPost.ts
├── vercel.json
└── .env.local.example
```
