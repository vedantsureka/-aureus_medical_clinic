# Aureus Medical Clinic · Next.js / Supabase / Vercel

A working full-stack **appointment-enquiry** website for a dual-doctor clinic in Marine Lines, Mumbai. Public site, doctor-specific booking forms, secure role-based staff dashboard, editable content and mobile-first styling are included.

## What the project includes

- **Public**: premium homepage, About, 2 dedicated doctor profiles, 7 specialty pages, reviews, FAQ, contact & embedded map, appointment enquiry form, privacy and terms pages.
- **Appointment system**: selected doctor, consultation category, Indian phone validation, date/time, optional email/note, privacy consent, honeypot, optional Cloudflare Turnstile, Zod server validation, Supabase persistence, *pending confirmation* status.
- **Admin** at `/admin`: Supabase email/password login, patient enquiry inbox, name/phone search, status and doctor filters, update status and staff-only notes, edit doctor profiles and timings, upload official doctor photographs, edit clinic details, specialties and review excerpts.
- **Access**: clinic `admin` sees all; doctor-assigned accounts see only the appointments and profile of their assigned doctor, enforced by PostgreSQL Row Level Security (not just hidden buttons).
- **Logout on every page refresh**: Supabase client configured with `persistSession: false`, `autoRefreshToken: false`, `detectSessionInUrl: false`. No auth cookies/localStorage/sessionStorage; reload always requires a fresh sign-in. Additionally, inactivity >15 minutes ends the login.
- **Design**: calm navy/teal/gold visual identity, subtle staggered scroll entry animations, responsive navigation, mobile fixed call/book/directions bar, reduced-motion support, no aggressive wheel-scroll hijacking.
- **SEO**: metadata, per-route titles, MedicalClinic/Physician JSON-LD, sitemap, robots, canonical URL metadata.

**Important**: There is no appointment inventory system, SMS/WhatsApp integration or automatic patient confirmation. Requests are accepted and stored, then staff review and contact the patient. Do not advertise real-time booked slots.

## 1 · Create a GitHub repository

Unzip this folder, make a new **private or public GitHub repository**, then run:

```bash
cd aureus-medical-clinic
npm install
cp .env.example .env.local
# Fill .env.local using your own values (do NOT commit it)
npm run dev
```

Open `http://localhost:3000` to view the site. The public pages render default content before Supabase configuration; appointment submission and admin authentication **require a real Supabase project**.

## 2 · Create Supabase project and database

1. Create a Supabase project; select the preferred region according to the clinic's data-handling requirements and verify your service agreements.
2. In **SQL Editor**, paste and run `supabase/schema.sql` **once** in a new project. It creates all tables, RLS policies, public seed content and a `clinic-media` bucket for **doctor/clinic marketing photos only**.
3. In **Project Settings → API / API Keys**, copy Project URL and browser-safe **publishable/anon key** into `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy the **service-role secret** into `SUPABASE_SERVICE_ROLE_KEY` on the server only. Never use `NEXT_PUBLIC_` on this secret, never print it in browser code, never commit it to GitHub.
5. Under **Authentication → Providers**, enable Email authentication. Disable public sign-ups (allow only manually provisioned staff accounts). Configure suitable password and MFA policies.

### Create the first clinic administrator

In **Authentication → Users → Add user**, create an admin user with a unique strong password. Copy the UUID that Supabase assigns; then in SQL Editor:

```sql
insert into public.staff_users(user_id, role, doctor_id)
values ('PASTE_REAL_AUTH_USER_UUID_HERE', 'admin', null);
```

**Never put a password or a UUID invented by a code generator into source code.** This is a manually provisioned authorised person, not an open registration form.

To add a doctor-specific account, create that person in **Authentication → Users** and run **one** of:

```sql
insert into public.staff_users(user_id,role,doctor_id)
values ('REAL_DOCTOR_USER_UUID', 'doctor', 'ayushi');
-- OR
insert into public.staff_users(user_id,role,doctor_id)
values ('REAL_DOCTOR_USER_UUID', 'doctor', 'ashwin');
```

The `admin` account manages both doctors; doctor accounts can view/update only their own appointments and profile. For reliable staff access, set up a clinic-owned recovery and offboarding procedure. Supabase Auth email/password alone is **not** sufficient to access the dashboard; the user must also have a `staff_users` record.

## 3 · Configure abuse protection

Cloudflare Turnstile is **strongly recommended before accepting patient requests publicly**. Create a Turnstile site for your domain, then provide **both**:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=YOUR_SITE_KEY
TURNSTILE_SECRET_KEY=YOUR_PRIVATE_SECRET
```

The booking form renders the widget if the public key is present. The server verifies it if the private key is present. Set **both or neither**; for production, set **both**. The included honeypot and same-origin checks are helpful but not sufficient alone for a public medical practice.

In Cloudflare Turnstile, allow your final `*.vercel.app` hostname during testing and the production domain when launched.

## 4 · Deploy GitHub → Vercel

1. Push project files (excluding `.env.local` and `node_modules`) to GitHub.
2. In Vercel choose **Add New → Project → Import Git Repository**.
3. Vercel should recognise **Next.js**; use `npm run build`, default output settings.
4. Add the following **Environment Variables** for Production (and Preview if needed):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret, private)
   - `NEXT_PUBLIC_SITE_URL` (full `https://...` URL)
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` when enabled
5. Deploy. Re-deploy after changing environment variables. After attaching your custom domain, update `NEXT_PUBLIC_SITE_URL` and Turnstile's allowed hostnames.
6. Visit `https://YOUR_DOMAIN/admin` to log in. **Press F5** to verify you're returned to the login screen. Test 15-min idle lockout and admin/doctor data isolation.

## 5 · Pre-launch checklist

1. Independently verify **both doctors' medical credentials**, registrations, consultation hours and service availability before entering them in Admin. Blank qualifications/registrations deliberately remain unpublished.
2. Verify each individual Google Business Profile URL and confirm the supplied rating snapshots/review excerpts are accurate. Enter those links in the doctor editor. No review URLs are invented.
3. Obtain permission for all doctor and clinic photos. Hero stock photo is illustrative, **not** the actual clinic; replace with a verified clinic photo if possible.
4. Have clinic management approve actual data retention and privacy/legal text in `/privacy` and `/terms`. These are **clearly marked drafts**, not approved legal notices. Review Indian data-protection requirements and Supabase region/transfer considerations with qualified counsel.
5. Complete CAPTCHA, access controls, password/MFA and an operational process to handle enquiries. Avoid sending patient data in email or browser logs.
6. Submit a test enquiry for each doctor; inspect the two appointments in Admin; confirm only the appropriate doctor sees their enquiries. Status updates **do not send SMS or WhatsApp**—staff should call the patient.
7. Confirm `/admin` is not indexed, settings changes are reflected on public pages, mobile CTAs work, and public pages display separate doctor reviews and numbers.
8. Set production monitoring, backup and a data-retention/deletion process. Restrict who can access Supabase/Vercel dashboards and keys.

## 6 · Project map

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Homepage |
| `src/app/doctors/[slug]/page.tsx` | Doctor profile routes |
| `src/app/specialties/[slug]/page.tsx` | Service routes |
| `src/components/book-form.tsx` | Appointment form |
| `src/app/api/appointments/route.ts` | Server-only appointment endpoint |
| `src/app/admin/page.tsx` | Role-aware admin dashboard |
| `src/lib/supabase-browser.ts` | Temporary memory-only admin login |
| `src/lib/public-data.ts` | Dynamic public Supabase data reader |
| `src/lib/site.ts` | Default clinic content; helps previews |
| `supabase/schema.sql` | Tables, sample records, role permissions and Row Level Security |
| `.env.example` | Safe variable names (replace values locally) |

## Operational and security notes

- **No hardcoded admin credentials**: create accounts in Supabase Auth and authorise them via `staff_users`.
- **Service-role key stays server-side**: the browser only receives the public Supabase key. Public form POSTs go through a validated Next.js server route; anonymous users cannot read bookings from Supabase directly.
- **Refresh logout**: a browser refresh drops the *local* memory-only session so the interface requires reauthentication. Previously issued Supabase server JWTs are **not instantly revoked on reload**; they naturally expire unless explicitly signed out. Database RLS independently secures authorised reads/writes.
- **No patient portal or health record system**: patients cannot log in or see other people's data. The message field is intentionally minimal, with a warning not to include detailed medical history.
- **Data lifecycle**: the app itself does not automate deletion or notification; clinic management must implement compliant policies and operational controls.
- For change previews, use a **non-production Supabase project** or review appropriate staging separation before letting Vercel Preview deployments accept real patient data.

## Local checks

```bash
npm run typecheck
npm run build
```

These require dependencies installed. This package was code-reviewed and checked for TypeScript/JSX syntax, but **not** live-tested against your own Supabase credentials or Vercel environment. End-to-end test the two booking flows before launch.
