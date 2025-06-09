
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  full_name       text not null,
  birth_date      date not null,
  birth_time      text,
  birth_location  text not null,
  profile_data    jsonb,
  created_at      timestamptz default now()
);

