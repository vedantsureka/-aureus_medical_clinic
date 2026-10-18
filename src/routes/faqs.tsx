import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/clinic";
import { PageHero, FaqList, CtaBanner, seo } from "@/components/site";

export const Route = createFileRoute("/faqs")({
  head: () => seo("FAQs | Aureus Medical Clinic, Marine Lines Mumbai", "Answers to common questions about appointments, timings, vaccinations and location at Aureus Medical Clinic.", "/faqs"),
  component: () => (
    <>
      <PageHero eyebrow="FAQs" title="Frequently asked questions" />
      <section className="container-x max-w-4xl py-20"><FaqList items={faqs} /></section>
      <CtaBanner />
    </>
  ),
});
