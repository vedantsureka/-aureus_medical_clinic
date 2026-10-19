import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie, deleteCookie } from '@tanstack/react-start/server';
import { createHmac, timingSafeEqual, scryptSync, randomBytes } from 'node:crypto';
import { z } from 'zod';

const COOKIE = 'aureus_admin';
const IDLE_MS = 15 * 60 * 1000;
const schema = z.object({
  doctor: z.enum(['ayushi', 'ashwin']), name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/),
  email: z.union([z.literal(''), z.string().email().max(120)]),
  type: z.string().min(1).max(100), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/), message: z.string().max(500),
  consent: z.literal(true), website: z.string().max(100).optional().default(''),
});
function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Server database is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  return { url: url.replace(/\/$/, ''), key };
}
async function db(path: string, method = 'GET', body?: unknown) {
  const { url, key } = config();
  const r = await fetch(`${url}/rest/v1/${path}`, { method,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type':'application/json', Prefer: method === 'POST' ? 'return=representation' : 'return=minimal', 'Cache-Control':'no-store' },
    body: body === undefined ? undefined : JSON.stringify(body), cache: 'no-store',
  });
  if (!r.ok) { console.error('Database request failed', r.status, await r.text()); throw new Error('Database request failed'); }
  return r.status === 204 ? null : r.json();
}
function secret() { const s = process.env.ADMIN_SESSION_SECRET; if (!s || s.length < 32) throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters'); return s; }
function signature(text: string) { return createHmac('sha256', secret()).update(text).digest('hex'); }
function issue() {
  const payload = Buffer.from(JSON.stringify({ iat: Date.now(), nonce: randomBytes(12).toString('hex') })).toString('base64url');
  setCookie(COOKIE, `${payload}.${signature(payload)}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 900 });
}
function authorize(refresh = true) {
  const cookie = getCookie(COOKIE);
  if (!cookie) return false;
  const [payload, mac] = cookie.split('.');
  if (!payload || !mac || !/^[a-f0-9]{64}$/.test(mac)) return false;
  const expected = signature(payload);
  if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false;
  try {
    const v = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { iat: number };
    if (!Number.isFinite(v.iat) || Date.now() - v.iat > IDLE_MS || v.iat > Date.now() + 1000) return false;
  } catch { return false; }
  if (refresh) issue();
  return true;
}
export const requestAppointment = createServerFn({ method:'POST' }).inputValidator((v: unknown) => schema.parse(v)).handler(async ({ data }) => {
  if (data.website) return { ok: true };
  if (new Date(`${data.date}T23:59:59+05:30`).getTime() < Date.now()) throw new Error('Choose a future date');
  await db('appointments', 'POST', { doctor: data.doctor, patient_name: data.name, mobile: data.mobile, email: data.email || null, consultation_type: data.type, preferred_date: data.date, preferred_time: data.time, message: data.message || null, status:'new' });
  return { ok: true };
});
export const adminLogin = createServerFn({ method:'POST' }).inputValidator((v: unknown) => z.object({ username:z.string(), password:z.string() }).parse(v)).handler(async ({data}) => {
  const user = process.env.ADMIN_USERNAME || '';
  const hash = process.env.ADMIN_PASSWORD_SCRYPT || '';
  const [salt, digest] = hash.split(':');
  const check = salt && digest && /^[0-9a-f]{128}$/.test(digest) ? scryptSync(data.password, salt, 64).toString('hex') : '0'.repeat(128);
  const same = timingSafeEqual(Buffer.from(check), Buffer.from(digest && /^[0-9a-f]{128}$/.test(digest) ? digest : '0'.repeat(128)));
  if (!user || !same || data.username !== user) throw new Error('Invalid username or password');
  issue(); return { ok:true };
});
export const adminSession = createServerFn({ method:'GET' }).handler(async () => ({ authenticated: authorize() }));
export const adminLogout = createServerFn({ method:'POST' }).handler(async () => { deleteCookie(COOKIE, { path:'/' }); return {ok:true}; });
export const adminAppointments = createServerFn({ method:'GET' }).handler(async () => {
  if (!authorize()) throw new Error('Unauthorized');
  return await db('appointments?select=id,doctor,patient_name,mobile,email,consultation_type,preferred_date,preferred_time,message,status,created_at&order=created_at.desc&limit=500') as Appointment[];
});
export const adminUpdateAppointment = createServerFn({method:'POST'}).inputValidator((v:unknown) => z.object({id:z.string().uuid(),status:z.enum(['new','contacted','confirmed','completed','cancelled'])}).parse(v)).handler(async ({data}) => {
  if (!authorize()) throw new Error('Unauthorized');
  await db(`appointments?id=eq.${encodeURIComponent(data.id)}`, 'PATCH', { status:data.status });
  return {ok:true};
});
export type Appointment = {id:string;doctor:'ayushi'|'ashwin';patient_name:string;mobile:string;email:string|null;consultation_type:string;preferred_date:string;preferred_time:string;message:string|null;status:string;created_at:string};
