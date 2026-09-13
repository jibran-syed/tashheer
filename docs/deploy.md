# Deploy Tashheer to Vercel + tashheer.pk

The whole path from this repo to `https://tashheer.pk` in production, plus the Meta App Live-mode switch and the Supabase config update.

Rough total time: 30–45 minutes if you already have Vercel + your Hostinger DNS panel open.

## 1. Push (already done)

`https://github.com/jibran-syed/tashheer` on branch `main`. All future commits push here; Vercel picks them up automatically once we connect.

## 2. Vercel project

1. Go to https://vercel.com and sign in (choose **Continue with GitHub** — connects your account so Vercel can see the repo).
2. Click **Add New… → Project**.
3. Under **Import Git Repository**, find `jibran-syed/tashheer` and click **Import**.
   - If it doesn't appear: click **Adjust GitHub App Permissions** and give Vercel access to that repo.
4. On the **Configure Project** screen:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: leave as default
   - **Build & Output Settings**: leave as default
5. **Environment Variables** — click the section to expand. Paste each of these one at a time (use the same values from your local `.env.local`):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://atigaztszumbuogigmuw.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` |
   | `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_...` |
   | `META_APP_ID` | your app id |
   | `META_APP_SECRET` | your app secret |
   | `META_SYSTEM_USER_TOKEN` | the EAAG… token |
   | `META_BUSINESS_ID` | `1411556997603119` |
   | `META_GRAPH_API_VERSION` | `v21.0` |
   | `NEXT_PUBLIC_APP_URL` | `https://tashheer.pk` (or your Vercel URL if DNS not ready yet) |
   | `CRON_SECRET` | generate with `openssl rand -hex 32` on your terminal, save it in your password manager, paste it here |

   For each: **Environment**: leave as **Production, Preview, Development** (default) unless you want different values per env.
6. Click **Deploy**. Takes ~2 minutes for first build.
7. When it finishes you'll get a URL like `https://tashheer.vercel.app`. Open it — landing page should render.

## 3. Verify the two health checks

Open in your browser:

- `https://<your-vercel-url>/api/health/supabase` → should return `{"ok":true,"stages":{...}}`
- `https://<your-vercel-url>/api/health/meta` → should return `{"ok":true,"identity":...,"business":...}`

If either fails, the JSON tells you which stage — usually a missing/typo'd env var.

## 4. Point tashheer.pk at Vercel (DNS via Hostinger)

1. In Vercel: **Project Settings → Domains → Add**.
2. Type `tashheer.pk`. Vercel shows two DNS records to add:

   - `A` record at `@` → `76.76.21.21` (Vercel's anycast IP)
   - `CNAME` record at `www` → `cname.vercel-dns.com`

3. Go to Hostinger → **hPanel → Domains → tashheer.pk → DNS Zone Editor**.
4. **Delete any existing A / CNAME records for `@` and `www`** that point at Hostinger's IP (otherwise DNS keeps sending traffic to Hostinger's empty site).
5. Add the two records Vercel gave you. TTL: 300 (5 min) or whatever Hostinger's default is.
6. Back on Vercel's Domains page, click **Refresh**. Verification usually completes in a few minutes; sometimes up to an hour.
7. Once verified, `https://tashheer.pk` serves the app and Vercel auto-provisions the SSL certificate.

**Do not remove** your MX records or TXT records at Hostinger — those keep any email addresses at `@tashheer.pk` working. Only the A and CNAME (the ones that route web traffic) change.

## 5. Update Supabase redirect URLs

Magic-link callbacks need to know the production URL exists.

1. Supabase Dashboard → **Authentication → URL Configuration**.
2. **Site URL**: change from `http://localhost:3000` to `https://tashheer.pk`.
3. **Redirect URLs**: add `https://tashheer.pk/auth/callback` (keep the localhost one for local dev).
4. Save.

## 6. Update Meta app: Development → Live

This is what unlocks the `(#3) capability` error you saw on the ad publish.

1. https://developers.facebook.com/apps → open **Tashheer**.
2. Top of the page, look at the **App Mode** toggle: **Development / Live**.
3. Before Meta lets you flip it, it'll ask for:
   - **Category**: pick **Business and Pages**.
   - **App Icon**: upload `public/brand/tashheer-icon.png` from the repo (or drag-drop from your local file system).
   - **Privacy Policy URL**: `https://tashheer.pk/privacy`.
   - **Terms of Service URL** (optional but expected): `https://tashheer.pk/terms`.
   - **Business Use** / **Data Use** checkboxes: agree to the Meta terms; select the Tashheer Business Portfolio as the linked business.
4. Flip the toggle to **Live**.
5. Back in the Tashheer app (production URL), re-run the publish test on your Tashheer Test ad account. Meta should now accept the write. If it still refuses with the same `(#3) capability` error, the last remaining gate is **Meta Business Verification** for the Tashheer BM — I'll walk you through that separately when needed.

## 7. Verify cron is scheduled

1. Vercel → project → **Settings → Cron Jobs** → you should see one entry: `/api/cron/insights` at `0 6 * * *` (daily 06:00 UTC = 11:00 PKT).
2. To test it manually before waiting a day: click **Trigger** next to the cron entry, or curl it yourself with the header:

   ```bash
   curl -H "Authorization: Bearer $CRON_SECRET" https://tashheer.pk/api/cron/insights
   ```

   Expected: `{"ok":true,"scanned":N,"succeeded":N,...}`.

## 8. Post-deploy sanity checks

- [ ] `https://tashheer.pk` renders the landing page in your browser
- [ ] `https://tashheer.pk/login` renders the sign-in form
- [ ] Signing in with your admin email works — you land on `/admin`
- [ ] `/api/health/supabase` returns ok
- [ ] `/api/health/meta` returns ok
- [ ] Cron job appears in Vercel Settings → Cron Jobs
- [ ] Meta app is in Live mode

Once all eight are checked, the platform is production-live. Onboard your first client using `docs/onboarding-client.md`.

## Common problems

- **`Application does not have the capability` on ad publish** — Meta app is still in Development. Do step 6.
- **Magic-link email lands but clicking loops back to /login?error=…** — Supabase Site URL / Redirect URL not updated to production. Do step 5.
- **`Missing Meta env vars` on `/api/health/meta`** — Vercel env vars didn't save; Project Settings → Environment Variables → re-add and redeploy.
- **Cron doesn't fire** — check `CRON_SECRET` is set in Vercel env AND is a plain string (no leading/trailing spaces from paste).
- **DNS still shows Hostinger's page** — old A record still active. Either delete it in Hostinger DNS Zone Editor, or wait for TTL to expire (up to 24h if TTL was high).
