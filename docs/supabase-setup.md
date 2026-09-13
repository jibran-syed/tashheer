# Supabase setup for Tashheer

**Time needed:** ~5 minutes. **Cost:** free tier is enough for MVP + first clients.

## Why Supabase

One hosted service gives us everything Tashheer needs for MVP:

- **Postgres database** — businesses, ads, insights, media, audit log
- **Auth** — magic-link email login, admin vs client roles
- **Storage** — client ad photos and videos
- **Row-level security** — client A cannot see client B's data, enforced by the DB itself

## Step 1 — Create your Supabase account

1. Go to https://supabase.com and sign up. Prefer signing up with GitHub if you already have one — faster login later.
2. When it asks about an organization, name it **Tashheer** (or your business name). Personal is fine.

## Step 2 — Create the project

Click **New project** and fill in:

| Field | Value |
| --- | --- |
| Name | `tashheer-mvp` |
| Database password | Click **Generate a password** → **save it in your password manager immediately** (you will need it if you ever run migrations directly against the DB) |
| Region | **Southeast Asia (Singapore) — `ap-southeast-1`** (closest to Pakistan, lowest latency for your users) |
| Pricing plan | **Free** |

Click **Create new project**. Provisioning takes ~2 minutes — you can grab tea.

## Step 3 — Grab the three values I need

Once the project is ready, use the **Connect** button at the top-right of the project dashboard — it's the fastest path:

1. Click **Connect** in the project header.
2. In the dialog, pick **App Frameworks → Next.js**.
3. Copy the shown `NEXT_PUBLIC_SUPABASE_URL` and publishable key straight into `.env.local`.

Then grab the secret key separately:

1. Left sidebar → gear icon (**Settings**) at the bottom.
2. Click **API Keys** (note: not "API" — the section was renamed).
3. Two blocks show up:
   - **New keys** (recommended): `sb_publishable_...` and `sb_secret_...`
   - **Legacy keys**: `anon` and `service_role`
4. Either format works. Copy the **secret** key (`sb_secret_...` or `service_role`) into `SUPABASE_SERVICE_ROLE_KEY`. You may need to click **Reveal** or the eye icon first.

**Never** paste the secret key anywhere public. Server-side only. If it leaks, rotate it in the dashboard immediately.

## Step 4 — Put them in `.env.local`

I've created a placeholder `.env.local` at the project root. Open it and paste the values:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...           # the anon public key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...               # the service_role secret key
```

`.env.local` is already gitignored — it will never end up in a commit. I never see the values either; they live only on your machine.

## Step 5 — Restart the dev server

Stop the running `npm run dev` (Ctrl+C in its terminal or use the browser preview's stop button) and start it again so Next.js picks up the new env vars.

## What happens next

Once you tell me the env is filled in, I will:

1. Install `@supabase/supabase-js` and `@supabase/ssr`.
2. Create `lib/supabase/{client,server,admin}.ts` (browser client, server-with-cookies client, and service-role admin client).
3. Write the SQL migration for our tables: `businesses`, `memberships`, `ads`, `ad_drafts`, `media_assets`, `insights`, `audit_logs`.
4. Set up row-level security policies so each client only sees their own data.
5. Verify connection with a health-check page and move on to Phase 2 (auth).

## Bookmark these

- Supabase project dashboard: `https://supabase.com/dashboard/project/<your-project-id>`
- **Table editor**: to inspect data during development
- **SQL editor**: to run migrations
- **Auth → Users**: to invite yourself as the first admin
- **Storage**: where uploaded ad media will live

That's it. Message me back with **"supabase env filled in"** and I'll pick up Phase 1.
