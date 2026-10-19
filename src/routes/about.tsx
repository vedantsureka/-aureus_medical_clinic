import { createFileRoute } from "@tanstack/react-router";
import { credentials, profileFields, services, doctors } from "@/lib/clinic";
import { PageHero, Btn, DoctorPortrait, Reveal, SectionHead, Verify, CtaBanner, LocationBlock, Icon, seo } from "@/components/site";
import { Testimonials } from "./index";

export const Route = createFileRoute("/about")({
  head: () => seo("About Dr. Ayushi Rajendra Thaker | Aureus Medical Clinic, Marine Lines", "Profiles of Dr. Ayushi Rajendra Thaker and Dr. Ashwin Joshi, physician and orthopaedic surgeon at Aureus Medical Clinic, Marine Lines, Mumbai.", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="Physician profile" title="Dr. Ayushi Rajendra Thaker" sub="Physician, Diabetologist and Vaccination Specialist at Aureus Medical Clinic, Marine Lines, Mumbai.">
        <Btn to="/contact">Book Consultation</Btn>
      </PageHero>
      <section className="container-x grid gap-14 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <DoctorPortrait />
        <div className="space-y-12">
          <Reveal>
            <h2 className="text-3xl font-bold">Professional introduction</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Dr. Ayushi Rajendra Thaker is a medical practitioner associated with Aureus Medical Clinic in Marine Lines, Mumbai. Her practice is listed for general physician consultations, diabetes care, vaccination services and preventive health support, with an emphasis on understanding individual patient needs.</p>
            <div className="mt-3"><Verify>Full biography to be confirmed by the doctor</Verify></div>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl font-bold">Medical qualifications</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {credentials.items.map((c) => (
                <div key={c} className="rounded-2xl border border-border bg-card p-5 shadow-soft"><p className="font-display text-lg font-bold text-primary">{c}</p></div>
              ))}
            </div>
            {!credentials.verified && <div className="mt-3"><Verify>Publicly listed — pending confirmation</Verify></div>}
          </Reveal>
          <Reveal>
            <h2 className="text-3xl font-bold">Profile details</h2>
            <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
              {profileFields.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4 p-4 text-sm">
                  <dt className="font-semibold text-primary">{f.label}</dt>
                  <dd>{f.value ?? <Verify>To be confirmed</Verify>}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
      <section className="bg-muted py-20">
        <div className="container-x">
          <SectionHead eyebrow="Practice" title="Areas of clinical practice" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.slice(0, 5).map((s) => (
              <div key={s.slug} className="rounded-2xl bg-card p-6"><Icon name={s.icon} className="h-6 w-6 text-secondary" /><p className="mt-3 font-display font-semibold text-primary">{s.title}</p></div>
            ))}
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <Reveal><h3 className="text-2xl font-bold">Approach to patient care</h3><p className="mt-3 text-muted-foreground">Consultations are centred on listening carefully, explaining options clearly and helping each patient make informed decisions about their own health.</p></Reveal>
            <Reveal><h3 className="text-2xl font-bold">Preventive & lifestyle healthcare</h3><p className="mt-3 text-muted-foreground">Alongside treating illness, the practice places emphasis on vaccination, screening guidance and sustainable lifestyle habits.</p></Reveal>
          </div>
        </div>
      </section>
      <section className="container-x py-20" id="orthopaedics">
        <PageHero eyebrow="Orthopaedic surgeon" title="Dr. Ashwin Joshi" sub="Fracture treatment, joint replacement, arthroscopy and sports medicine in Marine Lines, Mumbai."><Btn to="/contact">Request Orthopaedic Consultation</Btn><Btn href="tel:08097902438" variant="outline">Call Dr. Joshi</Btn></PageHero>
        <div className="grid gap-8 py-12 md:grid-cols-2"><div className="rounded-3xl bg-deep p-10 text-primary-foreground"><p className="font-serif text-6xl italic text-accent">AJ</p><h3 className="mt-5 text-2xl font-bold">Dr. Ashwin Joshi</h3><p className="mt-2 opacity-80">Orthopaedic Surgeon</p><p className="mt-5 opacity-80">Google listing: 5.0 / 5 from 31 reviews (snapshot provided; may change).</p></div><div><h3 className="text-2xl font-bold">Orthopaedic services</h3><div className="mt-6 grid gap-4">{["Fracture treatment", "Joint replacement", "Arthroscopy", "Sports medicine", "Joint pain and injury assessment"].map(x=><div key={x} className="rounded-2xl border border-border p-4 font-semibold">{x}</div>)}</div><p className="mt-5 text-sm text-muted-foreground">Qualifications, available procedures and consultation hours should be verified with the clinic before publishing additional claims.</p></div></div>
      </section>
      <Testimonials />
      <CtaBanner />
      <LocationBlock />
    </>
  );
}
