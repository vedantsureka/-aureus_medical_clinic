-- Aureus Medical Clinic · SQL Editor → Run once in a NEW Supabase project.
-- In Supabase Auth create each user manually. Then insert authorised user UUIDs
-- into public.staff_users (see SETUP.md). Never place service-role keys in GitHub.

create extension if not exists pgcrypto;

create table if not exists public.staff_users (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check(role in ('admin','doctor')),
 doctor_id text check(doctor_id in ('ayushi','ashwin')),
 created_at timestamptz not null default now(),
 constraint doctor_role_check check ((role='admin' and doctor_id is null) or (role='doctor' and doctor_id is not null))
);
create table if not exists public.clinic_settings (
 id text primary key default 'main' check(id='main'),
 brand text not null default 'Aureus Medical Clinic',
 tagline text not null default '',
 address text not null,
 landmark text not null default '',
 notice text not null default '',
 gallery_urls jsonb not null default '[]'::jsonb,
 updated_at timestamptz not null default now()
);
create table if not exists public.doctor_profiles (
 id text primary key check(id in ('ayushi','ashwin')),
 name text not null,
 short_title text not null,
 subtitle text not null,
 intro text not null,
 phone text not null,
 review_rating numeric(2,1) not null default 5.0 check(review_rating between 0 and 5),
 review_count int not null default 0 check(review_count>=0),
 review_url text,
 photo_url text,
 qualifications text not null default '',
 registration text not null default '',
 schedule text not null default 'Please call to confirm appointment availability',
 focus jsonb not null default '[]'::jsonb,
 updated_at timestamptz not null default now()
);
create table if not exists public.services (
 slug text primary key,
 title text not null,
 doctor_id text not null references public.doctor_profiles(id),
 intro text not null,
 items jsonb not null default '[]'::jsonb,
 note text not null default '',
 published boolean not null default true,
 sort_order integer not null default 0,
 updated_at timestamptz not null default now()
);
create table if not exists public.reviews (
 id text primary key,
 doctor_id text not null references public.doctor_profiles(id),
 quote text not null,
 visible boolean not null default true,
 sort_order integer not null default 0,
 updated_at timestamptz not null default now()
);
create table if not exists public.appointments (
 id uuid primary key default gen_random_uuid(),
 doctor_id text not null references public.doctor_profiles(id),
 full_name text not null check(char_length(full_name) between 2 and 100),
 phone text not null check(phone ~ '^[6-9][0-9]{9}$'),
 email text,
 consultation_type text not null,
 preferred_date date not null,
 preferred_time time not null,
 message text check(message is null or char_length(message)<=500),
 status text not null default 'pending' check(status in ('pending','confirmed','cancelled')),
 internal_note text not null default '' check(char_length(internal_note)<=1000),
 consent_at timestamptz not null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists appointment_doctor_date_idx on public.appointments(doctor_id,preferred_date);
create index if not exists appointment_created_idx on public.appointments(created_at desc);

create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at=now();return new;end;$$;
create trigger clinic_updated before update on public.clinic_settings for each row execute function public.set_updated_at();
create trigger doctor_updated before update on public.doctor_profiles for each row execute function public.set_updated_at();
create trigger service_updated before update on public.services for each row execute function public.set_updated_at();
create trigger review_updated before update on public.reviews for each row execute function public.set_updated_at();
create trigger appointment_updated before update on public.appointments for each row execute function public.set_updated_at();

-- SECURITY DEFINER functions run as a trusted SQL owner to avoid policy recursion.
-- Fix search_path to prevent injection through function name resolution.
create or replace function public.staff_role() returns text language sql stable security definer set search_path = '' as $$
 select role from public.staff_users where user_id=(select auth.uid()) limit 1;
$$;
create or replace function public.staff_doctor() returns text language sql stable security definer set search_path = '' as $$
 select doctor_id from public.staff_users where user_id=(select auth.uid()) limit 1;
$$;
revoke all on function public.staff_role() from public;
revoke all on function public.staff_doctor() from public;
grant execute on function public.staff_role() to authenticated;
grant execute on function public.staff_doctor() to authenticated;

alter table public.staff_users enable row level security;
alter table public.clinic_settings enable row level security;
alter table public.doctor_profiles enable row level security;
alter table public.services enable row level security;
alter table public.reviews enable row level security;
alter table public.appointments enable row level security;

create policy "staff read own role" on public.staff_users for select to authenticated using(user_id=(select auth.uid()));
-- Account approvals must be done in Supabase SQL Editor, never self-service from the website.

create policy "public can see clinic information" on public.clinic_settings for select to anon,authenticated using(true);
create policy "only admin may edit clinic" on public.clinic_settings for update to authenticated using((select public.staff_role())='admin') with check((select public.staff_role())='admin');

create policy "public can view doctor profiles" on public.doctor_profiles for select to anon,authenticated using(true);
create policy "admin or their own doctor may edit profile" on public.doctor_profiles for update to authenticated using((select public.staff_role())='admin' or ((select public.staff_role())='doctor' and id=(select public.staff_doctor()))) with check((select public.staff_role())='admin' or ((select public.staff_role())='doctor' and id=(select public.staff_doctor())));

create policy "everyone sees published services" on public.services for select to anon,authenticated using(published);
create policy "admin sees draft services" on public.services for select to authenticated using((select public.staff_role())='admin');
create policy "admin may edit services" on public.services for update to authenticated using((select public.staff_role())='admin') with check((select public.staff_role())='admin');

create policy "everyone sees visible reviews" on public.reviews for select to anon,authenticated using(visible);
create policy "admin sees hidden reviews" on public.reviews for select to authenticated using((select public.staff_role())='admin');
create policy "admin may edit reviews" on public.reviews for update to authenticated using((select public.staff_role())='admin') with check((select public.staff_role())='admin');

-- No anonymous SELECT/INSERT/UPDATE/DELETE access to patient enquiries.
-- Public submissions use the server-only route's service role after validation + CAPTCHA.
create policy "admin or assigned doctor sees appointments" on public.appointments for select to authenticated using(
 (select public.staff_role())='admin' or ((select public.staff_role())='doctor' and doctor_id=(select public.staff_doctor()))
);
create policy "admin or assigned doctor updates appointments" on public.appointments for update to authenticated using(
 (select public.staff_role())='admin' or ((select public.staff_role())='doctor' and doctor_id=(select public.staff_doctor()))
) with check(
 (select public.staff_role())='admin' or ((select public.staff_role())='doctor' and doctor_id=(select public.staff_doctor()))
);

-- Tighten table and column permissions; prevent clients from modifying protected columns.
revoke all on public.staff_users from anon,authenticated;
revoke all on public.clinic_settings,public.doctor_profiles,public.services,public.reviews,public.appointments from anon,authenticated;
grant select on public.staff_users to authenticated;
grant select on public.clinic_settings,public.doctor_profiles,public.services,public.reviews to anon,authenticated;
grant update (brand,tagline,address,landmark,notice,gallery_urls) on public.clinic_settings to authenticated;
grant update (name,short_title,subtitle,intro,phone,review_rating,review_count,review_url,photo_url,qualifications,registration,schedule,focus) on public.doctor_profiles to authenticated;
grant update (title,intro,items,note,published) on public.services to authenticated;
grant update (quote,visible) on public.reviews to authenticated;
grant select on public.appointments to authenticated;
grant update (status,internal_note) on public.appointments to authenticated;

-- Public doctor and clinic imagery ONLY; no patient uploads.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('clinic-media','clinic-media',true,5242880,array['image/jpeg','image/png','image/webp'])
 on conflict(id) do nothing;
create policy "staff upload clinic photos" on storage.objects for insert to authenticated with check(
 bucket_id='clinic-media' and ((select public.staff_role())='admin' or (select public.staff_role())='doctor' and split_part(name,'/',1)=(select public.staff_doctor()))
);
-- Storage read is publicly allowed because this bucket contains only marketing imagery.
create policy "read public clinic photos" on storage.objects for select to anon,authenticated using(bucket_id='clinic-media');

insert into public.clinic_settings(id,brand,tagline,address,landmark,notice)
values('main','Aureus Medical Clinic','Considered care, close to home.',
'Ground Floor, Shop No. 2, Singapuri Building, 609, Jagannath Shankar Seth Road, Opposite Wadia Fire Temple, Marine Lines East, Bhangwadi, Mumbai, Maharashtra 400002',
'Opposite Wadia Fire Temple, Marine Lines East',
'Please call to confirm appointment availability. Online requests are not confirmed bookings.')
on conflict(id) do nothing;
insert into public.doctor_profiles(id,name,short_title,subtitle,intro,phone,review_rating,review_count,focus)
values
('ayushi','Dr. Ayushi Rajendra Thaker','Physician · Diabetes · Vaccination','Physician | Diabetes Care | Vaccination','Physician consultations focused on general medicine, diabetes, lifestyle-related health concerns, preventive healthcare and vaccination enquiries.','+91 91378 95139',5.0,68,'["General Medicine","Diabetes Management","Vaccination & Preventive Care","Hypertension & Lifestyle Health","Infectious Disease Consultations"]'::jsonb),
('ashwin','Dr. Ashwin Joshi','Orthopaedics · Joint & Fracture Care','Orthopaedic Surgeon | Bone, Joint & Sports Injury Care','Orthopaedic consultations for bones, joints, fractures, arthritis, sports injuries and surgical evaluation where appropriate.','+91 80979 02438',5.0,31,'["Orthopaedic Consultations","Fracture & Trauma Management","Joint Pain & Arthritis","Sports Injury Care","Arthroscopy & Joint Replacement Evaluation"]'::jsonb)
on conflict(id) do nothing;
insert into public.services(slug,title,doctor_id,intro,items,note,sort_order) values
('general-medicine','General Medicine','ayushi','Thoughtful physician consultations for everyday health concerns, prevention and longer-term care.','["Acute medical concerns","Chronic condition follow-up","Preventive screening enquiries","When to seek medical attention"]'::jsonb,'Seek emergency assistance for severe or rapidly worsening symptoms.',1),
('diabetes-lifestyle','Diabetes & Lifestyle Care','ayushi','Individualised medical guidance for diabetes, blood pressure and metabolic wellbeing.','["Blood sugar monitoring and diabetes review","Hypertension and cholesterol-related concerns","Lifestyle and nutrition guidance","Ongoing follow-up planning"]'::jsonb,'Recommendations depend on an individual clinical assessment.',2),
('vaccination','Vaccination & Preventive Care','ayushi','Discuss adult and childhood immunisation needs with a physician.','["Routine adult vaccination enquiries","Childhood vaccination enquiries","Vaccine schedule counselling","Preventive health advice"]'::jsonb,'Please confirm individual vaccine availability before visiting.',3),
('orthopaedics','Orthopaedics','ashwin','Support for musculoskeletal symptoms involving bones, joints and mobility.','["Orthopaedic evaluation","Knee, hip, shoulder and back concerns","Arthritis and joint pain","Mobility-related complaints"]'::jsonb,'Diagnosis and treatment options require a consultation.',4),
('fracture-trauma','Fracture & Trauma Care','ashwin','Orthopaedic assessment and follow-up for injuries and suspected fractures.','["Fracture assessment enquiries","Immobilisation and follow-up planning","Recovery and rehabilitation overview","Advice on when urgent evaluation is needed"]'::jsonb,'For severe injury, major bleeding, deformity or loss of sensation, seek emergency care immediately.',5),
('joint-replacement-arthroscopy','Joint Replacement & Arthroscopy','ashwin','Specialist consultations to understand whether surgical assessment may be appropriate.','["Joint replacement assessment","Arthroscopy evaluation","Discussion of potential treatment pathways","Recovery and rehabilitation planning"]'::jsonb,'Any surgical procedures require an appropriately equipped and confirmed hospital or surgical facility, not the clinic.',6),
('sports-injury','Sports Injury Care','ashwin','Assess sport-related muscle, tendon, ligament and joint concerns.','["Sprains and strains","Knee and shoulder injuries","Return-to-activity discussion","Recovery follow-up"]'::jsonb,'Avoid relying on an online enquiry for urgent injuries.',7)
on conflict(slug) do nothing;
insert into public.reviews(id,doctor_id,quote,sort_order) values
('ayushi-1','ayushi','She provides excellent care, proper treatment, and vaccination services.',1),
('ayushi-2','ayushi','The staff and overall clinic experience were also very smooth.',2),
('ayushi-3','ayushi','Thank you, Doctor, for making the whole experience so positive.',3),
('ashwin-1','ashwin','Fantastic treatment given me at home viral arthritis at knee and elbow.',4),
('ashwin-2','ashwin','He is brilliant doctor….highly recommend',5),
('ashwin-3','ashwin','Had a really good experience',6)
on conflict(id) do nothing;
