import { createFileRoute, Link } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { Lock, LogOut, RefreshCw, Search } from 'lucide-react';
import { adminLogin, adminLogout, adminSession, adminAppointments, adminUpdateAppointment, type Appointment } from '@/lib/appointments.server';
import { doctors } from '@/lib/clinic';

export const Route = createFileRoute('/admin')({ component: Admin, head: () => ({ meta: [{title:'Clinic Administration | Aureus'}, {name:'robots',content:'noindex,nofollow'}] }) });
const input = 'w-full rounded-xl border border-input bg-background px-4 py-3 text-sm';
const statuses = ['new','contacted','confirmed','completed','cancelled'];
function Admin() {
  const [authenticated,setAuthenticated] = useState(false);
  const [loading,setLoading] = useState(true);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [items,setItems] = useState<Appointment[]>([]);
  const [doctor,setDoctor] = useState('all');
  const [search,setSearch] = useState('');
  const [status,setStatus] = useState('all');
  const load = useCallback(async () => { try { const data = await adminAppointments(); setItems(data); } catch { setAuthenticated(false); setError('Session expired. Please sign in again.'); } }, []);
  useEffect(() => { let active=true; adminSession().then(x=>{ if(active) {setAuthenticated(x.authenticated);setLoading(false);} }).catch(()=>{if(active)setLoading(false)}); return ()=>{active=false}; }, []);
  useEffect(()=>{if(authenticated) void load();},[authenticated,load]);
  useEffect(() => {
    if (!authenticated) return;
    let lastActivity = Date.now();
    let lastRefresh = Date.now();
    let ending = false;
    const activity = () => {
      if (ending) return;
      if (Date.now() - lastActivity >= 900000) { expire(); return; }
      lastActivity = Date.now();
      if (Date.now() - lastRefresh >= 60000) {
        lastRefresh = Date.now();
        void adminSession().then(s => { if (!s.authenticated) expire(); }).catch(expire);
      }
    };
    function expire() {
      if (ending) return;
      ending = true;
      void adminLogout().catch(() => undefined);
      setAuthenticated(false); setItems([]);
      setError('Session expired after 15 minutes of inactivity.');
    }
    const timer = setInterval(() => {if (Date.now() - lastActivity >= 900000) expire();}, 5000);
    for (const event of ['pointerdown','keydown','scroll','touchstart']) window.addEventListener(event, activity, {passive:true});
    return () => {clearInterval(timer); for (const event of ['pointerdown','keydown','scroll','touchstart']) window.removeEventListener(event, activity);};
  }, [authenticated]);

  async function login(e:React.FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true);setError(''); const data=new FormData(e.currentTarget);try {await adminLogin({data:{username:String(data.get('username')),password:String(data.get('password'))}});setAuthenticated(true);}catch{setError('Incorrect credentials or the admin service is not configured.');}finally{setBusy(false);} }
  async function logout(){try{await adminLogout();}finally{setAuthenticated(false);setItems([]);}}
  async function change(id:string, value: string){try{await adminUpdateAppointment({data:{id,status:value as 'new'|'contacted'|'confirmed'|'completed'|'cancelled'}});setItems(a=>a.map(x=>x.id===id?{...x,status:value}:x));}catch{setAuthenticated(false);setItems([]);setError('Session expired. Please sign in again.');}}
  const visible=items.filter(a=>(doctor==='all'||a.doctor===doctor)&&(status==='all'||a.status===status)&&`${a.patient_name} ${a.mobile} ${a.consultation_type}`.toLowerCase().includes(search.toLowerCase()));
  return <main className="min-h-[70vh] bg-muted py-12"><div className="container-x">
    {loading ? <p>Checking session…</p> : !authenticated ? <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft"><Lock className="mb-4 text-secondary"/><h1 className="text-3xl font-bold">Clinic admin login</h1><p className="mt-2 text-sm text-muted-foreground">Only authorised clinic staff can view appointment enquiries. Sessions expire after 15 minutes of inactivity.</p><form onSubmit={login} className="mt-8 space-y-4"><label className="block text-sm font-semibold">Username<input name="username" autoComplete="username" required className={`${input} mt-2`}/></label><label className="block text-sm font-semibold">Password<input name="password" type="password" autoComplete="current-password" required className={`${input} mt-2`}/></label>{error&&<p role="alert" className="text-sm text-destructive">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">{busy?'Signing in…':'Sign in'}</button></form></div> : <>
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">Private clinic dashboard</p><h1 className="mt-2 text-3xl font-bold">Appointment enquiries</h1><p className="mt-2 text-sm text-muted-foreground">{items.length} received · Log out automatically after 15 minutes without an authenticated request</p></div><div className="flex gap-2"><button onClick={()=>void load()} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"><RefreshCw size={16}/>Refresh</button><button onClick={()=>void logout()} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground"><LogOut size={16}/>Log out</button></div></div>
    <div className="mt-8 grid gap-3 rounded-2xl bg-card p-4 md:grid-cols-3"><label className="flex items-center gap-2"><Search size={18}/><input aria-label="Search enquiries" placeholder="Search patient or number" className={input} value={search} onChange={e=>setSearch(e.target.value)}/></label><select aria-label="Doctor filter" className={input} value={doctor} onChange={e=>setDoctor(e.target.value)}><option value="all">Both doctors</option>{doctors.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select><select aria-label="Status filter" className={input} value={status} onChange={e=>setStatus(e.target.value)}><option value="all">All statuses</option>{statuses.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
    <div className="mt-6 grid gap-4">{visible.map(a=><article key={a.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString('en-IN')}</p><h2 className="mt-1 text-xl font-bold">{a.patient_name}</h2><p className="text-sm text-secondary">{doctors.find(d=>d.id===a.doctor)?.name}</p></div><select aria-label={`Status for ${a.patient_name}`} value={a.status} onChange={e=>void change(a.id,e.target.value)} className="rounded-xl border border-input bg-background px-4 py-2">{statuses.map(s=><option key={s} value={s}>{s}</option>)}</select></div><div className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4"><p><strong>Mobile:</strong> <a href={`tel:${a.mobile}`} className="text-secondary underline">{a.mobile}</a></p><p><strong>Email:</strong> {a.email||'—'}</p><p><strong>Visit:</strong> {a.preferred_date} · {a.preferred_time}</p><p><strong>Type:</strong> {a.consultation_type}</p></div>{a.message&&<p className="mt-4 rounded-xl bg-muted p-3 text-sm">{a.message}</p>}</article>)}{!visible.length&&<p className="rounded-2xl bg-card p-10 text-center text-muted-foreground">No matching enquiries.</p>}</div>
    </>}
    <p className="mt-8 text-center text-xs text-muted-foreground">Confidential patient data. Access only from a trusted device. <Link to="/" className="underline">Return to website</Link></p>
  </div></main>;
}
