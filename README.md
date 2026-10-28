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
| Database | MongoDB + Mongoose (contact form only) |
| Blog | Markdown files rendered at build time (unified, remark, shiki) |
| Deployment | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — 3D hero, about, skills, research, experience, CTA |
| `/projects` | GitHub repos fetched live from GitHub API |
| `/blog` | Blog post listing, built from markdown files in `content/blog` |
| `/blog/[slug]` | Individual blog post (statically generated) |
| `/contact` | Contact form, saved to MongoDB and emailed or posted to a webhook when configured |

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/contact` | Save contact form submission to MongoDB and notify by email (Resend) and/or webhook (Slack, Discord), each when configured |
| GET | `/api/projects` | Proxy GitHub API for A2DR1's repos |

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

Edit `.env.local` and fill in your values:

```env
MONGODB_URI=<your MongoDB Atlas connection string>
GITHUB_TOKEN=<optional, raises the GitHub API rate limit>
RESEND_API_KEY=<optional, emails each contact submission via Resend>
CONTACT_TO_EMAIL=<optional, recipient for those emails; defaults to austinsz@umich.edu>
CONTACT_FROM_EMAIL=<optional, sender; defaults to onboarding@resend.dev>
CONTACT_WEBHOOK_URL=<optional, Slack or Discord incoming webhook for each submission>
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

> **Note**: Without `MONGODB_URI` the contact form cannot store submissions; everything else, including the blog, works without it.

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
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_WEBHOOK_URL` (optional, contact form notifications)
4. Deploy

### Adding a custom domain

In Vercel → Project Settings → Domains, add your domain. Vercel handles SSL automatically.

## Writing a Blog Post

Posts are markdown files in `content/blog`. The file name is the URL slug, so
`content/blog/my-post.md` is served at `/blog/my-post`. Each file starts with
front matter:

```markdown
---
title: "My Post Title"
date: "2026-01-31"
excerpt: "One or two sentences shown on the list page."
tags: [lean4, research]
---

Body in GitHub-flavoured markdown. Fenced code blocks are syntax highlighted,
including ```lean.
```

Commit and push; Vercel rebuilds the site and the post is live. There is no
database or admin UI involved.

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout with Navbar + Footer
│   ├── page.tsx             # Home page
│   ├── projects/page.tsx    # Projects page
│   ├── blog/
│   │   ├── page.tsx         # Blog listing (reads content/blog)
│   │   └── [slug]/page.tsx  # Individual post (static)
│   ├── contact/page.tsx     # Contact form
│   └── api/
│       ├── contact/route.ts
│       └── projects/route.ts
├── content/
│   └── blog/*.md            # Blog posts (front matter + markdown)
├── components/
│   ├── BlogList.tsx         # Client-side tag filter for the blog index
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroScene.tsx        # Three.js 3D hero ("use client")
│   └── AnimatedSection.tsx  # Framer Motion scroll reveal
├── lib/
│   ├── blog.ts              # Markdown loader and renderer
│   └── mongodb.ts           # Singleton MongoDB connection
├── models/
│   └── Contact.ts
├── vercel.json
└── .env.local.example
```
