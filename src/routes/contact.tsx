import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { requestAppointment } from "@/lib/appointments.server";
import { z } from "zod";
import { Phone, MapPin, Navigation, MessageCircle } from "lucide-react";
import { clinic, doctors, consultationTypes, directionsLink } from "@/lib/clinic";
import { PageHero, Btn, LocationBlock, seo } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("Book an Appointment | Aureus Medical Clinic, Marine Lines", "Request a consultation with Dr. Ayushi Thaker or Dr. Ashwin Joshi at Aureus Medical Clinic, Marine Lines, Mumbai. Call +91 91378 95139.", "/contact"),
  component: Contact,
});

const schema = z.object({
  doctor: z.enum(["ayushi", "ashwin"]),
  name: z.string().trim().min(2, "Please enter the patient's name").max(80),
  mobile: z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email").max(120).or(z.literal("")),
  type: z.string().min(1, "Choose a consultation type"),
  date: z.string().min(1, "Choose a preferred date"),
  time: z.string().min(1, "Choose a preferred time"),
  message: z.string().max(500, "Keep the message under 500 characters"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) }),
});

const field = "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-primary outline-none transition focus:border-secondary focus:ring-2 focus:ring-ring/30";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const r = schema.safeParse({ ...Object.fromEntries(fd), consent: fd.get("consent") === "on" });
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setSending(true);
    setServerError("");
    try {
      await requestAppointment({data: {...r.data, website: ""}});
      setSent(true);
    } catch {
      setServerError("Unable to save the request right now. Please call the clinic instead.");
    } finally { setSending(false); }
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHero eyebrow="Contact & appointments" title="Request a consultation" sub="Share a few details and the clinic will contact you to confirm your appointment." />
      <section className="container-x grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-deep p-8 text-primary-foreground shadow-lift">
            <p className="font-serif text-2xl italic text-accent">Dr. Ayushi Thaker & Dr. Ashwin Joshi</p>
            <p className="mt-1 font-display font-semibold">{clinic.name}</p>
            <a href={clinic.phoneTel} className="mt-6 flex items-center gap-3 text-lg font-semibold"><Phone className="h-5 w-5 text-accent" />{clinic.phoneDisplay}</a>
            <p className="mt-4 flex gap-3 text-sm opacity-85"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />Ground Floor, Shop No. 2, Singapuri Building, 609, Jagannath Shankar Seth Road, Opposite Wadia Fire Temple, Marine Lines East, Bhangwadi, Mumbai – 400002.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href={clinic.phoneTel} variant="gold"><Phone className="h-4 w-4" />Call Now</Btn>
              <Btn href={directionsLink} variant="light"><Navigation className="h-4 w-4" />Directions</Btn>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">For medical emergencies, call 112 or visit the nearest hospital. Please do not share detailed medical history through this form.</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
          {sent ? (
            <div className="py-10 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-secondary" />
              <h2 className="mt-4 text-2xl font-bold">Request received</h2>
              <p className="mt-3 text-muted-foreground">Your appointment enquiry has been saved and is visible to the clinic team. The team will contact you to confirm availability. This is not a confirmed booking.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Btn href={clinic.phoneTel}>Or call the clinic</Btn>
                <button onClick={() => setSent(false)} className="rounded-full px-6 py-3 text-sm font-semibold text-secondary">Edit request</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <label className="text-sm font-semibold text-primary sm:col-span-2">Choose your doctor *
                <select name="doctor" defaultValue="ayushi" className={field}>{doctors.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}</select><Err k="doctor" />
              </label>
              <label className="text-sm font-semibold text-primary sm:col-span-2">Patient name *<input name="name" className={field} /><Err k="name" /></label>
              <label className="text-sm font-semibold text-primary">Mobile number *<input name="mobile" type="tel" inputMode="tel" className={field} /><Err k="mobile" /></label>
              <label className="text-sm font-semibold text-primary">Email (optional)<input name="email" type="email" className={field} /><Err k="email" /></label>
              <label className="text-sm font-semibold text-primary sm:col-span-2">Consultation type *
                <select name="type" defaultValue="" className={field}>
                  <option value="" disabled>Select…</option>
                  {consultationTypes.map((t) => <option key={t}>{t}</option>)}
                </select><Err k="type" />
              </label>
              <label className="text-sm font-semibold text-primary">Preferred date *<input name="date" type="date" min={today} className={field} /><Err k="date" /></label>
              <label className="text-sm font-semibold text-primary">Preferred time *<input name="time" type="time" className={field} /><Err k="time" /></label>
              <label className="text-sm font-semibold text-primary sm:col-span-2">Message (optional)<textarea name="message" rows={3} maxLength={500} className={field} placeholder="Brief reason for visit — no detailed medical history please" /><Err k="message" /></label>
              <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
                <input name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-[var(--secondary)]" />
                <span>I agree to the <Link to="/privacy" className="font-semibold text-secondary underline">privacy policy</Link>.</span>
              </label>
              <div className="sm:col-span-2"><Err k="consent" /></div>
              {serverError && <p role="alert" className="text-sm text-destructive sm:col-span-2">{serverError}</p>}
              <button disabled={sending} type="submit" className="rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground transition hover:bg-secondary sm:col-span-2">{sending ? "Saving request…" : "Send Appointment Request"}</button>
            </form>
          )}
        </div>
      </section>
      <LocationBlock />
    </>
  );
}
