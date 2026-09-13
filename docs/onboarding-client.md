# Onboarding a new client to Tashheer

Structure for the 15-minute call. Do this once per client, then you run their ads without them touching Meta again.

## Before the call — 5 min prep on your side

- Have Tashheer BM ID handy: `1411556997603119`
- Open https://tashheer.pk/admin/clients/new in a browser tab (ready to fill in)
- Confirm you can reach the client on WhatsApp for screen-share if needed

## What you need from the client — collect during the call

- Business name (English + Urdu if they use both)
- Their WhatsApp number (with country code — messages from ads land here)
- Business city
- Contact person's name
- Their Facebook Page URL (must exist; help them create one if not)

## The call — client's side

Ask them to open Meta Business Suite in a browser: https://business.facebook.com

### Step 1 — Their business portfolio

- If they've never used Business Suite, prompt them to create a business portfolio (name: their business name).
- If they have one already, they're good.

### Step 2 — Add their Facebook Page to their business portfolio

- **Settings** (gear icon, bottom of left sidebar) → **Accounts → Pages**.
- If their Page is already listed, skip.
- Otherwise: **+ Add → Add a Page** (not "Request access"; they own it) → paste Page URL → confirm.

### Step 3 — Create an ad account with their card

- **Accounts → Ad accounts → + Add → Create a new ad account**.
- **Name**: their business name.
- **Time zone**: `Asia/Karachi`.
- **Currency**: `PKR`.
- **Business use**: **My business**.
- Once created, click into it → **Payment methods → Add** → Visa/Mastercard/JazzCash/easypaisa → their card.

### Step 4 — Add Tashheer as a Partner on the Page

- Left sidebar → **Users → Partners → + Add → Give a partner access to your assets**.
- Paste Tashheer BM ID: **`1411556997603119`**.
- Confirm.
- On the next screen it asks which assets to grant to Tashheer:
  - Tick their **Page** → toggle **Full control** on
  - Tick their **Ad account** → toggle **Manage campaigns** on (or Full control)
  - Click **Save changes**.

### Step 5 — Grab the IDs Tashheer needs

While they're still in Business Suite:

- **Page ID**: Pages → click into the Page → **About** or **Page details** → scroll to the bottom for the numeric ID. Paste in WhatsApp/chat.
- **Ad account ID**: Ad accounts → click into their ad account → the ID at top starts with numbers (Tashheer will prefix `act_` automatically).
- **Instagram business account ID** (optional but nice for cross-platform): Accounts → Instagram accounts → if connected, click into it → copy the numeric ID.

## Your side — 2 minutes after the call

1. https://tashheer.pk/admin/clients/new
2. Fill in what you collected + the three Meta IDs.
3. **Meta partner access**: set to **Granted** (since they just added Tashheer as a Partner).
4. Save.
5. **View ads → + New ad** → design their first ad in the wizard. Publish PAUSED.
6. Review the ad on the detail page. If everything looks right, click **▶ Activate**.
7. Send them a WhatsApp confirmation: "Your ad is live. I'll share results daily. WhatsApp messages from the ad will come straight to your number."

## If something goes wrong on the client's side during the call

- **"I don't see the Partners menu"** — they're in the wrong scope. Make sure they clicked **Settings** (gear icon), not the top-nav.
- **"Add Partner says invalid ID"** — they mistyped the BM ID. Copy-paste Tashheer's BM ID again: `1411556997603119`.
- **"Payment method rejected"** — happens with cards not enabled for international transactions. Ask them to enable it via their bank's app (usually a toggle called "International transactions" or "Card for Online use"), then retry.
- **"I don't have a Facebook Page yet"** — do this first, then continue. Facebook Page creation is free at https://www.facebook.com/pages/create. Category: matches their business (bakery, salon, etc.).

## Daily ops for a running client

- **Client asks a question about their ad** → answer via WhatsApp, screenshot the Tashheer ad detail page if helpful.
- **Client wants to pause spend** → https://tashheer.pk/admin/clients/[id]/ads/[adId] → click **⏸ Pause**.
- **Client wants a budget change** → today, easiest path is to archive the ad and create a new one with the new budget. Direct-edit of budget on an existing ad set is Phase 8 work.
- **Insights** → auto-refresh once a day (cron). To force a refresh, open the ad detail page and click **Refresh** in the Results panel.
