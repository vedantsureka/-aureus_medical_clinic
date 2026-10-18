import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { vaccineCatalogue } from "@/lib/clinic";
import { PageHero, Btn, Reveal, SectionHead, FaqList, CtaBanner, Icon, Verify, seo } from "@/components/site";

export const Route = createFileRoute("/vaccinations")({
  head: () => seo("Vaccination Clinic in Marine Lines, Mumbai | Aureus Medical Clinic", "Adult and childhood vaccination enquiries, vaccine counselling and scheduling with Dr. Ayushi Rajendra Thaker in Marine Lines.", "/vaccinations"),
  component: Vacc,
});

const areas = [
  { i: "UserRound", t: "Adult vaccination", d: "Boosters, seasonal and catch-up vaccines for adults." },
  { i: "Baby", t: "Childhood vaccination", d: "Guidance on routine childhood immunisation schedules." },
  { i: "ShieldCheck", t: "Preventive immunisation", d: "Planning vaccines as part of overall preventive care." },
  { i: "MessagesSquare", t: "Vaccine counselling", d: "Discuss questions, concerns and suitability." },
  { i: "CalendarCheck", t: "Scheduling enquiries", d: "Plan due doses and follow-up dates." },
  { i: "ClipboardCheck", t: "Post-vaccination guidance", d: "General advice on what to expect after a dose." },
];

function Vacc() {
  return (
    <>
      <PageHero eyebrow="Vaccinations" title="Vaccination & Preventive Immunisation Services" sub="Personalised vaccination guidance for adults and children in Marine Lines, Mumbai.">
        <Btn to="/contact">Enquire About Vaccination</Btn>
      </PageHero>
      <section className="container-x py-20">
        <div className="flex gap-4 rounded-3xl border border-secondary/30 bg-secondary/5 p-6 text-primary">
          <Info className="h-6 w-6 shrink-0 text-secondary" />
          <p><strong>Important:</strong> Vaccine recommendations depend on age, medical history, national guidelines and clinical assessment. Please enquire before your visit to confirm availability.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <Reveal key={a.t} className="rounded-3xl border border-border bg-card p-8">
              <Icon name={a.i} className="h-7 w-7 text-secondary" />
              <h2 className="mt-4 text-xl font-bold">{a.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-muted py-20">
        <div className="container-x">
          <SectionHead eyebrow="Vaccine catalogue" title="Vaccines you can enquire about" sub="This list is for enquiry purposes. It does not mean every vaccine is in stock." />
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
            {vaccineCatalogue.map((v) => (
              <div key={v.name} className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5 last:border-0">
                <div><p className="font-display font-semibold text-primary">{v.name}</p><p className="text-xs text-muted-foreground">{v.group}</p></div>
                {v.confirmed ? <span className="text-sm font-semibold text-secondary">Available</span> : <Verify>Call to confirm availability</Verify>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x py-20">
        <h2 className="mb-6 text-3xl font-bold">Vaccination FAQs</h2>
        <FaqList items={[
          { q: "Should I bring my vaccination card?", a: "Yes — previous records help the doctor plan the right schedule." },
          { q: "Is mild fever after vaccination normal?", a: "Mild fever or soreness can occur after some vaccines. Contact the clinic if symptoms are severe or persistent." },
          { q: "Can I get a vaccine if I am unwell?", a: "This depends on the illness and the vaccine. The doctor will assess suitability at your visit." },
        ]} />
      </section>
      <CtaBanner />
    </>
  );
}
