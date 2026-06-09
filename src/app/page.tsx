"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { useTracking } from "@/hooks/useTracking";

const BOOK_CALL_URL = "https://partnership.speakingroses.com/book-call";
const SITE_KEY = "sk_mo06cibl_0o7i2f0t7lxf";
const GTM_ID = "GTM-TTDNNJDM";
const SITE_ID = "8c4333c3-cd49-480a-8934-3914aec3901b";

const BRAND_VIDEO_URL = "https://storage.googleapis.com/msgsndr/ioeX0AohKO7FTyLYF9kf/media/69025f3b074008a75d3aa1de.mp4";
const PRODUCT_VIDEO_URL = "https://storage.googleapis.com/msgsndr/WbJSzu9tJKeleGsNQ6dR/media/68252c05a1908e31dfd47a74.mp4";

const productCarouselImages: { src: string; brand: string; caption: string }[] = [
  { src: "/situation-lambo-1.png",     brand: "Lamborghini", caption: "Personalized petal prints for luxury automotive gifting" },
  { src: "/situation-rolls-3.png",     brand: "Rolls-Royce", caption: "Custom roses for the world's most exclusive brand events" },
  { src: "/situation-cocacola-1.png",  brand: "Coca-Cola",   caption: "The iconic brand, preserved in a real rose" },
  { src: "/situation-lambo-2.png",     brand: "Lamborghini", caption: "Every detail printed petal-by-petal on real preserved roses" },
  { src: "/situation-rolls-1.png",     brand: "Rolls-Royce", caption: "Bespoke keepsakes for the moments worth preserving" },
  { src: "/situation-cocacola-2.png",  brand: "Coca-Cola",   caption: "From boardrooms to storefronts — one product, every market" },
  { src: "/situation-lambo-3.png",     brand: "Lamborghini", caption: "Trusted by the world's most recognized luxury icons" },
  { src: "/situation-rolls-2.png",     brand: "Rolls-Royce", caption: "Premium gifting that leaves a lasting impression" },
  { src: "/situation-anniversary.png", brand: "Personal",    caption: "Birthdays, anniversaries, proposals — personalized forever" },
];

const productFeatures = [
  { title: "100% Real Preserved Roses", body: "Real roses, preserved to last for years." },
  { title: "Printed on the Petal", body: "Names, logos, photos, and messages printed directly on real roses." },
  { title: "Luxury Packaging", body: "Acrylic boxes and signature round boxes designed to be kept and displayed." },
  { title: "Built for Many Markets", body: "Perfect for corporate, funeral, retail, wedding, fundraising, and e-commerce channels." },
];

const proofPoints = [
  ["$334B+", "The global personalization market — and it's still growing. Speaking Roses is positioned at its center."],
  ["500+", "Media outlets, award shows, and publications — Forbes, Inc., Grammys, Oscars, The Ellen Show, and more."],
  ["20+ years", "Perfecting the proprietary petal-printing process. This technology is patented. No one else does what we do."],
  ["$1,500+", "Minimum investment to start as a Speaking Roses distributor and earn the right to represent the brand in your market."],
];

const testimonials = [
  {
    quote: "I own three stores, and one thing is clear — people are looking for something different. Speaking Roses helps me deliver that 'wow' factor. The product moves fast, and their team makes handling custom requests incredibly easy.",
    name: "Josh Neil",
    title: "Distributor, New York",
  },
  {
    quote: "As a licensee, I get to combine creativity and entrepreneurship every day. Printing messages on real roses allows me to help people express emotions in ways they never could before. The product is unique, the margins are great, the market is wide open, and it's more than just a business — it's meaningful work.",
    name: "Scott Tucker",
    title: "Official Licensee",
  },
];

const paths = [
  {
    title: "Distributor",
    sub: "Starting opportunities from $1,500",
    body: "Represent Speaking Roses products in your market without handling production. Ideal for entrepreneurs, gift sellers, funeral industry contacts, corporate gift reps, and local market builders.",
  },
  {
    title: "Licensee",
    sub: "For qualified partners only",
    body: "For qualified partners who want access to training, systems, equipment, and the ability to produce personalized roses in an approved market.",
  },
  {
    title: "Strategic Partnership",
    sub: "Regional, industry, or national opportunities",
    body: "For qualified partners, Speaking Roses offers exclusive partnership opportunities by zip code, city, state, country, industry, or market channel. Selective — based on market fit, capacity, and the ability to represent the product at a high level.",
  },
];

const markets = [
  { title: "Weddings & Events", icon: "rings", body: "Personalized roses for proposals, centerpieces, thank-you gifts, and memorable keepsakes." },
  { title: "Funeral Homes", icon: "flower", body: "Offer families a unique way to honor and remember loved ones with personalized roses." },
  { title: "Corporate Gifts", icon: "briefcase", body: "Strengthen relationships with branded roses for clients, employees, and special recognition." },
  { title: "Retail & Gift Shops", icon: "store", body: "A high-margin luxury gift that stands out and drives repeat customer visits." },
  { title: "Fundraising", icon: "heart", body: "A meaningful product that helps organizations raise more with emotional impact." },
  { title: "Souvenir Shops", icon: "bag", body: "Premium keepsakes for tourists looking for something unique and personal to take home." },
  { title: "Promotional Companies", icon: "megaphone", body: "Add meaningful personalization to campaigns, events, and brand activations." },
  { title: "E-commerce & Social Selling", icon: "cart", body: "Perfect for online sellers and influencers who create emotional, shareable moments." },
];

const processPoints = [
  { label: "South American Grown", icon: "mountain" },
  { label: "Diamond-Grade Preservation", icon: "gem" },
  { label: "Printed & Packaged in the USA", icon: "flag" },
  { label: "Shipped Worldwide", icon: "globe" },
];

const faqs = [
  {
    q: "Who is Speaking Roses looking for?",
    a: "We are selective. This is not an open sign-up program. We are looking for serious, committed distributors, licensees, and exclusive partners who are ready to lead their market and represent the brand correctly. Capacity is limited and every applicant is evaluated individually.",
  },
  {
    q: "What does it mean to earn the right to represent?",
    a: "It means you gain the right to immediately sell Speaking Roses products, access approved product lines, and represent the brand in your area. You can market and resell to local businesses such as funeral homes, hotels, restaurants, flower shops, gift stores, and strategic partners, and in some cases pursue larger regional or national opportunities.",
  },
  {
    q: "Do I need to produce the roses myself?",
    a: "No. For the Distributor path, you do not need to purchase inventory or produce the roses yourself. You generate the sales, we handle the production, and you earn the commission. Licensees can explore local production rights, equipment, training, and support.",
  },
  {
    q: "What is the minimum investment?",
    a: "The minimum investment to begin as a Distributor is $1,500 in liquid funds or available credit. Licensee and Exclusive Partnership programs require higher minimums depending on the territory and scope.",
  },
  {
    q: "Can I own exclusive rights in an area?",
    a: "Yes. Depending on the opportunity and availability, partners may qualify for exclusive rights tied to a zip code, local market, region, industry segment, or even a country. Availability is limited and based on strategic fit.",
  },
  {
    q: "Can I upgrade later?",
    a: "Possibly, if space is still available. Because openings are limited, an upgrade is not guaranteed. If higher-level territories or programs are already filled, you may be locked into the path you entered under.",
  },
  {
    q: "What happens after I apply?",
    a: "Qualified applicants may be invited to schedule a Zoom call with the Speaking Roses team. We will review your background, goals, and territory interests, and if a match is confirmed, we will share next steps.",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  liquidFunds: string;
  timeline: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  liquidFunds: "",
  timeline: "",
};

function Reveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={style} className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

function RoseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M5 9c4 0 7-3 7-7 0 4 3 7 7 7-4 0-7 3-7 7 0-4-3-7-7-7Z" />
    </svg>
  );
}

function MarketIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    rings:     <><circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M11 12h2"/></>,
    flower:    <><path d="M12 22V12m0-10v10M7 7c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5"/><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5"/><path d="M22 12c0-2.8-2.2-5-5-5s-5 2.2-5 5 2.2 5 5 5 5-2.2 5-5"/><path d="M7 17c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/></>,
    store:     <><path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/><path d="M9 9v3a3 3 0 0 0 6 0V9"/></>,
    heart:     <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
    bag:       <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    megaphone: <><path d="M3 11l19-9-9 19-2-8-8-2z"/></>,
    cart:      <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
    mountain:  <><path d="M3 20l6-12 4 8 3-5 5 9H3z"/></>,
    gem:       <><polygon points="6 3 18 3 22 9 12 22 2 9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="6" y2="9"/><line x1="12" y1="3" x2="18" y2="9"/></>,
    flag:      <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    globe:     <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? <circle cx="12" cy="12" r="8"/>}
    </svg>
  );
}

function HeroBadgeIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const stroke = "currentColor";
  const sw = 1.5;
  switch (name) {
    case "diamond":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l3 5-9 13L3 8l3-5Z" />
          <path d="M3 8h18M9 3l3 5 3-5M9 8l3 13 3-13" />
        </svg>
      );
    case "growth":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l5-5 4 4 8-9" />
          <path d="M14 7h6v6" />
        </svg>
      );
    case "globe":
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.8 3.2 4.3 6.7 4.3 9s-1.5 5.8-4.3 9c-2.8-3.2-4.3-6.7-4.3-9S9.2 6.2 12 3Z" />
        </svg>
      );
  }
}

function GoldDivider() {
  return (
    <div className="gold-rule my-3">
      <RoseIcon className="h-4 w-4 shrink-0 text-gold" />
    </div>
  );
}

function OrnateRule() {
  return (
    <div className="ornate-rule" aria-hidden="true">
      <span />
    </div>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose">{children}</div>;
}

function LineIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "shield" && <path d="M12 3 19 6v5c0 4.5-2.8 8.1-7 10-4.2-1.9-7-5.5-7-10V6l7-3Z M9 12l2 2 4-5" />}
      {name === "star" && <path d="M12 3v18M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" />}
      {name === "press" && <path d="M5 4h11l3 3v13H5V4Z M16 4v4h4M8 10h8M8 14h8M8 18h5" />}
      {name === "globe" && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.3 2.4 3.5 5.4 3.5 9S14.3 18.6 12 21M12 3C9.7 5.4 8.5 8.4 8.5 12S9.7 18.6 12 21" />}
      {name === "diamond" && <path d="M6.5 4h11L22 9l-10 12L2 9l4.5-5ZM2 9h20M8 4l4 17 4-17" />}
      {name === "check" && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8 12l2.5 2.5L16 9" />}
      {name === "clipboard" && <path d="M9 5h6M9 5a3 3 0 0 1 6 0M9 5H6v16h12V5h-3M8.5 11h.01M11 11h4M8.5 15h.01M11 15h4M8.5 19h.01M11 19h3" />}
      {name === "review" && <path d="M12 3 19 6v5c0 4.5-2.8 8.1-7 10-4.2-1.9-7-5.5-7-10V6l7-3ZM9 12l2 2 4-5M16.5 16.5 21 21" />}
      {name === "calendar" && <path d="M7 3v4M17 3v4M4 8h16M5 5h14v16H5V5ZM8 12h2M12 12h2M16 12h.01M8 16h2M12 16h2M16 16h.01" />}
      {name === "rocket" && <path d="M14 4c3.5.4 5.6 2.5 6 6l-5.5 5.5-4-4L14 4ZM9 13l-3 1-2 5 5-2 1-3M15 9h.01M5 11l3-3h4M13 19l3-3v-4" />}
    </svg>
  );
}

type ApplyFormProps = {
  form: FormState;
  setField: (key: keyof FormState, value: string) => void;
  formatPhone: (value: string) => string;
  validatePhone: (value: string) => string;
  phoneError: string;
  setPhoneError: (value: string) => void;
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  error: string;
  submitted: boolean;
  isQualified: boolean;
  compact?: boolean;
  showTitle?: boolean;
};

function ApplyForm({ form, setField, formatPhone, validatePhone, phoneError, setPhoneError, handleSubmit, isSubmitting, error, submitted, isQualified, compact = false, showTitle = false }: ApplyFormProps) {
  return (
    <div className={`rounded-2xl bg-white shadow-2xl ${compact ? "p-4 md:p-5" : "p-7 md:p-8"}`}>
      {showTitle && (
        <div className="mb-5 text-center">
          <h3 className="font-display text-2xl text-plum md:text-3xl">Tell us about you</h3>
          <GoldDivider />
        </div>
      )}
      {submitted && !isQualified ? (
        <div className="rounded-2xl bg-petal p-8 text-center">
          <h3 className="font-display text-3xl text-plum">Thanks for applying.</h3>
          <p className="mt-4 text-ink/70">Your information has been received. The Speaking Roses team will be in touch if your market and timing are a fit.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`grid ${compact ? "gap-2" : "gap-2.5"}`}>
          <div className={`grid sm:grid-cols-2 ${compact ? "gap-2.5" : "gap-3.5"}`}>
            <input name="firstName" required placeholder="First Name" value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} className="field" />
            <input name="lastName" required placeholder="Last Name" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} className="field" />
          </div>
          <input name="email" required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setField("email", e.target.value)} className="field" />
          <input name="phone" required type="tel" inputMode="numeric" placeholder="Phone Number" value={form.phone} onChange={(e) => { const next = formatPhone(e.target.value); setField("phone", next); setPhoneError(validatePhone(next)); }} className="field" />
          {phoneError && <p className="text-sm font-semibold text-red-700">{phoneError}</p>}
          <div className="grid gap-1">
            <label htmlFor="liquidFunds" className="text-xs font-medium text-ink/70">How much liquid capital do you currently have available to invest?</label>
            <select id="liquidFunds" name="liquidFunds" required value={form.liquidFunds} onChange={(e) => setField("liquidFunds", e.target.value)} className="field">
              <option value="">Select available funds…</option>
              <option value="under-1500">&lt;$1,500</option>
              <option value="1500-5000">$1,500–$5,000</option>
              <option value="5000-10000">$5,000–$10,000</option>
              <option value="10000-plus">$10,000+</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label htmlFor="timeline" className="text-xs font-medium text-ink/70">How soon would you like to start?</label>
            <select id="timeline" name="timeline" required value={form.timeline} onChange={(e) => setField("timeline", e.target.value)} className="field">
              <option value="">Select a timeline…</option>
              <option value="immediately">Immediately</option>
              <option value="1-3-months">Over the next 1–3 months</option>
              <option value="3-6-months">3–6 months</option>
              <option value="6-plus-months">6+ months</option>
            </select>
          </div>
          <p className={`${compact ? "text-[0.6875rem] leading-4" : "text-xs leading-5"} text-ink/50`}>By submitting, you agree to receive calls and SMS messages from Speaking Roses related to this partnership opportunity. Message and data rates may apply. Reply STOP to opt out.</p>
          {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
          <button type="submit" disabled={isSubmitting} className={`cta-shimmer w-full rounded-full bg-rose px-7 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-plum disabled:opacity-60 ${compact ? "py-3" : "py-4"}`}>
            {isSubmitting ? "Submitting…" : "Apply to Check Market Availability →"}
          </button>
          <p className="text-center text-xs text-ink/40">Your information is secure and will never be shared.</p>
        </form>
      )}
    </div>
  );
}

function CTA({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <a href="#apply" className={`cta-shimmer inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] shadow-xl transition hover:-translate-y-0.5 ${dark ? "bg-white text-plum hover:bg-blush" : "bg-rose text-white hover:bg-plum"}`}>
        Apply to Check Market Availability
        <span aria-hidden>→</span>
      </a>
      <p className={`text-xs font-semibold tracking-wide ${dark ? "text-white/50" : "text-ink/40"}`}>Limited partner openings available</p>
    </div>
  );
}

type CarouselItem = { src: string; brand: string; caption: string };

function ProductCarousel({ items, autoPlayMs = 5000 }: { items: CarouselItem[]; autoPlayMs?: number }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goTo = (next: number) => {
    const total = items.length;
    setIndex(((next % total) + total) % total);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Auto-advance: timeout keyed on `index` so manual navigation resets the timer,
  // keeping the progress bar (also keyed on `index`) in sync. Pauses on hover.
  const autoPlays = autoPlayMs > 0 && items.length > 1;
  useEffect(() => {
    if (isHovered || !autoPlays) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), autoPlayMs);
    return () => window.clearTimeout(id);
  }, [index, isHovered, autoPlays, autoPlayMs, items.length]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; touchEndX.current = null; };
  const onTouchMove  = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const onTouchEnd   = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) { delta > 0 ? next() : prev(); }
    touchStartX.current = null; touchEndX.current = null;
  };

  return (
    <div
      className="carousel-shell"
      role="region"
      aria-roledescription="carousel"
      aria-label="Speaking Roses product gallery"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {items.map((item, i) => {
        // Only mount the image for the active slide and its immediate neighbors
        // (circular distance ≤ 1) so a smooth crossfade has its frames ready
        // without eagerly decoding all ten large source images at first paint.
        const total = items.length;
        const distance = Math.min((i - index + total) % total, (index - i + total) % total);
        const near = distance <= 1;
        return (
          <div
            key={item.src}
            className={`carousel-slide ${i === index ? "active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            aria-hidden={i !== index}
          >
            {near && (
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            )}
            <div className="carousel-caption">
              <span className="carousel-brand">{item.brand}</span>
              <p className="carousel-caption-text">{item.caption}</p>
            </div>
          </div>
        );
      })}

      {autoPlays && (
        <div className="carousel-progress" aria-hidden="true">
          <span
            key={index}
            className="carousel-progress-bar"
            style={{ animationDuration: `${autoPlayMs}ms`, animationPlayState: isHovered ? "paused" : "running" }}
          />
        </div>
      )}

      <button type="button" className="carousel-arrow prev" aria-label="Previous product image" onClick={prev}>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button type="button" className="carousel-arrow next" aria-label="Next product image" onClick={next}>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      <div className="carousel-dots" role="tablist" aria-label="Choose product image">
        {items.map((item, i) => (
          <button
            key={item.src + "-dot"}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show product image ${i + 1}`}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useTracking({ siteKey: SITE_KEY, gtmId: GTM_ID, siteId: SITE_ID });
  const { submit } = useMegaLeadForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(initialForm);
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setField = (key: keyof FormState, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validatePhone = (value: string) => {
    const d = value.replace(/\D/g, "");
    if (d.length !== 10) return "Enter a 10-digit US phone number.";
    if (!/^[2-9]/.test(d) || !/^[2-9]/.test(d.slice(3))) return "Area code and exchange must start with 2-9.";
    if (["211", "311", "411", "511", "611", "711", "811", "911"].includes(d.slice(0, 3))) return "N11 service codes are not valid area codes.";
    if (["800", "888", "877", "866", "855", "844", "833", "822", "900"].includes(d.slice(0, 3))) return "Please use a direct business or mobile number.";
    if (d.slice(3, 6) === "555") return "Please use a real phone number.";
    if (/^(\d)\1{9}$/.test(d) || d === "1234567890" || d === "9876543210") return "Please use a real phone number.";
    return "";
  };

  const isQualified = form.liquidFunds !== "under-1500" && form.timeline !== "6-plus-months";

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pError = validatePhone(form.phone);
    setPhoneError(pError);
    if (pError) return;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValid) { setError("Enter a valid email address."); return; }
    setIsSubmitting(true);
    setError("");
    try {
      await submit({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        liquidFunds: form.liquidFunds,
        timeline: form.timeline,
        qualified: isQualified ? "yes" : "no",
        smsConsent: "By submitting, applicant agrees to receive calls and SMS messages from Speaking Roses related to the partnership opportunity. Message and data rates may apply. Reply STOP to opt out.",
      });
      setSubmitted(true);
      if (isQualified) window.location.href = BOOK_CALL_URL;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="scroll-progress" />

      {/* ── NAV ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/65 to-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#hero" aria-label="Speaking Roses home">
            <Image src="/logo.svg" alt="Speaking Roses" width={300} height={78} className="h-12 w-auto md:h-14 brightness-0 invert" priority />
          </a>
          {/* Floating top-right "Apply Now" removed per client ref (single CTA in hero card). */}
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative isolate overflow-hidden lg:min-h-[760px]">
        {/* Background product photo — client-supplied image (2144x733, attached to task by Peter 2026-05-28). Composition: clear acrylic dome with a single preserved Speaking Rose on a wooden surface, scattered red roses around it. NO PEOPLE in frame per client spec. The dark plum card on the left overlays the dome's left-of-frame region. */}
        <Image
          src="/hero-client.jpg"
          alt="Personalized preserved Speaking Rose displayed under a clear acrylic dome on a wooden surface with scattered red roses"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* DESKTOP: no full-width overlays — the product photo is the centerpiece. Only a faint top vignette for nav contrast. */}
        <div className="absolute inset-x-0 top-0 h-28 hidden bg-gradient-to-b from-black/40 to-transparent lg:block" />
        {/* MOBILE: dark wash behind stacked content for readability */}
        <div className="absolute inset-0 bg-black/45 lg:hidden" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent lg:hidden" />

        {/* DESKTOP: headline-left, product-center (visible), form-right */}
        {/* Cards anchored to viewport edges (left & right rails) so the rose bowl gets max breathing room. No max-w cap on the row; padding pushes the cards out to the edges and lets the middle expand. */}
        <div className="relative z-10 hidden w-full grid-cols-[auto_1fr_auto] items-center gap-6 px-6 pb-12 pt-28 lg:grid lg:min-h-[760px] xl:px-10 2xl:px-16">

          {/* LEFT: dark luxury card per client brief — translucent #1A1410 w/ gold accents. Narrower so the bowl sits centered to the right. */}
          <div className="w-[340px] self-center justify-self-start">
            <Reveal>
              <div className="rounded-2xl border border-gold/20 bg-[#1A1410]/88 px-7 py-7 shadow-2xl backdrop-blur-md ring-1 ring-black/30">
                {/* Speaking Roses logo at top of card (matches client ref doc). Inverted to white for the dark card. */}
                <div className="mb-3 flex justify-center">
                  <Image src="/logo.svg" alt="Speaking Roses" width={200} height={52} className="h-10 w-auto brightness-0 invert" priority />
                </div>
                {/* Thin gold accent rule under the logo */}
                <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                <p className="mb-3 text-[0.625rem] font-bold uppercase tracking-[0.28em] text-gold">
                  Limited Distributor Opportunity
                </p>
                <h1 className="font-display">
                  <span className="block text-[2.15rem] font-bold leading-[1.05] text-white">Be the First in</span>
                  <span className="block text-[2.15rem] font-bold leading-[1.05] text-gold">Your Market.</span>
                </h1>
                <p className="mt-3 text-[0.95rem] font-semibold leading-snug text-gold">
                  $100 Billion Opportunity in Personalized Real Roses
                </p>
                <p className="mt-4 text-[0.875rem] leading-[1.65] text-white/80">
                  100% real preserved roses. Printed right on the petals. A luxury product for
                  birthdays, romance, weddings, events, corporate gifting and more.
                </p>
                {/* Gold rule above pillars */}
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <ul className="mt-4 flex items-start justify-between gap-0">
                  {(
                    [
                      { title: "Premium", sub: "Product", icon: "diamond" },
                      { title: "Proven", sub: "Demand", icon: "growth" },
                      { title: "Multiple", sub: "Markets", icon: "globe" },
                    ] as const
                  ).map((badge, i, arr) => (
                    <Fragment key={badge.title}>
                      <li className="flex flex-1 flex-col items-center justify-start text-center">
                        <HeroBadgeIcon name={badge.icon} className="mb-1.5 h-[1.35rem] w-[1.35rem] text-gold" />
                        <span className="text-[0.82rem] font-bold leading-tight text-white">{badge.title}</span>
                        <span className="text-[0.7rem] font-medium uppercase tracking-wide text-white/55">{badge.sub}</span>
                      </li>
                      {i < arr.length - 1 && (
                        <span aria-hidden className="mx-1 mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80 shadow-[0_0_6px_rgba(201,168,76,0.55)]" />
                      )}
                    </Fragment>
                  ))}
                </ul>
                {/* Gold rule below pillars */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <a href="#apply" className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-3.5 text-[0.92rem] font-semibold tracking-wide text-[#1A1410] shadow-lg transition hover:bg-[#e6c46a]">
                  Apply to Check Availability
                  <span aria-hidden className="text-[1.05em] leading-none">→</span>
                </a>
                <p className="mt-3 text-center text-[0.6875rem] font-semibold tracking-wide text-gold/70">
                  Limited capacity. Now accepting new distributor applications.
                </p>
              </div>
            </Reveal>
          </div>

          {/* CENTER: deliberately empty — the background product photo IS the centerpiece. */}
          <div aria-hidden="true" />

          {/* RIGHT: white form card — anchored to right rail */}
          <div className="w-[420px] justify-self-end self-center">
            <Reveal>
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gold/20">
                <div className="bg-white px-5 pt-5 pb-1 text-center">
                  <h2 className="font-display text-[1.35rem] font-semibold text-plum">Check Market Availability</h2>
                  <GoldDivider />
                  <p className="mt-1 text-xs text-ink/60">See if your territory is still open.</p>
                </div>
                <div className="px-5 pb-5">
                  <ApplyForm
                    form={form} setField={setField} formatPhone={formatPhone}
                    validatePhone={validatePhone} phoneError={phoneError}
                    setPhoneError={setPhoneError} handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting} error={error} submitted={submitted}
                    isQualified={isQualified} compact
                  />
                </div>
              </div>
            </Reveal>
            {/* "Limited partner openings available" pill removed per client ref (off-brand for luxury aesthetic). */}
          </div>
        </div>

        {/* MOBILE: stacked layout */}
        <div className="relative z-10 flex flex-col gap-4 px-4 pb-10 pt-24 lg:hidden">
          <Reveal>
            <div className="rounded-2xl border border-gold/20 bg-[#1A1410]/88 px-5 py-5 shadow-2xl backdrop-blur-md ring-1 ring-black/30">
              {/* Speaking Roses logo (matches client ref doc / desktop card). */}
              <div className="mb-2 flex justify-center">
                <Image src="/logo.svg" alt="Speaking Roses" width={180} height={48} className="h-9 w-auto brightness-0 invert" priority />
              </div>
              <div className="mx-auto mb-3 h-px w-14 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-gold">Limited Distributor Opportunity</p>
              <h1 className="font-display">
                <span className="block text-[2rem] font-bold leading-[1.05] text-white">Be the First in</span>
                <span className="block text-[2rem] font-bold leading-[1.05] text-gold">Your Market.</span>
              </h1>
              <p className="mt-2.5 text-sm font-semibold leading-snug text-gold">
                $100 Billion Opportunity in Personalized Real Roses
              </p>
              <p className="mt-3 text-[0.875rem] leading-[1.65] text-white/80">
                100% real preserved roses. Printed right on the petals. A luxury product for
                birthdays, romance, weddings, events, corporate gifting and more.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <ul className="mt-3 flex items-start justify-between gap-0">
                {(
                  [
                    { title: "Premium", sub: "Product", icon: "diamond" },
                    { title: "Proven", sub: "Demand", icon: "growth" },
                    { title: "Multiple", sub: "Markets", icon: "globe" },
                  ] as const
                ).map((badge, i, arr) => (
                  <Fragment key={badge.title}>
                    <li className="flex flex-1 flex-col items-center justify-start text-center">
                      <HeroBadgeIcon name={badge.icon} className="mb-1 h-[1.25rem] w-[1.25rem] text-gold" />
                      <span className="text-[0.8rem] font-bold leading-tight text-white">{badge.title}</span>
                      <span className="text-[0.65rem] font-medium uppercase tracking-wide text-white/55">{badge.sub}</span>
                    </li>
                    {i < arr.length - 1 && (
                      <span aria-hidden className="mx-1 mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80 shadow-[0_0_5px_rgba(201,168,76,0.55)]" />
                    )}
                  </Fragment>
                ))}
              </ul>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <a href="#apply" className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-5 py-3 text-[0.9rem] font-semibold tracking-wide text-[#1A1410] shadow-lg transition hover:bg-[#e6c46a]">
                Apply to Check Availability
                <span aria-hidden className="text-[1.05em] leading-none">→</span>
              </a>
              <p className="mt-3 text-center text-[0.625rem] font-semibold tracking-wide text-gold/70">
                Limited capacity. Now accepting new distributor applications.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="px-5 pt-5 pb-2 text-center">
                <h2 className="font-display text-xl font-semibold text-plum">Check Market Availability</h2>
                <GoldDivider />
              </div>
              <div className="px-5 pb-5">
                <ApplyForm form={form} setField={setField} formatPhone={formatPhone} validatePhone={validatePhone} phoneError={phoneError} setPhoneError={setPhoneError} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} submitted={submitted} isQualified={isQualified} compact />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRODUCT ── */}
      <section id="product" className="py-24" style={{ background: "#171219" }}>
        {/* Header */}
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#c9a84c" }}>The Product</p>
            <h2 className="font-display text-4xl text-white md:text-6xl">A Product That Turns Real Roses Into Keepsakes.</h2>
            <OrnateRule />
            <p className="mt-6 text-lg leading-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Represent a patented product that prints names, logos, photos, and messages directly on real preserved roses — trusted by Lamborghini, Rolls-Royce, Coca-Cola, and 500+ brands worldwide.
            </p>
          </Reveal>

          {/* Proof badges — dark glass versions */}
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { label: "Patented Petal Printing", icon: "shield" },
              { label: "20+ Years of Proof", icon: "star" },
              { label: "Featured in 500+ Media Outlets", icon: "press" },
            ].map((badge) => (
              <div key={badge.label} className="luxe-card-dark flex items-center gap-2.5 rounded-xl px-5 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white/10 text-gold">
                  <LineIcon name={badge.icon} className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-white">{badge.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Full-bleed gallery */}
        <Reveal className="mt-12">
          <ProductCarousel items={productCarouselImages} autoPlayMs={5500} />
          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#c9a84c" }}>
            Trusted by the world&apos;s most recognized brands — every rose is real, preserved, and personalized.
          </p>
        </Reveal>

        {/* Product feature cards */}
        <div className="mx-auto mt-12 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {productFeatures.map((f) => (
            <Reveal key={f.title} className="luxe-card-dark rounded-2xl p-6">
              <Icon>
                <RoseIcon />
              </Icon>
              <h3 className="font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "rgba(255,255,255,0.65)" }}>{f.body}</p>
            </Reveal>
          ))}
        </div>

        <CTA dark />
      </section>

      {/* ── MARKET OPPORTUNITY ── */}
      <section id="markets" className="rose-section relative overflow-hidden py-24">
        <Image src="/bg-market-acrylic-roses-ai.png" alt="" fill className="object-cover object-center opacity-55" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-petal via-petal/94 to-petal/72" />
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">The Market Opportunity</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">A Global Market Built on Emotion. Endless Opportunities for Our Partners.</h2>
            <OrnateRule />
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Speaking Roses fits into multiple industries where personalization, emotion, and gifting drive purchasing decisions. One product. Multiple possibilities.
            </p>
          </Reveal>

          {/* Markets grid — full 2-column */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {markets.map((m) => (
              <Reveal key={m.title} className="luxe-card flex items-start gap-4 rounded-xl p-5">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose/25 bg-rose/10 text-rose">
                  <MarketIcon name={m.icon} className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-plum">{m.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-ink/70">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Featured video — full width */}
          <Reveal className="mt-12 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gold/20" style={{background: '#171219'}}>
            <div className="grid lg:grid-cols-[1fr_2fr]">
              {/* Left: text */}
              <div className="flex flex-col justify-center px-8 py-10 lg:py-12">
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.28em]" style={{color: '#c9a84c'}}>See the Possibilities</p>
                <h3 className="font-display text-2xl text-white md:text-3xl leading-tight">Watch the Market Opportunity Video</h3>
                <p className="mt-3 text-sm leading-7" style={{color: 'rgba(255,255,255,0.55)'}}>Discover how Speaking Roses creates meaningful impact across industries and around the world.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["High-Emotion Purchase Categories", "Built for Multiple Sales Channels", "Premium Keepsake Positioning"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/60">{tag}</span>
                  ))}
                </div>
              </div>
              {/* Right: video */}
              <video
                src={BRAND_VIDEO_URL}
                controls
                playsInline
                poster="/rose-product.webp"
                className="aspect-video w-full object-cover"
                style={{background: '#0e0a0d'}}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </Reveal>

          <Reveal className="mt-8 rounded-2xl border border-gold/20 bg-plum/95 p-8 text-center text-white shadow-xl">
            <p className="font-display text-2xl text-white md:text-3xl">This is more than a product.</p>
            <p className="mt-2 font-display text-2xl text-blush md:text-3xl">This is a business opportunity with global potential.</p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <a href="#apply" className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-white hover:text-plum">
                Apply to Check Market Availability <span>→</span>
              </a>
              <p className="text-xs font-semibold tracking-wide text-white/50">Select partner openings available</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOLLYWOOD APPROVED ── */}
      <section id="press" className="rose-section rose-section-dark py-24 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-blush">As Seen On / Featured In</p>
            <h2 className="font-display text-5xl text-white md:text-6xl">Hollywood<br /><span className="text-gold">Approved.</span></h2>
            <OrnateRule />
            <p className="mt-4 font-display text-xl text-blush">Featured in 500+ outlets. Grammys. Oscars. The Ellen Show.</p>
            <p className="mt-5 text-base leading-8 text-white/70">
              Speaking Roses has been on some of the world&apos;s most recognized stages — from top business publications to Hollywood award shows. Featured at the Grammys, the Oscars, The Ellen Show, partnerships with Disney, and validated by Forbes, the Wall Street Journal, Good Morning America, CNN, Inc. Magazine, and 500+ media outlets worldwide.
            </p>
          </Reveal>

          {/* Quote box */}
          <Reveal className="luxe-card-dark relative mx-auto mt-10 max-w-2xl rounded-2xl px-10 py-10 text-center">
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-2 font-display text-6xl leading-none text-gold/40 select-none">&ldquo;</span>
            <p className="font-display text-xl text-white">This is not a startup product.</p>
            <p className="mt-2 font-display text-xl text-blush">This is a brand with two decades of proof, global media recognition, and staying power.</p>
            <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-4 font-display text-6xl leading-none text-gold/40 select-none">&rdquo;</span>
          </Reveal>

          {/* Media logo strip */}
          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {[
              { src: "/logo-forbes.svg",          alt: "Forbes",               bg: "bg-white" },
              { src: "/logo-wsj.svg",             alt: "Wall Street Journal",  bg: "bg-white" },
              { src: "/logo-oscars-4x.png",       alt: "Oscars",               bg: "bg-white" },
              { src: "/logo-grammys.svg",         alt: "Grammys",              bg: "bg-white" },
              { src: "/logo-ellen-4x.png",        alt: "The Ellen Show",       bg: "bg-white" },
              { src: "/logo-fox.svg",             alt: "Fox News",             bg: "bg-white" },
              { src: "/logo-cnn.svg",             alt: "CNN",                  bg: "bg-white" },
              { src: "/logo-gma.svg",             alt: "Good Morning America", bg: "bg-white" },
              { src: "/logo-inc.svg",             alt: "Inc. Magazine",        bg: "bg-white" },
              { src: "/logo-e-entertainment.png", alt: "E! Entertainment",     bg: "bg-white" },
            ].map((logo) => (
              <div key={logo.alt} className={`flex h-14 w-36 items-center justify-center rounded-xl border border-gold/15 px-4 shadow-sm ${logo.bg}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} className="h-7 w-auto max-w-[120px] object-contain" />
              </div>
            ))}
          </Reveal>

          {/* Recognition strip */}
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {["National TV", "Business Press", "Entertainment Media", "Lifestyle Coverage", "Global Recognition", "High-Visibility Events"].map((tag) => (
              <span key={tag} className="rounded-full border border-blush/25 px-4 py-2 text-xs font-semibold tracking-wide text-blush">
                {tag}
              </span>
            ))}
          </Reveal>
          <CTA dark />
        </div>
      </section>

      {/* ── PROOF STATS ── */}
      <section id="proof" className="py-20" style={{ background: "#faf6f2" }}>
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">The opportunity in numbers</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">Built on two decades of proof.</h2>
            <OrnateRule />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(([title, label]) => (
              <Reveal key={title} className="luxe-card rounded-2xl p-7" style={{borderTop: '2px solid rgba(201,168,76,0.35)'}}>
                <div className="font-display text-5xl font-bold" style={{color: '#c9a84c'}}>{title}</div>
                <p className="mt-3 text-sm leading-6 text-ink/70">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <CTA />
      </section>

      {/* ── OUR ROSE PROCESS ── */}
      <section id="story" className="scroll-mt-24 py-20" style={{ background: "#1b121a" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gold">Our Rose Process</p>
            <h2 className="font-display text-4xl text-white md:text-[2.75rem] md:leading-tight">Raised in South America.<br /><span className="text-gold">Perfected Like a Diamond.</span></h2>
            <OrnateRule />
            <p className="mt-2 text-base font-medium text-white/55">From the mountains to meticulous preservation, printing, and luxury packaging.</p>
            <p className="mt-5 text-base leading-7 text-white/70">
              Our roses are raised in the majestic mountains of South America. Once fully mature, they are cut and guided through a two-week-plus diamond-grade preservation process. Each rose is individually perfected to look, feel, and smell real while lasting for years.
            </p>
            <p className="mt-3 text-base leading-7 text-white/70">
              Every rose is treated like a diamond. We check on each one daily, carefully protecting its beauty and quality through every stage of the process.
            </p>
            <p className="mt-3 text-base leading-7 text-white/70">
              Once the roses arrive in the United States, they are meticulously printed, packaged, and prepared by our team using a precise, hands-on process. From there, each finished product is placed in luxurious packaging and delivered to distributors across the United States.
            </p>
            <p className="mt-4 text-base font-semibold text-gold">
              We are not beginners bringing a random product to market. We are a proven brand built on process, quality, and presentation.
            </p>

            {/* Process points */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {processPoints.map((p) => (
                <div key={p.label} className="luxe-card-dark flex items-center gap-3 rounded-xl px-4 py-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <MarketIcon name={p.icon} className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <span className="text-sm font-semibold text-white">{p.label}</span>
                </div>
              ))}
            </div>
            <div className="[&>div]:mt-6">
              <CTA dark />
            </div>
          </Reveal>

          {/* Story video — full column, autoplay */}
          <div>
            <Reveal className="overflow-hidden rounded-2xl" style={{ background: "#0e0a0d" }}>
              <video
                src={PRODUCT_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="w-full object-cover"
                style={{ display: "block", aspectRatio: "16/9" }}
                poster="/rose-1.webp"
              />
            </Reveal>
            <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold">Watch: Grown in South America. Perfected Like a Diamond.</p>
          </div>
        </div>
      </section>

      {/* ── PARTNER PATHS ── */}
      <section id="opportunity" className="py-24" style={{ background: "#171219" }}>
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <RoseIcon className="h-5 w-5" />
              </div>
            </div>
            <h2 className="font-display text-4xl text-white md:text-6xl">Choose the Partner Path That Fits Your Market</h2>
            <OrnateRule />
            <p className="mt-6 text-lg leading-8 text-white/65">
              Speaking Roses offers different entry points depending on your goals, market, experience, and ability to grow. Start as a distributor, explore licensed production, or discuss a strategic partnership.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3 items-start">
            {paths.map((path, i) => {
              {/* Licensee (i===1): featured dark "Most Chosen" card */}
              if (i === 1) {
                return (
                  <Reveal key={path.title} className="relative rounded-2xl p-8" style={{background: '#171219', border: '1px solid rgba(201, 168, 76, 0.5)', boxShadow: '0 0 40px rgba(201,168,76,0.08)', minHeight: '460px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide" style={{background: '#c9a84c', color: '#1a1208'}}>Most Chosen</span>
                      </div>
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full text-gold" style={{border: '2px solid rgba(201,168,76,0.5)', background: 'rgba(201,168,76,0.12)'}}>
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                      </div>
                      <h3 className="font-display text-2xl text-white">{path.title}</h3>
                      <div className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5" style={{border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.1)'}}>
                        <span className="text-[0.6875rem] font-bold uppercase tracking-wide" style={{color: '#c9a84c'}}>{path.sub}</span>
                      </div>
                      <p className="mt-4 text-sm leading-7" style={{color: 'rgba(255,255,255,0.7)'}}>{path.body}</p>
                    </div>
                    <a href="#apply" className="mt-6 block w-full rounded-full py-3 text-center text-sm font-bold uppercase tracking-wide" style={{background: '#c9a84c', color: '#1a1208'}}>
                      Apply Now →
                    </a>
                  </Reveal>
                );
              }
              {/* Strategic (i===2): premium dark-glass card with gold gradient top border */}
              if (i === 2) {
                return (
                  <Reveal key={path.title} className="luxe-card-dark relative rounded-2xl p-8" style={{borderTop: '3px solid transparent', borderImage: 'linear-gradient(90deg, #c9a84c, #b9456f) 1'}}>
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 text-gold">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl text-white">{path.title}</h3>
                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5" style={{border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.1)'}}>
                      <span className="text-[0.6875rem] font-bold uppercase tracking-wide" style={{color: '#c9a84c'}}>{path.sub}</span>
                    </div>
                    <p className="mt-4 text-sm leading-7" style={{color: 'rgba(255,255,255,0.7)'}}>{path.body}</p>
                  </Reveal>
                );
              }
              {/* Distributor (i===0): standard light card */}
              return (
                <Reveal key={path.title} className="luxe-card-dark relative rounded-2xl p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 text-gold">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 11c0-2.21-1.79-4-4-4S8 8.79 8 11m0 0c0 2.21 1.79 4 4 4m-4-4H3m13 0h5M5 19h14" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-white">{path.title}</h3>
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5" style={{border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.1)'}}>
                    <span className="text-[0.6875rem] font-bold uppercase tracking-wide" style={{color: '#c9a84c'}}>{path.sub}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7" style={{color: 'rgba(255,255,255,0.7)'}}>{path.body}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8" style={{border: '1px solid rgba(201,168,76,0.2)', borderRadius: '1rem', padding: '2rem', textAlign: 'center'}}>
            <RoseIcon className="mx-auto mb-3 h-6 w-6 text-gold" />
            <p className="text-xl font-semibold text-white">Not sure which path fits you?</p>
            <p className="mt-1 text-white/65">Apply and we&apos;ll review your market.</p>
            <CTA dark />
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="rose-section py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">From our partners</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">What partners are saying.</h2>
            <OrnateRule />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.name} className="luxe-card rounded-2xl p-8">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map((n) => (
                    <svg key={n} className="h-4 w-4" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="font-display leading-none select-none" style={{fontSize: '6rem', color: 'rgba(168,79,101,0.15)', lineHeight: 1, marginBottom: '-1.5rem'}}>&#8220;</p>
                <p className="mt-2 text-base leading-8 text-ink/80">{t.quote}</p>
                <div className="mt-6 border-t border-rose/10 pt-5">
                  <p className="font-bold text-plum">{t.name}</p>
                  <p className="text-sm text-rose/60">{t.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <CTA />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="process" className="py-20" style={{ background: "#1b121a" }}>
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="select-none text-xs tracking-[0.6em] text-gold/55">···</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-white/5 shadow-sm">
                <RoseIcon className="h-4 w-4 text-gold" />
              </div>
              <span className="select-none text-xs tracking-[0.6em] text-gold/55">···</span>
            </div>
            <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.45em] text-gold">How It Works</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">Apply, Review, and Launch Your Market.</h2>
            <OrnateRule />
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/65">
              Our process is designed to keep things selective, simple, and strategic. We review each application individually and guide qualified partners toward the right path for their market.
            </p>
          </Reveal>

          <div className="steps-grid mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Apply", body: "Submit your information, market, and timeline so our team can review your interest." },
              { num: "02", title: "Review", body: "We evaluate fit, readiness, and market availability to determine the best partner path." },
              { num: "03", title: "Strategy Call", body: "Qualified applicants are invited to a Zoom call to discuss products, market opportunities, and next steps." },
              { num: "04", title: "Launch", body: "Move forward with the distributor, licensee, or strategic partner option that fits your goals." },
            ].map(({ num, title, body }) => (
              <Reveal key={num} className="luxe-card-dark relative z-10 flex flex-col items-center rounded-2xl px-4 pb-6 pt-5 text-center">
                {/* Large architectural number */}
                <div className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-gold/40" style={{background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)'}}>
                  <span className="font-display text-3xl font-bold" style={{color: '#c9a84c', letterSpacing: '-0.04em'}}>{num}</span>
                </div>
                <h3 className="font-display text-xl text-white">{title}</h3>
                <div className="ornate-rule my-2"><span /></div>
                <p className="text-xs leading-6 text-white/65">{body}</p>
              </Reveal>
            ))}
          </div>

          {/* Ornament + CTA */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex w-full max-w-xs items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
              <span className="select-none text-[0.5rem] tracking-[0.35em] text-gold/50">···</span>
              <div className="mx-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white/5 shadow-sm">
                <Image src="/logo.svg" alt="Speaking Roses" width={18} height={18} className="h-[1.1rem] w-auto object-contain opacity-80" />
              </div>
              <span className="select-none text-[0.5rem] tracking-[0.35em] text-gold/50">···</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
            </div>

            <a href="#apply" className="inline-flex w-full max-w-[28rem] items-center justify-center rounded-xl bg-gradient-to-b from-[#d4b860] via-[#c9a84c] to-[#9e7a18] px-8 py-3.5 font-display text-base font-semibold text-[#1a1208] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              Apply to Check Market Availability
            </a>

            <p className="flex items-center gap-2 text-xs font-semibold text-gold/70">
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Limited partner openings available
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="rose-section py-24">
        <div className="mx-auto max-w-7xl gap-12 px-5 lg:grid lg:grid-cols-[1fr_2fr]">
          <Reveal className="mb-10 lg:mb-0">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-rose">Questions</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">Before You Apply</h2>
            <OrnateRule />
            <p className="mt-4 text-lg leading-8 text-ink/70">Answers to the questions serious partners ask most.</p>
            <p className="mt-4 text-sm leading-7 text-ink/65">
              Speaking Roses is selective. This is not an open sign-up program. We are looking for committed distributors, licensees, and exclusive partners who want to represent the brand correctly and grow their market.
            </p>
            <div className="luxe-card mt-6 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <RoseIcon className="mt-0.5 h-5 w-5 shrink-0 text-rose" />
                <div>
                  <p className="font-semibold text-plum">What matters most</p>
                  <p className="mt-1 text-sm text-ink/65">Commitment, market fit, available funds, and the ability to represent the brand the right way.</p>
                </div>
              </div>
            </div>
            <CTA />
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} className="luxe-card rounded-2xl overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-start gap-4 p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose/10 text-sm font-bold text-rose">{i + 1}</span>
                  <span className="flex-1 text-base font-bold text-plum">{faq.q}</span>
                  <span className="ml-2 shrink-0 text-rose/50 transition-transform duration-200" style={{transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-sm leading-7 text-ink/70 pl-12">{faq.a}</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY CTA ── */}
      <section id="apply" className="rose-section relative overflow-hidden py-24">
        <Image src="/bg-application-desk.png" alt="" fill className="object-cover object-center opacity-70" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-petal/80 to-white/40" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal className="luxe-card rounded-3xl p-6 md:p-8">
            <div className="flex justify-center lg:justify-start mb-5">
              <Image src="/logo.svg" alt="Speaking Roses" width={200} height={52} className="h-10 w-auto" />
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">Apply to Check Availability</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">Apply to<br /><span className="text-rose">Check Availability</span></h2>
            <OrnateRule />
            <p className="mt-2 font-display text-lg text-ink/55">See if your market is open.</p>

            {/* Trust icons */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { icon: "globe", label: "Shipped Worldwide" },
                { icon: "diamond", label: "Premium Quality" },
                { icon: "check", label: "Trusted Worldwide" },
              ].map((tp) => (
                <div key={tp.label} className="luxe-card flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-white text-rose shadow-sm">
                    <LineIcon name={tp.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-plum">{tp.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-7 text-ink/65">
              Spots are limited. We evaluate every applicant individually.{" "}
              <span className="font-semibold text-rose">Partners with $1,500+ in liquid funds and a timeline</span>{" "}
              within six months are redirected to book a call with the team. All leads are captured — the team may follow up for future openings.
            </p>
            <div className="luxe-card mt-6 flex items-center gap-3 rounded-xl p-4">
              <RoseIcon className="h-8 w-8 shrink-0 text-rose" />
              <div>
                <p className="text-sm font-bold text-rose">Limited spots available</p>
                <p className="text-xs text-ink/55 uppercase tracking-widest font-semibold">High demand. Limited access.</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ApplyForm form={form} setField={setField} formatPhone={formatPhone} validatePhone={validatePhone} phoneError={phoneError} setPhoneError={setPhoneError} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} submitted={submitted} isQualified={isQualified} showTitle />
          </Reveal>
        </div>
      </section>

      <footer className="bg-plum px-5 py-8 text-center text-sm text-white/50">© 2026 Speaking Roses. Privacy Policy | Terms</footer>

      {showFloat && (
        <a href="#apply" className="fixed bottom-5 right-5 z-50 rounded-full bg-rose px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-2xl transition hover:-translate-y-1 md:bottom-7 md:right-7">
          Apply Now →
        </a>
      )}
    </main>
  );
}
