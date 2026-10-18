import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { clinic, testimonials, reviewsLink } from "@/lib/clinic";
import { PageHero, Btn, Reveal, CtaBanner, seo } from "@/components/site";

export const Route = createFileRoute("/reviews")({
  head: () => seo("Patient Reviews | Dr. Ayushi Rajendra Thaker, Marine Lines", "Read what patients say about Dr. Ayushi Rajendra Thaker and Aureus Medical Clinic — rated 5.0 on Google.", "/reviews"),
  component: Reviews,
});

function Reviews() {
  return (
    <>
      <PageHero eyebrow="Patient reviews" title="Kind Words from Our Patients" />
      <section className="container-x py-20">
        <div className="mx-auto max-w-md rounded-3xl bg-deep p-10 text-center text-primary-foreground shadow-lift">
          <p className="font-display text-7xl font-extrabold">5.0</p>
          <div className="mt-3 flex justify-center text-accent">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-6 w-6 fill-current" />)}</div>
          <p className="mt-3 opacity-80">Based on {clinic.reviewCount} Google reviews</p>
          <p className="mt-1 text-xs opacity-50">Figures from a listing snapshot, not live</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <Quote className="h-8 w-8 text-accent" />
              <p className="mt-4 font-serif text-xl italic leading-relaxed text-primary">“{t}”</p>
              <p className="mt-4 text-sm text-muted-foreground">— Google review</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Btn href={reviewsLink}>Read all reviews on Google</Btn></div>
      </section>
      <CtaBanner />
    </>
  );
}
