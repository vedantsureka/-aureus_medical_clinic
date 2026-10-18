import { createFileRoute } from "@tanstack/react-router";
import { clinic, services } from "@/lib/clinic";

const paths = ["/", "/about", "/services", "/diabetes-care", "/vaccinations", "/reviews", "/faqs", "/contact", "/privacy", ...services.map((s) => `/services/${s.slug}`)];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${clinic.siteUrl}${p}</loc></url>`).join("")}</urlset>`,
          { headers: { "Content-Type": "application/xml" } },
        ),
    },
  },
});
