import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/clinic";
import { PageHero, Reveal, Icon, Verify, CtaBanner, seo } from "@/components/site";

export const Route = createFileRoute("/services/")({
  head: () => seo("Treatments & Services | Physician in Marine Lines, Mumbai", "General physician, diabetes care, vaccination, preventive healthcare and lifestyle consultations at Aureus Medical Clinic, Marine Lines.", "/services"),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Treatments & services" title="Care for everyday health and long-term wellbeing" sub="Explore the consultations offered at Aureus Medical Clinic. Final scope of each service is subject to clinic confirmation." />
      <section className="container-x grid gap-5 py-20 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex gap-6 rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lift">
              <span className="font-serif text-4xl italic text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3"><Icon name={s.icon} className="h-5 w-5 text-secondary" /><h2 className="text-xl font-bold">{s.title}</h2></div>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                {s.confirm && <div className="mt-3"><Verify>Subject to clinic confirmation</Verify></div>}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <CtaBanner />
    </>
  );
}
