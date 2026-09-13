# Tashheer.pk — Project Handoff Report

Last updated: 17 August 2026  
Workspace: `C:\projects\tashheer`

## 1. Product summary

Tashheer.pk is a Pakistan-focused, self-service advertising SaaS for small
business owners who want to run Facebook and Instagram ads without learning
Meta Ads Manager.

- Brand: **Tashheer.pk**
- Urdu name: **تشہیر.pk**
- Core promise: **Apna Ad. Khud Chalao.**
- Supporting message: **Run Facebook & Instagram ads without the complexity of
  Ads Manager.**
- Primary audience: non-technical Pakistani small business owners
- Personality: simple, fast, friendly, modern, trustworthy, Pakistani, and not
  corporate or intimidating

Public-facing language must stay simple. Avoid terms such as campaign
objective, ad set, pixel, CAPI, or other Meta Ads Manager jargon unless they are
strictly required in a technical/admin context.

## 2. Current project status

The repository contains a polished bilingual landing page and a bilingual
customer-dashboard frontend preview. It is **not yet a functional SaaS
backend**.

Implemented:

- Responsive English/Urdu landing page
- Language toggle with RTL document direction for Urdu
- Official local Tashheer logo and icon assets
- Full first-fold hero with supplied Pakistani business-owner image
- Four-card draggable/swipeable feature carousel
- Four-step animated process section
- Pricing, technology/payment compatibility, FAQ, final CTA, and footer
- Terms and Privacy pages
- Customer dashboard frontend with overview, ads, create-ad, billing, and
  settings screens
- Next.js metadata, Open Graph metadata, and application icon

Not implemented:

- Customer authentication or authorization
- Staff/internal admin console
- Database or persistent customer records
- Meta OAuth, asset discovery, Marketing API calls, or ad publishing
- Functional media uploads
- Functional ad-draft saving
- Payments, subscriptions, invoices, or billing provider integration
- Live analytics or notifications
- Transactional email

The dashboard currently uses hard-coded demonstration data. The only client
persistence is the selected language in `localStorage`.

## 3. Technology and commands

- Next.js `16.3.1`, App Router
- React `19.2.8`
- TypeScript
- Tailwind CSS 4 via `@import "tailwindcss"`
- ESLint 9 with `eslint-config-next`
- No third-party runtime packages currently installed

Commands:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Local preview: `http://localhost:3000/`

The latest verification completed before this handoff:

- `npm run lint` passed
- `npm run build` passed
- All eleven routes were statically generated successfully

There is no automated test suite yet.

### Important Next.js rule

Read `AGENTS.md` before implementation work. This Next.js version may contain
breaking changes compared with older documentation. Read the relevant guide in
`node_modules/next/dist/docs/` before changing Next.js APIs or conventions.

## 4. Routes

| Route | Purpose | Current state |
| --- | --- | --- |
| `/` | Public landing page | Complete frontend |
| `/privacy` | Privacy Policy | Complete for current frontend phase; must be updated before live Meta/data processing |
| `/terms` | Terms & Conditions | Complete initial version |
| `/dashboard` | Customer overview | Static frontend preview |
| `/dashboard/ads` | Customer ad list | Static frontend preview |
| `/dashboard/create` | Four-step ad creation UI | Static frontend preview |
| `/dashboard/billing` | Subscription/ad-spend view | Static frontend preview |
| `/dashboard/settings` | Business profile and connection state | Static frontend preview |

## 5. Landing-page composition

`app/page.tsx` renders these sections in this exact order:

1. `Header`
2. `Hero`
3. `BusinessShowcase`
4. `HowItWorks`
5. `Pricing`
6. `Partners`
7. `Faq`
8. `FinalCta`
9. `Footer`

Key files:

- `components/header.tsx`
- `components/hero.tsx`
- `components/business-showcase.tsx`
- `components/feature-visual.tsx`
- `components/how-it-works.tsx`
- `components/pricing.tsx`
- `components/partners.tsx`
- `components/faq.tsx`
- `components/final-cta.tsx`
- `components/footer.tsx`
- `lib/translations.ts`

## 6. Completed UX decisions that should be preserved

These decisions were made through multiple visual-review iterations:

- The public header contains only the logo, EN/Urdu toggle, and **Create My Ad**
  CTA. Public navigation links and Customer Login were deliberately removed.
- The hero fills the first viewport fold and uses the supplied baker image on
  the right.
- The English hero headline displays “Apna Ad.” and then “Khud Chalao.” with
  “Khud Chalao.” kept on one line.
- Supporting benefits in the hero are bullets, not a paragraph.
- The feature section has exactly four equal-size cards:
  1. Photo to polished ad creative
  2. AI model and ready designs
  3. A budget you control
  4. Live updates that make sense
- The feature carousel has no left/right arrow buttons. Users swipe on touch
  screens or click-and-drag with a mouse.
- Feature images already contain their own UI overlays. Do not add duplicate
  HTML notification pop-ups over them.
- The process section contains four circular cards with no photos. Numbers 1–4
  appear in the centered colored circles and pulse sequentially. A subtle
  animated line connects the cards on desktop.
- The process CTA is a centered, extra-wide **Get Started** button.
- The sections previously titled “Your results, simplified” and “Why Tashheer”
  were deliberately removed.
- Partner/payment logos use clean transparent original assets without white
  logo boxes and without “Planned” tags.
- Main headings use a lighter Meta-inspired visual weight rather than the
  earlier heavy rounded-display style.
- Mobile-first behavior is important and must be checked after material UI
  changes.

## 7. Brand system

`config/tashheer-brand-colors.json` is the **single source of truth for all
brand colors**. Do not invent additional primary brand colors.

Approved colors:

- Orange: `#FF6A00`
- Magenta: `#FF2D7A`
- Purple: `#7B61FF`
- Near-black: `#0D1117`
- White: `#FFFFFF`
- Light gray: `#F5F6F8`

Rules:

- Predominantly white backgrounds
- Near-black primary text
- Orange for primary actions and important highlights
- Purple as the secondary accent
- Magenta mainly as the middle gradient transition
- Full orange → magenta → purple gradient only in selected brand elements
- Do not make the overall UI gradient-heavy

`app/layout.tsx` imports the JSON and exposes CSS variables. `app/globals.css`
maps them into Tailwind theme tokens such as `brand-orange`, `brand-purple`,
`foreground`, `soft`, and `line`.

Typography:

- English/UI: Segoe UI Variable fallbacks
- Urdu/RTL: Noto Sans Arabic, Segoe UI, Tahoma, Arial fallbacks
- Headings intentionally use moderate weights and compact tracking

## 8. Assets

Brand assets:

- `public/brand/tashheer-logo.png`
- `public/brand/tashheer-icon.png`
- `app/icon.png`

Primary imagery:

- Hero: `public/images/tashheer-hero-baker.png`
- Feature 1: `public/images/tashheer-feature-photo-to-ad.png`
- Feature 2: `public/images/tashheer-feature-ai-model.png`
- Feature 3: `public/images/tashheer-feature-budget.png`
- Feature 4: `public/images/tashheer-feature-live-results.png`

Partner assets:

- Meta, Facebook, Instagram
- JazzCash, easypaisa, Visa, Mastercard
- Stored under `public/partners/`

Older business imagery and overlay infrastructure remain in the repository but
are not currently used by the landing page:

- `components/business-image.tsx`
- `components/image-overlay-cluster.tsx`
- `components/notification-bubble.tsx`
- `components/product-ad-overlay.tsx`
- `data/image-overlays.ts`
- `public/images/tashheer-business-*.png`

Do not reintroduce these overlays into the four current feature images. They may
be removed later in a dedicated cleanup after confirming they are not needed.

## 9. Bilingual architecture

`components/language-provider.tsx` owns the public language state.

- Supported languages: `en` and `ur`
- Storage key: `tashheer-language`
- English is the server/default language
- Urdu changes `<html lang>` and `<html dir>` to `ur` and `rtl`
- Landing-page translations live in `lib/translations.ts`
- Dashboard page copy currently lives inside
  `components/dashboard/dashboard-page.tsx`
- Dashboard-shell copy currently lives inside
  `components/dashboard/dashboard-shell.tsx`

A future cleanup may centralize all translations, but this is not required for
the Meta integration.

## 10. Dashboard architecture

Routes under `app/dashboard/` render through:

- `components/dashboard/dashboard-shell.tsx`
- `components/dashboard/dashboard-page.tsx`

The dashboard is a customer portal, not an internal Tashheer operations/admin
portal. All names, metrics, ads, statuses, budgets, and results are demo data.
Buttons and upload areas are currently visual controls only.

The create-ad screen currently presents:

1. Connect Page
2. Add Content
3. Set Budget
4. Review

The current Facebook Page URL field must eventually be replaced by a secure
**Connect with Meta** flow and a selector populated with assets returned by the
Meta APIs.

## 11. Planned Meta integration

The user has explicitly said they want to begin Meta integration, but no Meta
credentials, backend provider, or initial ad outcome have been confirmed yet.

### Prerequisites to obtain from the user

- Meta Developer account
- Meta Business Portfolio and verification status
- Meta app with Marketing API enabled
- Meta App ID
- Meta App Secret entered locally/server-side, never pasted into chat or
  committed
- A test Facebook Page controlled by the user
- A connected Instagram professional account
- A test Meta ad account with a valid Meta payment method
- Production domain/HTTPS status for `https://tashheer.pk`
- Initial supported result:
  - WhatsApp messages (recommended for the initial Pakistani SMB use case), or
  - website visits, or
  - Meta lead forms
- Backend decision; Supabase was recommended but has not been approved or
  installed

Likely initial permission set, subject to Meta's current documentation and the
selected result type:

- `ads_management`
- `ads_read`
- `business_management`
- `pages_show_list`
- `pages_read_engagement`

Request the minimum necessary permissions. Public customer use will require
the relevant Advanced Access and Meta App Review. Development should begin with
the owner's test assets and should not wait for production approval.

### Recommended implementation order

1. Add customer authentication.
2. Add PostgreSQL-backed persistence and object/media storage.
3. Implement Meta OAuth with signed `state` and server-side callback handling.
4. Exchange and store customer access tokens encrypted at rest.
5. Enable `appsecret_proof` for server-side Graph API calls.
6. Fetch/select the customer's Business Portfolio, ad account, Facebook Page,
   and connected Instagram account.
7. Add connection status, token-expiry handling, reauthorization, and
   disconnect/delete controls.
8. Save ad drafts and uploaded media.
9. Create the Meta campaign, ad set, creative, and ad in **PAUSED** status first.
10. Add an explicit review and publish confirmation before activating an ad.
11. Synchronize spend, results, cost per result, and delivery status.
12. Add webhooks/background jobs only when needed; do not over-engineer the
    first integration.

### Proposed data entities (not implemented)

- users
- businesses
- memberships
- meta_connections
- meta_assets
- media_assets
- ad_drafts
- ads
- insight_snapshots
- audit_logs

Never expose the Meta App Secret or customer access tokens to Client Components
or browser storage. All Meta API calls must run server-side. Keep OAuth tokens
encrypted at rest and isolate them by customer/business.

Suggested environment variable names:

```dotenv
META_APP_ID=
META_APP_SECRET=
META_REDIRECT_URI=http://localhost:3000/api/meta/callback
META_GRAPH_API_VERSION=
TOKEN_ENCRYPTION_KEY=
DATABASE_URL=
```

`.env*` is already ignored by Git. Add only placeholder names to an
`.env.example`; never commit real values.

## 12. Legal and launch requirements

The current Privacy Policy explicitly says live accounts, Meta connections,
analytics, and payments are not enabled. Update it before enabling real data
processing.

Before public Meta launch, add or confirm:

- Production Privacy Policy URL
- Terms URL
- User-data deletion instructions and Meta data-deletion callback/page
- Support email and legal business name
- Clear authorization language for connected Pages/ad accounts
- Token/data retention and deletion policy
- App Review reviewer instructions and test flow
- Meta platform and advertising-policy compliance

Tashheer.pk must continue to state that it is an independent software platform
and is not affiliated with or endorsed by Meta.

## 13. Repository state and cautions

- The working tree is not in a clean committed state.
- Most application files and assets are currently untracked, while several
  original create-next-app assets are deleted.
- Make an intentional baseline commit before starting a large backend or Meta
  integration branch.
- Preserve unrelated existing work; do not use destructive Git operations.
- There is currently no deployment configuration or CI pipeline in the repo.
- The default `README.md` is still the create-next-app template and should be
  replaced later with project-specific setup documentation.

## 14. Immediate next action for Claude Code

Before writing integration code, ask the user for the outstanding Meta and
backend decisions listed in section 11. Once confirmed, implement only the
foundation and read-only connection flow first:

1. authentication/database foundation;
2. secure Meta OAuth;
3. asset discovery and selection;
4. connection status/disconnect;
5. tests and build verification.

Do not create or publish live ads until the connection flow is stable, the user
has reviewed the selected result type, and a PAUSED-only test path succeeds.
