# Aureus Clinic — deployment and admin setup

The original visual style is retained. Two clinicians share the homepage and clinic profile; appointment requests specify a doctor. Admin dashboard: `/admin`.

## Persistent storage

Create a Supabase project and run `database/supabase.sql` in its SQL editor. Populate the four server-side environment variables shown in `.env.example` in your hosting environment (e.g. Vercel project settings). **Do not use `VITE_` prefixes** for secrets. **Do not commit `.env` or keys.** Requests won't submit until the database is configured; this is intentional rather than falsely claiming they were saved.

## Create admin credentials

Choose a unique admin username and a strong password (16+ characters). Generate salt and scrypt password hash with:

```bash
node -e "const c=require('node:crypto');const p=process.argv[1];const salt=c.randomBytes(16).toString('hex');console.log(salt+':'+c.scryptSync(p,salt,64).toString('hex'))" 'YOUR_LONG_PRIVATE_PASSWORD'
```

Set output to `ADMIN_PASSWORD_SCRYPT`. Generate a session signing secret via `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"` and set it as `ADMIN_SESSION_SECRET`. Log in at `/admin`. Sessions are HTTP-only signed cookies; the server rejects them after 15 minutes without a successful authenticated request. The dashboard uses human keyboard, pointer, touch and scroll activity to detect inactivity, clears the dashboard after 15 minutes and makes periodic authenticated renewal requests only when human activity has occurred. Refreshing the page does not reset the server-side cookie expiry.

## Privacy and operations

Supabase row-level security denies browser access; only server-side service-role queries are used. Never share admin credentials. This project intentionally does not expose public appointment reads or updates. Check your region, storage retention period, privacy notice and legitimate access controls before handling patients' personal information. Add anti-spam/rate limiting at your deployment edge prior to production use. Appointment submissions are requests only, not confirmed slots. Credentials, live database and hosting configuration are not contained in the ZIP.
