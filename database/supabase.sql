-- Run this once in your Supabase SQL Editor. Never expose the service-role key in the browser.
create extension if not exists pgcrypto;
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  doctor text not null check (doctor in ('ayushi','ashwin')),
  patient_name text not null,
  mobile text not null,
  email text,
  consultation_type text not null,
  preferred_date date not null,
  preferred_time time not null,
  message text,
  status text not null default 'new' check(status in ('new','contacted','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);
create index if not exists appointments_created_idx on public.appointments(created_at desc);
alter table public.appointments enable row level security;
-- Deliberately no anon/authenticated policies. Only the server's service role can access these records.
