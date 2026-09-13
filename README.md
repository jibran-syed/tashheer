# Tashheer.pk

**Apna Ad. Khud Chalao.** — Facebook & Instagram ads for Pakistani small businesses, without the complexity of Meta Ads Manager.

This is the Next.js source for the Tashheer platform: landing page, admin console, and Meta Marketing API integration for publishing click-to-WhatsApp ads on behalf of clients.

## Stack

- **Next.js 16** (App Router, Turbopack, `proxy.ts` for the request pipeline)
- **React 19**, **TypeScript**, **Tailwind CSS 4**
- **Supabase** — Postgres + Auth (magic link / OTP) + Storage (`ad-media` bucket) + row-level security
- **Meta Graph API v21** — server-side, system-user token + `appsecret_proof`
- **Vercel** — deploy + daily insights cron

## Local development

```bash
npm install
cp .env.example .env.local   # then fill values from docs/supabase-setup.md
npm run dev
```

Open http://localhost:3000.

On first run, apply the Supabase schema (`supabase/migrations/0001_init.sql`) via the Supabase SQL editor — instructions in `docs/supabase-setup.md`.

## Route map

| Route | Who | Purpose |
| --- | --- | --- |
| `/` | Public | Landing (bilingual EN/Urdu, RTL for Urdu) |
| `/privacy`, `/terms` | Public | Legal |
| `/login` | Public | Magic-link / 6-digit OTP sign-in |
| `/dashboard/*` | Signed-in | Customer-facing dashboard (preview UI; wires to real data in Phase 6+) |
| `/admin` | Admin | Overview: counts + onboarding hints |
| `/admin/clients` | Admin | Client (business) list |
| `/admin/clients/[id]` | Admin | Client detail + edit + archive |
| `/admin/clients/[id]/ads` | Admin | Ads for a client |
| `/admin/clients/[id]/ads/new` | Admin | Publish a WhatsApp ad (image + copy + budget) |
| `/admin/clients/[id]/ads/[adId]` | Admin | Ad detail + activate / pause / archive + refresh insights |
| `/api/health/supabase` | Ops | Supabase connectivity + schema check |
| `/api/health/meta` | Ops | Meta system-user token + business ID check |
| `/api/cron/insights` | Vercel Cron | Daily insights sync (auth via `CRON_SECRET`) |

## Key docs

- `docs/supabase-setup.md` — one-time Supabase project + env-var setup
- `docs/deploy.md` — GitHub → Vercel → Meta Live-mode → DNS via Hostinger
- `docs/onboarding-client.md` — 15-min client onboarding call script + Meta Partner-add steps

## Ops model

**Agency mode** — clients keep their own Meta ad account (their card, their bill). They grant Tashheer's Business Manager Partner access on their Facebook Page and ad account. Tashheer's admin creates and manages ads on their behalf via a system-user token. Clients never open Meta Dashboard. Later phases (post-MVP) can add a self-serve customer wizard.

## Build & lint

```bash
npm run lint
npm run build
npm run start
```
