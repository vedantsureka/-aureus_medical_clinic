import { createFileRoute } from "@tanstack/react-router";
import { clinic } from "@/lib/clinic";
import { PageHero, seo } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy | Aureus Medical Clinic", "How Aureus Medical Clinic handles information shared through appointment enquiries.", "/privacy"),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="container-x max-w-3xl space-y-5 py-16 text-muted-foreground">
        <p>We collect only the details you choose to share in an appointment enquiry: your name, mobile number, optional email, consultation type, preferred date and time, and an optional message.</p>
        <p>This information is used solely to respond to your enquiry and arrange a consultation. It is not sold or shared for marketing.</p>
        <p>Please do not share detailed medical history through the website. Clinical information is discussed during your consultation.</p>
        <p>To request access to or deletion of your information, call {clinic.phoneDisplay}.</p>
        <p className="text-xs">This policy is a draft and should be reviewed by the clinic before publication.</p>
      </section>
    </>
  ),
});
