import { createFileRoute, notFound } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";
import { services } from "@/lib/clinic";
import { PageHero, Btn, Reveal, FaqList, CtaBanner, Verify, seo } from "@/components/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(`${loaderData.title} in Marine Lines, Mumbai | Aureus Medical Clinic`, loaderData.short, `/services/${params.slug}`)
      : { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] },
  component: ServicePage,
});

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="rounded-3xl border border-border bg-card p-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((x) => <li key={x} className="flex gap-3 text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-secondary" />{x}</li>)}
      </ul>
    </Reveal>
  );
}

function ServicePage() {
  const s = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Service" title={s.title} sub={s.intro}>
        <Btn to="/contact">Enquire about this service</Btn>
        {s.confirm && <Verify>Subject to clinic confirmation</Verify>}
      </PageHero>
      <section className="container-x space-y-6 py-20">
        {s.notice && (
          <div className="flex gap-4 rounded-3xl border border-destructive/40 bg-destructive/5 p-6 text-primary">
            <AlertTriangle className="h-6 w-6 shrink-0 text-destructive" /><p className="font-semibold">{s.notice}</p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          <List title="Common reasons to consult" items={s.reasons} />
          <List title="What you can discuss" items={s.discuss} />
          <List title="General preventive advice" items={s.advice} />
        </div>
        <p className="text-sm text-muted-foreground">This information is general and does not replace an individual medical consultation.</p>
        <div className="pt-8">
          <h2 className="mb-6 text-3xl font-bold">Frequently asked questions</h2>
          <FaqList items={s.faqs} />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
