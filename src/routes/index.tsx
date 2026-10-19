import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Quote, ArrowRight, Check } from "lucide-react";
import clinicImg from "@/assets/clinic.jpg";
import careImg from "@/assets/care.jpg";
import { clinic, doctors, services, testimonials, credentials, reviewsLink } from "@/lib/clinic";
import { Btn, Reveal, SectionHead, RatingBadge, DoctorSlideshow, CtaBanner, LocationBlock, Icon, Verify, seo } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => seo(
    "Dr. Ayushi Thaker & Dr. Ashwin Joshi | Aureus Medical Clinic, Mumbai",
    "Meet Dr. Ayushi Rajendra Thaker and Dr. Ashwin Joshi for physician, diabetes, vaccination and orthopaedic consultations at Aureus Medical Clinic in Marine Lines, Mumbai.",
    "/",
  ),
  component: Home,
});

const trust = [
  { i: "Stethoscope", t: "Physician-led Medical Care" },
  { i: "Activity", t: "Diabetes & Lifestyle Health" },
  { i: "Syringe", t: "Vaccination Services" },
  { i: "MapPin", t: "Convenient Marine Lines Location" },
];
const why = [
  { i: "UserRound", t: "Personalised consultations", d: "Time to understand your concerns and history." },
  { i: "ShieldCheck", t: "Preventive care approach", d: "Focus on staying well, not only treating illness." },
  { i: "Stethoscope", t: "Physician-led healthcare", d: "Consult our physician and orthopaedic surgeon." },
  { i: "MapPin", t: "Convenient location", d: "Opposite Wadia Fire Temple, Marine Lines East." },
  { i: "HeartHandshake", t: "Supportive experience", d: "A calm, welcoming clinic environment." },
  { i: "CalendarCheck", t: "Easy appointment enquiries", d: "Call or request online in under a minute." },
];

function Home() {
  return (
    <>
      <section className="bg-hero relative overflow-hidden">
        <div className="container-x grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow reveal">Welcome to Aureus Medical Clinic</p>
            <h1 className="reveal mt-5 text-5xl font-extrabold leading-[1.02] md:text-7xl">
              Compassionate Care. <span className="font-serif font-normal italic text-secondary">Healthier</span> Lives.
            </h1>
            <p className="reveal mt-6 font-display text-xl font-semibold text-primary/85">Physician, Diabetes, Orthopaedic & Vaccination Care in Marine Lines, Mumbai.</p>
            <p className="reveal mt-4 max-w-xl text-muted-foreground">
              Consult Dr. Ayushi Rajendra Thaker for physician, diabetes and preventive healthcare, or Dr. Ashwin Joshi for orthopaedic care, fractures, joint treatment and sports medicine.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Btn to="/contact">Book a Consultation <ArrowRight className="h-4 w-4" /></Btn>
              <Btn href={clinic.phoneTel} variant="outline"><Phone className="h-4 w-4" />Call the Clinic</Btn>
            </div>
          </div>
          <div className="relative reveal">
            <DoctorSlideshow />
            <div className="absolute -bottom-6 left-0 md:-left-10"><RatingBadge /></div>
          </div>
        </div>
        <div className="border-y border-border/70 bg-card/70">
          <div className="container-x grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
            {trust.map((t) => (
              <div key={t.t} className="flex items-center gap-3 text-sm font-semibold text-primary">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-secondary"><Icon name={t.i} className="h-5 w-5" /></span>{t.t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="Meet our team" title="Two doctors. One caring clinic." sub="Select the expertise that best suits your needs." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">{doctors.map(d => <div key={d.id} className="rounded-3xl border border-border bg-card p-8 shadow-soft"><p className="eyebrow">{d.specialty}</p><h3 className="mt-3 text-2xl font-bold">{d.name}</h3><p className="mt-4 text-muted-foreground">{d.description}</p><div className="mt-6 flex gap-3"><Btn to="/contact">Request appointment</Btn><Btn href={d.tel} variant="outline">Call</Btn></div></div>)}</div>
      </section>
      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={clinicImg} alt="Calm consultation room at Aureus Medical Clinic (representative image)" width={1280} height={960} loading="lazy" className="rounded-[2rem] object-cover shadow-lift" />
          <div className="absolute -bottom-8 right-6 hidden w-56 rounded-2xl bg-card p-5 shadow-lift md:block">
            <p className="font-serif text-3xl italic text-secondary">Aureus</p>
            <p className="text-xs text-muted-foreground">Marine Lines, Mumbai</p>
          </div>
        </Reveal>
        <div>
          <SectionHead eyebrow="Meet our doctors" title="Two specialists, one clinic" />
          <Reveal>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Dr. Ayushi Rajendra Thaker offers general physician, diabetes, vaccination and preventive care consultations. Dr. Ashwin Joshi provides orthopaedic care, including fracture treatment, joint replacement, arthroscopy and sports medicine. Together, they help patients find the right care at Aureus Medical Clinic in Marine Lines.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {doctors.map((d) => <span key={d.id} className="rounded-xl border border-border bg-card px-4 py-2 font-display text-sm font-semibold text-primary">{d.name} · {d.specialty}</span>)}
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="/about">Meet Both Doctors</Btn>
              <Btn to="/contact" variant="outline">Book Consultation</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-x">
          <SectionHead center eyebrow="Expertise & services" title="Comprehensive Care for Every Stage of Life" sub="Final scope of each service is subject to confirmation by the clinic." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Reveal key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground"><Icon name={s.icon} className="h-6 w-6" /></span>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                  {s.confirm && <div className="mt-3"><Verify>Subject to clinic confirmation</Verify></div>}
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary">Learn more & enquire <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <SectionHead eyebrow="Why patients choose us" title="Why Patients Choose Aureus Medical Clinic" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <div key={w.t} className="bg-card p-8 transition-colors hover:bg-muted/60">
              <Icon name={w.i} className="h-7 w-7 text-accent" />
              <h3 className="mt-4 text-lg font-bold">{w.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Vaccination" title="Protecting Health Through Preventive Vaccination" />
          <ul className="mt-8 space-y-3">
            {["Adult vaccination enquiries", "Childhood vaccination enquiries", "Routine immunisation planning", "Vaccine schedule discussions", "Travel-related vaccine enquiries (if available)"].map((x) => (
              <li key={x} className="flex items-center gap-3 text-primary"><span className="grid h-6 w-6 place-items-center rounded-full bg-secondary/15 text-secondary"><Check className="h-3.5 w-3.5" /></span>{x}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Vaccine availability and suitability are confirmed during consultation.</p>
          <div className="mt-8"><Btn to="/vaccinations">Enquire About Vaccination</Btn></div>
        </div>
        <Reveal><img src={careImg} alt="Physician reviewing a blood sugar reading with a patient (representative image)" width={1280} height={960} loading="lazy" className="rounded-[2rem] object-cover shadow-lift" /></Reveal>
      </section>

      <CtaBanner />
      <LocationBlock />
    </>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-deep py-24 text-primary-foreground">
      <div className="container-x text-center">
        <p className="eyebrow text-accent">Patient testimonials</p>
        <h2 className="mt-3 text-3xl font-bold text-primary-foreground md:text-5xl">Kind Words from Our Patients</h2>
        <p className="mt-4 opacity-75">5.0/5 rating based on {clinic.reviewCount} Google reviews (listing snapshot)</p>
        <div className="mx-auto mt-12 min-h-[160px] max-w-3xl">
          <Quote className="mx-auto h-10 w-10 text-accent" />
          <p key={i} className="reveal mt-6 font-serif text-2xl italic leading-relaxed md:text-3xl">“{testimonials[i]}”</p>
          <p className="mt-4 text-sm opacity-60">— Google review</p>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, k) => (
            <button key={k} aria-label={`Show review ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-primary-foreground/30"}`} />
          ))}
        </div>
        <div className="mt-10"><Btn href={reviewsLink} variant="light">Read reviews on Google</Btn></div>
      </div>
    </section>
  );
}
