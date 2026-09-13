-- Tashheer MVP schema
-- Apply in Supabase Dashboard -> SQL Editor -> New query, paste, Run.
-- Idempotent: safe to re-run.

-- =========================================================================
-- Extensions
-- =========================================================================
create extension if not exists pgcrypto;

-- =========================================================================
-- profiles: one row per auth.users; carries role + display info
-- =========================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('admin', 'client')),
  full_name text,
  whatsapp text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'One row per auth user. Adds Tashheer role (admin/client) and display info.';

-- Auto-create profile on user signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================================
-- businesses: client businesses run by admin (agency mode)
-- =========================================================================
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  urdu_name text,
  slug text unique not null,
  contact_name text,
  whatsapp text,
  city text,
  facebook_page_id text,
  instagram_business_account_id text,
  meta_ad_account_id text,
  meta_partner_status text not null default 'pending'
    check (meta_partner_status in ('pending', 'granted', 'revoked')),
  status text not null default 'active'
    check (status in ('active', 'paused', 'archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists businesses_status_idx on public.businesses(status);

-- =========================================================================
-- memberships: which users can see which businesses
-- =========================================================================
create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'viewer')),
  created_at timestamptz not null default now(),
  unique (user_id, business_id)
);

create index if not exists memberships_user_idx on public.memberships(user_id);
create index if not exists memberships_business_idx on public.memberships(business_id);

-- =========================================================================
-- media_assets: uploaded images/videos for ad creative
-- =========================================================================
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  uploader_id uuid references auth.users(id) on delete set null,
  storage_path text not null,
  kind text not null check (kind in ('image', 'video')),
  original_filename text,
  width int,
  height int,
  duration_seconds numeric,
  file_size_bytes bigint,
  created_at timestamptz not null default now()
);

create index if not exists media_assets_business_idx on public.media_assets(business_id);

-- =========================================================================
-- ads: the ad we run on Meta
-- =========================================================================
create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  headline text not null,
  primary_text text not null,
  call_to_action text not null default 'WHATSAPP_MESSAGE',
  media_asset_id uuid references public.media_assets(id) on delete set null,
  daily_budget_pkr int not null,
  result_type text not null default 'whatsapp'
    check (result_type in ('whatsapp', 'website', 'lead_form')),
  destination_url text,
  whatsapp_number text,
  status text not null default 'draft'
    check (status in ('draft', 'pending', 'paused', 'active', 'archived', 'failed')),
  meta_campaign_id text,
  meta_adset_id text,
  meta_creative_id text,
  meta_ad_id text,
  meta_last_error text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ads_business_idx on public.ads(business_id);
create index if not exists ads_status_idx on public.ads(status);

-- =========================================================================
-- insights: daily performance snapshots
-- =========================================================================
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid not null references public.ads(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  snapshot_date date not null,
  impressions int not null default 0,
  clicks int not null default 0,
  results int not null default 0,
  spend_pkr numeric not null default 0,
  cost_per_result_pkr numeric,
  raw jsonb,
  fetched_at timestamptz not null default now(),
  unique (ad_id, snapshot_date)
);

create index if not exists insights_business_idx on public.insights(business_id);

-- =========================================================================
-- audit_logs: append-only trail
-- =========================================================================
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  business_id uuid references public.businesses(id) on delete set null,
  action text not null,
  target_kind text,
  target_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_business_idx on public.audit_logs(business_id);
create index if not exists audit_logs_created_idx on public.audit_logs(created_at desc);

-- =========================================================================
-- Helper functions
-- =========================================================================
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

create or replace function public.has_business_access(_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin()
      or exists (
        select 1 from public.memberships
        where business_id = _business_id and user_id = auth.uid()
      );
$$;

-- =========================================================================
-- Row-level security
-- =========================================================================
alter table public.profiles      enable row level security;
alter table public.businesses    enable row level security;
alter table public.memberships   enable row level security;
alter table public.media_assets  enable row level security;
alter table public.ads           enable row level security;
alter table public.insights      enable row level security;
alter table public.audit_logs    enable row level security;

-- profiles
drop policy if exists "profiles_self_read"   on public.profiles;
drop policy if exists "profiles_self_update" on public.profiles;
drop policy if exists "profiles_admin_all"   on public.profiles;

create policy "profiles_self_read"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles_self_update"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles_admin_all"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- businesses
drop policy if exists "businesses_member_read" on public.businesses;
drop policy if exists "businesses_admin_write" on public.businesses;

create policy "businesses_member_read"
  on public.businesses for select
  using (public.has_business_access(id));

create policy "businesses_admin_write"
  on public.businesses for all
  using (public.is_admin())
  with check (public.is_admin());

-- memberships
drop policy if exists "memberships_self_read"  on public.memberships;
drop policy if exists "memberships_admin_write" on public.memberships;

create policy "memberships_self_read"
  on public.memberships for select
  using (user_id = auth.uid() or public.is_admin());

create policy "memberships_admin_write"
  on public.memberships for all
  using (public.is_admin())
  with check (public.is_admin());

-- media_assets
drop policy if exists "media_assets_member_read"  on public.media_assets;
drop policy if exists "media_assets_admin_write" on public.media_assets;

create policy "media_assets_member_read"
  on public.media_assets for select
  using (public.has_business_access(business_id));

create policy "media_assets_admin_write"
  on public.media_assets for all
  using (public.is_admin())
  with check (public.is_admin());

-- ads
drop policy if exists "ads_member_read"  on public.ads;
drop policy if exists "ads_admin_write" on public.ads;

create policy "ads_member_read"
  on public.ads for select
  using (public.has_business_access(business_id));

create policy "ads_admin_write"
  on public.ads for all
  using (public.is_admin())
  with check (public.is_admin());

-- insights
drop policy if exists "insights_member_read"  on public.insights;
drop policy if exists "insights_admin_write" on public.insights;

create policy "insights_member_read"
  on public.insights for select
  using (public.has_business_access(business_id));

create policy "insights_admin_write"
  on public.insights for all
  using (public.is_admin())
  with check (public.is_admin());

-- audit_logs
drop policy if exists "audit_logs_admin_read"  on public.audit_logs;
drop policy if exists "audit_logs_admin_write" on public.audit_logs;

create policy "audit_logs_admin_read"
  on public.audit_logs for select
  using (public.is_admin());

create policy "audit_logs_admin_write"
  on public.audit_logs for insert
  with check (public.is_admin());

-- =========================================================================
-- Storage bucket for ad media (private; RLS-gated)
-- =========================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ad-media',
  'ad-media',
  false,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime']
)
on conflict (id) do nothing;

drop policy if exists "ad_media_member_read"  on storage.objects;
drop policy if exists "ad_media_admin_write" on storage.objects;

create policy "ad_media_member_read"
  on storage.objects for select
  using (
    bucket_id = 'ad-media'
    and (
      public.is_admin()
      or exists (
        select 1 from public.memberships m
        where m.user_id = auth.uid()
          and (storage.foldername(name))[1] = m.business_id::text
      )
    )
  );

create policy "ad_media_admin_write"
  on storage.objects for all
  using (bucket_id = 'ad-media' and public.is_admin())
  with check (bucket_id = 'ad-media' and public.is_admin());

-- =========================================================================
-- After running this migration:
--   1. In Supabase Dashboard -> Authentication -> Users, invite yourself
--      (Jibran) by email. You'll get a magic link.
--   2. After you sign in once, run this to make yourself admin:
--        update public.profiles
--        set role = 'admin'
--        where id = (select id from auth.users
--                    where email = 'js.jibransyed@gmail.com');
--   3. Then hit /api/health/supabase in the app to verify.
-- =========================================================================
