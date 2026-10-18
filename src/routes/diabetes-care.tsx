import { createFileRoute } from "@tanstack/react-router";
import careImg from "@/assets/care.jpg";
import { PageHero, Btn, Reveal, SectionHead, FaqList, CtaBanner, Icon, seo } from "@/components/site";

export const Route = createFileRoute("/diabetes-care")({
  head: () => seo("Diabetes Care in Marine Lines, Mumbai | Dr. Ayushi Rajendra Thaker", "Diabetes consultations, blood sugar monitoring guidance, lifestyle advice and follow-up care at Aureus Medical Clinic, Marine Lines.", "/diabetes-care"),
  component: Diabetes,
});

const blocks = [
  { i: "Info", t: "What is diabetes?", d: "Diabetes is a long-term condition in which the body has difficulty regulating blood sugar (glucose), either because it makes too little insulin or cannot use it effectively." },
  { i: "GitCompare", t: "Type 1 and Type 2", d: "Type 1 diabetes usually begins earlier in life and requires insulin. Type 2 is more common in adults, is linked to genetics and lifestyle, and may be managed with lifestyle changes, tablets and sometimes insulin." },
  { i: "Gauge", t: "Monitoring blood sugar", d: "Regular checks — home readings and periodic HbA1c tests — help you and your doctor understand how well your plan is working." },
  { i: "Salad", t: "Lifestyle & nutrition", d: "Balanced meals, regular timings, portion awareness, physical activity and good sleep all support steadier sugar levels." },
  { i: "CalendarClock", t: "Routine follow-up", d: "Scheduled reviews allow medicines and goals to be adjusted as your needs change." },
  { i: "Eye", t: "Long-term health monitoring", d: "Periodic checks of eyes, kidneys, feet, blood pressure and cholesterol help detect complications early." },
];

// General educational reference ranges (fasting plasma glucose, mg/dL) — per commonly used ADA criteria.
const ranges = [
  { label: "Typical", v: "< 100", w: "40%", c: "bg-secondary" },
  { label: "Prediabetes range", v: "100–125", w: "65%", c: "bg-accent" },
  { label: "Diabetes range", v: "≥ 126", w: "90%", c: "bg-primary" },
];

function Diabetes() {
  return (
    <>
      <PageHero eyebrow="Diabetes care" title="Diabetes Care & Lifestyle Health in Marine Lines" sub="Structured, personalised consultations for blood sugar management, lifestyle guidance and long-term follow-up.">
        <Btn to="/contact">Book a Diabetes Consultation</Btn>
      </PageHero>
      <section className="container-x grid gap-6 py-20 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map((b) => (
          <Reveal key={b.t} className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-lift">
            <Icon name={b.i} className="h-7 w-7 text-secondary" />
            <h2 className="mt-4 text-xl font-bold">{b.t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
          </Reveal>
        ))}
      </section>
      <section className="bg-muted py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="For education only" title="Understanding fasting glucose ranges" sub="General reference values for fasting plasma glucose (mg/dL). Diagnosis requires a doctor's assessment and confirmatory testing." />
            <div className="mt-8 space-y-5">
              {ranges.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-sm font-semibold text-primary"><span>{r.label}</span><span>{r.v}</span></div>
                  <div className="mt-2 h-3 rounded-full bg-card"><div className={`h-3 rounded-full ${r.c}`} style={{ width: r.w }} /></div>
                </div>
              ))}
            </div>
          </div>
          <img src={careImg} alt="Blood glucose check during a diabetes consultation (representative image)" width={1280} height={960} loading="lazy" className="rounded-[2rem] shadow-lift" />
        </div>
      </section>
      <section className="container-x py-20">
        <SectionHead eyebrow="When to consult" title="When to see a physician" />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {["Excessive thirst or frequent urination", "Unexplained weight loss or fatigue", "Slow-healing wounds or frequent infections", "Family history of diabetes and wanting screening", "Home readings consistently outside your target", "Questions about your current medicines"].map((x) => (
            <li key={x} className="rounded-2xl border border-border bg-card p-5 text-primary">{x}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">Seek emergency care for confusion, fainting, very high or very low sugar readings, or vomiting with drowsiness. This website does not provide individual medical diagnosis.</p>
        <h2 className="mb-6 mt-16 text-3xl font-bold">Diabetes care FAQs</h2>
        <FaqList items={[
          { q: "How often should I have a diabetes follow-up?", a: "This varies with your condition and treatment; your doctor will advise a suitable interval." },
          { q: "Can Type 2 diabetes be managed with lifestyle changes?", a: "Lifestyle changes are an important part of management for many people. Whether medicines are also needed depends on individual assessment." },
          { q: "What should I bring to my consultation?", a: "Recent reports, your home glucose log and a list of current medicines." },
        ]} />
      </section>
      <CtaBanner />
    </>
  );
}
