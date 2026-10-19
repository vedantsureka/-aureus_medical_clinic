# Security & privacy design decisions

This file explains the boundaries that should be checked before publishing patient-facing forms.

**Anonymous users** only read public clinic/doctor/visible review/published service content. They cannot select from `appointments`; their submissions pass through the Next.js server API route which validates schema, doctor-specific service type, date, consent, honeypot and optional Turnstile token, then inserts using an environment-only service-role key.

**Staff authentication** uses Supabase email/password with a JS-memory-only session. A browser F5 refresh necessarily drops the local token because `persistSession:false`, so the admin screen demands new credentials. This is not a server-side JWT revocation event. A separate 15-minute inactivity timer triggers `signOut`. SQL RLS remains the critical authorization boundary.

**Staff authorization** is an explicit allowlist. Users may sign in only if their `auth.users.id` is manually inserted into `public.staff_users`. The `admin` role can see all appointment requests and update public site content. Doctor accounts can see and update appointments only where the `doctor_id` matches their assigned identity, and update only that doctor's profile. They cannot add staff, edit clinic-level content or access other doctors' enquiries.

**Photo storage** is a public bucket reserved for permitted clinic/doctor marketing photos. It is not suitable for patient media or medical records. An upload policy enforces that assigned doctors upload only under their own paths; `admin` can upload for either doctor. For launch, configure additional image malware/content moderation as appropriate.

**Controls still required before real patients**: a final privacy notice, suitable retention schedule, deletion and incident response policy, staff MFA, infrastructure audit/review, appropriate data region and contractual safeguards, Turnstile configuration, monitoring for spam and reliability, backup and restore testing, secure transfer channels for any sensitive information, and end-to-end functional/permission tests.
