import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { Phone, CalendarHeart, Menu, X, MapPin, Star, Navigation } from "lucide-react";
import { clinic, directionsLink, hours } from "@/lib/clinic";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Our Doctors" },
  { to: "/services", label: "Treatments & Services" },
  { to: "/vaccinations", label: "Vaccinations" },
  { to: "/reviews", label: "Patient Reviews" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Icon({ name, className }: { name: string; className?: string | undefined }) {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string | undefined }>>)[name] ?? Icons.Plus;
  return <C className={className} />;
}

export function Btn({
  to, href, children, variant = "primary", className = "",
}: { to?: string; href?: string; children: ReactNode; variant?: "primary" | "outline" | "gold" | "light"; className?: string }) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:bg-secondary",
    outline: "border border-primary/20 text-primary hover:border-secondary hover:text-secondary bg-card/60",
    gold: "bg-accent text-accent-foreground hover:brightness-105",
    light: "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${v} ${className}`;
  if (href) return <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{children}</a>;
  return <Link to={to as "/"} className={cls}>{children}</Link>;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${on ? "reveal" : "opacity-0"} ${className}`}>{children}</div>;
}

export function Verify({ children = "Requires clinic verification" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">⚑ {children}</span>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="whitespace-nowrap font-display text-sm font-extrabold tracking-[0.16em] text-primary">AUREUS MEDICAL CLINIC</span>
          <span className="font-serif text-sm italic text-secondary">Ayushi Thaker · Ashwin Joshi</span>
        </Link>
        <nav className="hidden items-center gap-4 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="whitespace-nowrap text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={clinic.phoneTel} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold text-primary hover:text-secondary"><Phone className="h-4 w-4" />Call Now</a>
          <Btn to="/contact" className="py-2.5">Book Appointment</Btn>
        </div>
        <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background xl:hidden">
          <div className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-medium text-primary">{n.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep pb-24 text-primary-foreground md:pb-0">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg font-extrabold tracking-[0.18em]">AUREUS MEDICAL CLINIC</p>
          <p className="mt-1 font-serif italic text-accent">Dr. Ayushi Rajendra Thaker · Dr. Ashwin Joshi</p>
          <p className="mt-3 text-sm opacity-85">Physician, Diabetes & Preventive Care <span aria-hidden="true">·</span> Orthopaedic Surgery</p>
          <p className="mt-4 max-w-md text-sm opacity-75">Physician, orthopaedic, diabetes and vaccination care in Marine Lines, Mumbai. This website provides general information only and is not a substitute for medical advice.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-accent">Visit</p>
          <p className="opacity-80">{clinic.fullAddress}</p>
          <div className="mt-3 space-y-2">
            <a href={clinic.phoneTel} className="block font-semibold">Dr. Ayushi: {clinic.phoneDisplay}</a>
            <a href="tel:08097902438" className="block font-semibold">Dr. Ashwin: 080979 02438</a>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm opacity-90">
          <p className="mb-1 font-semibold text-accent">Explore</p>
          {nav.slice(1).map((n) => <Link key={n.to} to={n.to} className="hover:text-accent">{n.label}</Link>)}
          <Link to="/diabetes-care" className="hover:text-accent">Diabetes Care</Link>
          <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} Aureus Medical Clinic · In an emergency call 112</div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <a href={clinic.phoneTel} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-primary"><Phone className="h-5 w-5" />Call</a>
      <Link to="/contact" className="flex flex-col items-center gap-1 bg-primary py-3 text-xs font-semibold text-primary-foreground"><CalendarHeart className="h-5 w-5" />Book</Link>
      <a href={directionsLink} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-primary"><Navigation className="h-5 w-5" />Directions</a>
    </div>
  );
}

export function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="bg-hero border-b border-border/60">
      <div className="container-x py-20 md:py-28">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal mt-4 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
        {sub && <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
        {children && <div className="reveal mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function RatingBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift">
      <div className="flex text-accent">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
      <p className="text-sm font-semibold text-primary">5.0 ★ Google Rating <span className="text-muted-foreground">| {clinic.reviewCount} Reviews</span></p>
    </div>
  );
}


/** Auto-advancing homepage portrait slider. Replace public/doctors/*.svg with photos
 * using the same filenames, or change these two paths to .jpg/.webp.
 * Pauses on hover/focus and honours reduced-motion preferences.
 */
export function DoctorSlideshow({ className = "" }: { className?: string }) {
  const slides = [
    { id: "ayushi", src: "/doctors/ayushi.svg", name: "Dr. Ayushi Rajendra Thaker", role: "Physician · Diabetes & Preventive Care" },
    { id: "ashwin", src: "/doctors/ashwin.svg", name: "Dr. Ashwin Joshi", role: "Orthopaedic Surgeon" },
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || reducedMotion) return;
    const interval = window.setInterval(() => setActive(i => (i + 1) % slides.length), 5000);
    return () => window.clearInterval(interval);
  }, [paused, reducedMotion]);
  return (
    <div className={`relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-deep shadow-lift ${className}`}
         role="region" aria-roledescription="carousel" aria-label="Meet the two clinic doctors"
         onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
         onFocusCapture={() => setPaused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
      {slides.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
             aria-hidden={index !== active}>
          <img src={slide.src} alt={`Portrait placeholder for ${slide.name}; replace with an approved doctor photograph`}
               className="h-full w-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-6 pb-16 pt-16 text-white">
            <p className="font-display text-xl font-bold">{slide.name}</p>
            <p className="mt-1 text-sm text-white/85">{slide.role}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-3" aria-label="Choose a doctor slide">
        {slides.map((slide, index) => (
          <button key={slide.id} type="button" onClick={() => setActive(index)}
            className={`h-3 rounded-full border border-white/75 transition-all ${active === index ? "w-9 bg-white" : "w-3 bg-white/35 hover:bg-white/75"}`}
            aria-label={`Show ${slide.name}`} aria-current={active === index ? "true" : undefined} />
        ))}
      </div>
    </div>
  );
}

export function DoctorPortrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-deep text-primary-foreground shadow-lift ${className}`}>
      <div className="absolute inset-6 rounded-[1.5rem] border border-accent/40" />
      <span className="font-serif text-8xl italic text-accent">AT</span>
      <p className="mt-4 font-display text-lg font-semibold">Dr. Ayushi Rajendra Thaker</p>
      <p className="mt-1 text-xs uppercase tracking-[0.25em] opacity-70">Physician · Diabetologist</p>
      <p className="absolute bottom-10 px-8 text-center text-[11px] opacity-60">Doctor's professional portrait to be added</p>
    </div>
  );
}

export function CtaBanner() {
  return (
    <section className="container-x py-20">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-deep px-8 py-16 text-center text-primary-foreground md:px-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <h2 className="relative text-3xl font-bold text-primary-foreground md:text-5xl">Your Health Deserves <span className="font-serif italic text-accent">Personalised</span> Attention.</h2>
        <p className="relative mx-auto mt-4 max-w-xl opacity-80">Connect with Aureus Medical Clinic to enquire about a consultation with either doctor.</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Btn to="/contact" variant="gold">Request Appointment</Btn>
          <Btn href={clinic.phoneTel} variant="light"><Phone className="h-4 w-4" />Call {clinic.phoneDisplay}</Btn>
        </div>
      </Reveal>
    </section>
  );
}

export function LocationBlock() {
  return (
    <section className="bg-muted">
      <div className="container-x grid items-center gap-10 py-20 md:grid-cols-2">
        <div>
          <SectionHead eyebrow="Find us" title="Visit the clinic in Marine Lines" />
          <p className="mt-6 flex gap-3 text-lg font-semibold text-primary"><MapPin className="mt-1 h-5 w-5 shrink-0 text-secondary" />{clinic.shortAddress}</p>
          <p className="mt-3 text-sm text-muted-foreground">{clinic.fullAddress}</p>
          <p className="mt-2 text-sm text-muted-foreground">Landmark: Opposite Wadia Fire Temple</p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <p className="mb-3 text-sm font-semibold text-primary">Consultation timings</p>
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between border-b border-border/60 py-1.5 text-sm last:border-0">
                <span>{h.day}</span><span className="text-muted-foreground">{h.time ?? "—"}</span>
              </div>
            ))}
            <p className="mt-3 text-xs font-semibold text-secondary">Please call to confirm consultation timings.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href={directionsLink}><Navigation className="h-4 w-4" />Get Directions</Btn>
            <Btn href={clinic.phoneTel} variant="outline"><Phone className="h-4 w-4" />Call Clinic</Btn>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-border shadow-soft">
          <iframe title="Map to Aureus Medical Clinic, Marine Lines" src={`https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&z=16&output=embed`} className="h-[460px] w-full" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((f) => (
        <details key={f.q} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold text-primary">
            {f.q}<span className="text-secondary transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function seo(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${clinic.siteUrl}${path}` }],
  };
}
