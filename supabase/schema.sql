-- ═══ Enable RLS ═══
alter default privileges in schema public grant all on tables to postgres, anon, authenticated;

-- ═══ Players ═══
create table public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Jagoan',
  avatar_url text,
  total_stars int not null default 0,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  has_seen_onboarding bool not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ═══ Routines (admin-managed) ═══
create table public.routines (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null,
  time_category text not null check (time_category in ('Pagi','Siang','Sore','Malam')),
  is_active bool not null default true,
  weekend_only bool not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ═══ Missions (admin-managed) ═══
create table public.missions (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  target_text text not null,
  description text not null,
  emoji text not null default '📖',
  duration_minutes int not null default 10,
  assigned_date date,
  is_active bool not null default true,
  created_at timestamptz not null default now()
);

-- ═══ Heroes (admin-managed) ═══
create table public.heroes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  element text not null,
  emoji text not null,
  color text not null,
  unlock_stars int not null,
  sort_order int not null default 0,
  silhouette_url text,
  revealed_url text,
  is_active bool not null default true,
  created_at timestamptz not null default now()
);

-- ═══ Daily Progress ═══
create table public.daily_progress (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  progress_date date not null default current_date,
  stars_earned int not null default 0,
  all_routines_done bool not null default false,
  mission_done bool not null default false,
  bonus_awarded bool not null default false,
  created_at timestamptz not null default now(),
  unique(player_id, progress_date)
);

-- ═══ Routine Completions ═══
create table public.routine_completions (
  id uuid primary key default gen_random_uuid(),
  daily_progress_id uuid not null references public.daily_progress(id) on delete cascade,
  routine_id uuid not null references public.routines(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique(daily_progress_id, routine_id)
);

-- ═══ Mission Completions ═══
create table public.mission_completions (
  id uuid primary key default gen_random_uuid(),
  daily_progress_id uuid not null references public.daily_progress(id) on delete cascade,
  mission_id uuid not null references public.missions(id) on delete cascade,
  time_spent_seconds int,
  completed_at timestamptz not null default now()
);

-- ═══ Player Heroes (unlocks) ═══
create table public.player_heroes (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  hero_id uuid not null references public.heroes(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique(player_id, hero_id)
);

-- ═══ Row Level Security ═══
-- For now: allow anon read/write on all tables (single-family app)
-- Later: add auth + per-user RLS policies

alter table public.players enable row level security;
alter table public.routines enable row level security;
alter table public.missions enable row level security;
alter table public.heroes enable row level security;
alter table public.daily_progress enable row level security;
alter table public.routine_completions enable row level security;
alter table public.mission_completions enable row level security;
alter table public.player_heroes enable row level security;

-- Permissive policies for anon (family app, single user)
create policy "Allow all for anon" on public.players for all using (true) with check (true);
create policy "Allow all for anon" on public.routines for all using (true) with check (true);
create policy "Allow all for anon" on public.missions for all using (true) with check (true);
create policy "Allow all for anon" on public.heroes for all using (true) with check (true);
create policy "Allow all for anon" on public.daily_progress for all using (true) with check (true);
create policy "Allow all for anon" on public.routine_completions for all using (true) with check (true);
create policy "Allow all for anon" on public.mission_completions for all using (true) with check (true);
create policy "Allow all for anon" on public.player_heroes for all using (true) with check (true);

-- ═══ Realtime ═══
alter publication supabase_realtime add table public.routines;
alter publication supabase_realtime add table public.missions;
alter publication supabase_realtime add table public.heroes;
alter publication supabase_realtime add table public.daily_progress;

-- ═══ Storage ═══
insert into storage.buckets (id, name, public) values ('heroes', 'heroes', true);
create policy "Public Access" on storage.objects for select using ( bucket_id = 'heroes' );
create policy "Anon Upload" on storage.objects for insert with check ( bucket_id = 'heroes' );
create policy "Anon Update" on storage.objects for update using ( bucket_id = 'heroes' );
create policy "Anon Delete" on storage.objects for delete using ( bucket_id = 'heroes' );

-- ═══ Seed: Default Player ═══
insert into public.players (name) values ('Jagoan');

-- ═══ Seed: Routines ═══
insert into public.routines (title, icon, time_category, sort_order, weekend_only) values
  ('Bangun Pagi',        '🌅', 'Pagi',  1,  false),
  ('Mandi Pagi',         '🛁', 'Pagi',  2,  false),
  ('Sikat Gigi',         '🦷', 'Pagi',  3,  false),
  ('Sholat Subuh',       '🕌', 'Pagi',  4,  false),
  ('Sholat Dzuhur',      '🕌', 'Siang', 5,  false),
  ('Tidur Siang',        '😴', 'Siang', 6,  false),
  ('Main Lego',          '🧱', 'Siang', 7,  false),
  ('Main dengan Teman',  '👫', 'Sore',  8,  false),
  ('Sholat Ashar',       '🕌', 'Sore',  9,  false),
  ('Mandi Sore',         '🚿', 'Sore',  10, false),
  ('Sholat Maghrib',     '🕌', 'Malam', 11, false),
  ('Sholat Isya',        '🕌', 'Malam', 12, false),
  ('Jalan-jalan Keluarga','🚶', 'Sore', 13, true);

-- ═══ Seed: Heroes ═══
insert into public.heroes (name, element, emoji, color, unlock_stars, sort_order) values
  ('Blaze Jr.',   'Api',      '🔥', 'orange',   15,  1),
  ('Aqua Jr.',    'Air',      '💧', 'sky',      40,  2),
  ('Thorn Jr.',   'Tumbuhan', '🌱', 'mint',     75,  3),
  ('Thunderbolt', 'Petir',    '⚡', 'sunshine', 120, 4),
  ('Gale Jr.',    'Angin',    '🌪️', 'lavender', 180, 5),
  ('Solar Jr.',   'Cahaya',   '☀️', 'sunshine', 250, 6),
  ('Frost',       'Es',       '❄️', 'sky',     350, 7);

-- ═══ Seed: Sample Mission ═══
insert into public.missions (type, target_text, description, emoji, duration_minutes, assigned_date) values
  ('Menulis Huruf', 'Tulis huruf A besar dan kecil', 'Latihan menulis huruf A. Tulis 5 kali huruf besar dan 5 kali huruf kecil di buku tulis.', '✏️', 10, current_date);
